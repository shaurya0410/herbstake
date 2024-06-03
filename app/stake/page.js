"use client";
import React, { useState, useEffect } from "react";
import Calculator from "../components/Calculator";
// import Button from "./components/Button";
import Modal from "../components/Modal";
import Login from "../components/Login";
import TopStaked from "../components/TopStaked";
import Stats from "../components/Stats";
import * as waxjs from "@waxio/waxjs/dist";
const wax = new waxjs.WaxJS({
  rpcEndpoint: "https://wax.greymass.com",
  // tryAutoLogin: false,
});

import AnchorLink from "anchor-link";
import AnchorLinkBrowserTransport from "anchor-link-browser-transport";
import StakingLevel from "../components/StakingLevel";
import Staking from "../components/Staking";

const transport = new AnchorLinkBrowserTransport();
const link = new AnchorLink({
  transport,
  chains: [
    {
      chainId:
        "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
      nodeUrl: "https://wax.greymass.com",
    },
  ],
});
const StakingPage = () => {
  useEffect(() => {
    getInitialData();
  }, []);

  const [lastClaim, setLastClaim] = useState(0);
  const [claim, setClaim] = useState(0);
  const [unlockCooldown, setUnlockCooldown] = useState(0);
  const [staked, setStaked] = useState(-1);
  const [unstaked, setUnstaked] = useState(-1);

  const [info, setInfo] = useState({
    total_staked: "0.0000 HERB",
    total_unstaked: "0.0000 HERB",
    base_apr: 0,
  });

  const [loginModal, setLoginModal] = useState(false);
  const [wallet, setWallet] = useState("wax"); //anchor
  const [session, setSession] = useState("");
  const [type, setType] = useState("");
  const [modal, setModal] = useState(false);
  const [isuser, setIsUser] = useState(false);
  const [topstakers, setTopstakers] = useState([]);
  const [user, setUser] = useState({
    owner: "",
    balance: "0",
  });

  async function getInitialData(params) {
    let [top, info] = await Promise.all([wax_top_stakers_data(), wax_info()]);

    if (top != -1) {
      setTopstakers(top);
    }
    if (info != -1) {
      setInfo(info);
    }
  }

  async function getData(owner) {
    try {
      let [staked, unstaked, balance] = await Promise.all([
        wax_staked_data(owner),
        wax_unstaked_data(owner),
        herb_balance(owner),
      ]);

      // console.log(balance);

      if (balance == -1) {
        balance = 0;
      }

      //if not staked and unstaked
      setStaked(0);
      setUnstaked(0);

      if (staked != -1) {
        setStaked(parseToken(staked.quantity));
        setClaim(
          calculateClaim(
            parseToken(staked.quantity),
            new Date(staked.last_claim + "Z").getTime()
          )
        );
        setLastClaim(new Date(staked.last_claim + "Z").getTime());
      }

      if (unstaked != -1) {
        setUnstaked(parseToken(unstaked.quantity));
        setUnlockCooldown(new Date(unstaked.unlock_time + "Z").getTime());
      }

      setUser((previous_obj) => ({
        ...previous_obj,
        owner,
        balance,
      }));
    } catch (error) {
      alert(error);
    }
  }

  function reset() {
    // setTopstakers([]);
    setUser({
      owner: "",
      balance: "0",
    });
    setClaim(0);
    setUnlockCooldown(0);
    setLastClaim(0);
    setStaked(-1);
    setUnstaked(-1);
  }

  const wax_transact = async (_owner, _quantity = 1, type) => {
    try {
      let data = {};
      if (type == "stake") {
        data = {
          from: _owner,
          to: contract,
          quantity: `${parseFloat(_quantity).toFixed(4)} HERB`,
          memo: type,
        };
      } else if (type == "unstake" || type == "restake") {
        data = {
          owner: _owner,
          quantity: `${parseFloat(_quantity).toFixed(4)} HERB`,
        };
      } else if (type == "redeem" || type == "claim") {
        data = {
          owner: _owner,
        };
      }

      if (wallet == "wax") {
        const result = await wax.api.transact(
          {
            actions: [
              {
                account: type == "stake" ? "naturestoken" : contract,
                name: type == "stake" ? "transfer" : type,
                authorization: [
                  {
                    actor: _owner,
                    permission: "active",
                  },
                ],
                data: data,
              },
            ],
          },
          {
            blocksBehind: 3,
            expireSeconds: 1200,
          }
        );

        return { value: 1, message: result.transaction_id };
      } else {
        const action = {
          account: type == "stake" ? "naturestoken" : contract,
          name: type == "stake" ? "transfer" : type,
          authorization: [session.auth],
          data: data,
        };

        const tx = await session.transact({ action });
        return { value: 1, message: tx.processed.id };
      }
    } catch (error) {
      // return -1;
      return { value: -1, message: error.message };
    }
  };

  return (
    <div className="staking_container">
      <div className="wallet_balance">
        {/* <span>Balance:</span> */}
        <span>{`${user.balance} HERB`}</span>
      </div>
      <div className="wallet_box">
        {!isuser ? (
          <button
            className="btn"
            onClick={() => {
              setLoginModal(true);
            }}
          >
            {`connect`}
          </button>
        ) : (
          <button
            className="btn"
            onClick={async () => {
              try {
                wax.logout();
                if (session) {
                  session.remove();
                }
                setIsUser(false);
                reset();
                setWallet("");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {`${user.owner}`}
          </button>
        )}
      </div>

      {staked != -1 ? (
        <Staking
          isuser={isuser}
          staked={staked}
          claim={claim}
          setClaim={setClaim}
          lastClaim={lastClaim}
          unstaked={unstaked}
          unlockCooldown={unlockCooldown}
          setModal={setModal}
          setType={setType}
          info={info}
        />
      ) : (
        <div className="staking_reward" style={{ marginTop: "9rem" }}></div>
      )}

      <h2>Calculator</h2>
      <Calculator parse_numbers={parse_numbers} info={info} />
      <hr
        style={{
          color: "white",
          opacity: "0.5",
          width: "80vw",
          margin: "1rem",
        }}
      />
      <h2>Stats</h2>
      <Stats info={info} parse_numbers={parse_numbers} />
      <hr
        style={{
          color: "white",
          opacity: "0.5",
          width: "80vw",
          margin: "1rem",
        }}
      />
      <h2>Staking Levels</h2>
      <StakingLevel />
      <hr
        style={{
          color: "white",
          opacity: "0.5",
          width: "80vw",
          margin: "1rem",
        }}
      />
      <h2>Top Stakers</h2>
      <TopStaked topstakers={topstakers} parse_numbers={parse_numbers} />
      {modal && (
        <Modal
          setModal={setModal}
          transact={wax_transact}
          user={user}
          type={type}
          getData={getData}
          parse_numbers={parse_numbers}
          staked={staked}
          unstaked={unstaked}
        />
      )}
      {loginModal && (
        <Login
          setLoginModal={setLoginModal}
          getData={getData}
          setSession={setSession}
          setIsUser={setIsUser}
          setWallet={setWallet}
          link={link}
          wax={wax}
        />
      )}
    </div>
  );
};

export default StakingPage;

//functions
let contract = "stake.herb";
const wax_staked_data = async (_owner) => {
  try {
    // console.log(process.env.CONTRACT);
    const data = await wax.rpc.get_table_rows({
      json: true,
      code: contract,
      scope: contract,
      table: "stakes",
      lower_bound: _owner,
      limit: 1,
      reverse: false,
      show_payer: false,
    });

    let owner = data.rows[0].owner;
    if (_owner == owner) {
      return data.rows[0];
    } else {
      return -1;
    }
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const wax_unstaked_data = async (_owner) => {
  try {
    // console.log(process.env.CONTRACT);
    const data = await wax.rpc.get_table_rows({
      json: true,
      code: contract,
      scope: contract,
      table: "unstakes",
      lower_bound: _owner,
      limit: 1,
      reverse: false,
      show_payer: false,
    });

    let owner = data.rows[0].owner;
    if (_owner == owner) {
      return data.rows[0];
    } else {
      return -1;
    }
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const wax_top_stakers_data = async () => {
  try {
    // console.log(process.env.CONTRACT);
    const data = await wax.rpc.get_table_rows({
      json: true,
      code: contract,
      scope: contract,
      table: "stakes",
      // lower_bound: _owner,
      limit: 100,
      reverse: false,
      show_payer: false,
    });
    let newData = [];
    data.rows.forEach((element) => {
      let array = element.quantity.split(" ");
      let amount = parseFloat(array[0]);
      newData.push({ ...element, amount });
    });
    // console.log(newData);
    return newData;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const herb_balance = async (owner) => {
  try {
    const data = await wax.rpc.get_table_rows({
      json: true, // Get the response as json
      code: "naturestoken", // Contract that we target
      scope: owner, // Account that owns the data
      table: "accounts", // Table name
      // lower_bound: _user, // Table primary key value
      limit: 1, // Here we limit to 1 to get only the single row with primary key equal to 'testacc'
      reverse: false, // Optional: Get reversed data
      show_payer: false, // Optional: Show ram payer
    });

    // console.log(data.rows[0].balance);
    // { balance: '19535.4435 HERB' }
    const asset = data.rows[0].balance.split(" ");
    // console.log(asset);

    if (asset[1] == "HERB") {
      return asset[0];
    } else {
      return -1;
    }
  } catch (error) {
    // console.log(error);
    return -1;
  }
};

const wax_info = async () => {
  try {
    // console.log(process.env.CONTRACT);
    const data = await wax.rpc.get_table_rows({
      json: true,
      code: contract,
      scope: contract,
      table: "stakeconfig",
      // lower_bound: _owner,
      limit: 1,
      reverse: false,
      show_payer: false,
    });

    return data.rows[0];
  } catch (error) {
    console.log(error);
    return -1;
  }
};

//helper function
const parse_numbers = (value) => {
  if (value >= 1000000000000) {
    return (value / 1000000000000).toFixed(2) + "T";
  } else if (value >= 1000000000) {
    return (value / 1000000000).toFixed(2) + "B";
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(2) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(2) + "K";
  } else {
    return (value / 1).toFixed(2);
  }
};

function calculateClaim(staked_amount, last_claim) {
  let current_time = Date.now();
  let elapsed_time = (current_time - parseInt(last_claim)) / 1000;
  // const apy = 0.1; // 10% APY
  const reward_per_second = 0.08 / 365 / 24 / 60 / 60; // APY converted to per second
  let claim_amount = staked_amount * reward_per_second * elapsed_time;
  return claim_amount;
}

function parseToken(_token) {
  if (_token == undefined) {
    return 0;
  } else {
    //token -> '1.00000000 WAX'
    // console.log(_token)
    let array = _token.split(" "); //["1.00000000","WAX"]
    return parseFloat(array[0]);
  }
}
