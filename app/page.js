"use client";
import React, { useState, useEffect } from "react";
import Calculator from "./components/Calculator";
import Button from "./components/Button";
import Modal from "./components/Modal";
import Login from "./components/Login";
import TopStaked from "./components/TopStaked";
import Stats from "./components/Stats";
import * as waxjs from "@waxio/waxjs/dist";
const wax = new waxjs.WaxJS({
  rpcEndpoint: "https://wax.greymass.com",
  // tryAutoLogin: false,
});

import AnchorLink from "anchor-link";
import AnchorLinkBrowserTransport from "anchor-link-browser-transport";

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
const MainPage = () => {
  const [info, setInfo] = useState({
    total_staked: "0.0000 HERB",
    total_unstaked: "0.0000 HERB",
  });
  const [loginModal, setLoginModal] = useState(false);
  const [wallet, setWallet] = useState("wax"); //anchor
  const [session, setSession] = useState("");
  const [rph, setRph] = useState(0);
  const [type, setType] = useState("");
  const [modal, setModal] = useState(false);
  const [isuser, setIsUser] = useState(false);
  const [topstakers, setTopstakers] = useState([]);
  const [user, setUser] = useState({
    owner: "",
    staked_amount: "0.0000 HERB",
    claim: "0.0000",
    last_claim: "0",
    unstaked_amount: "0.0000 HERB",
    unlock_cooldown: "0",
    balance: "0",
  });

  async function getData(owner) {
    try {
      let [staked, unstaked, balance, top, info] = await Promise.all([
        wax_staked_data(owner),
        wax_unstaked_data(owner),
        herb_balance(owner),
        wax_top_stakers_data(),
        wax_info(),
      ]);

      // console.log(balance);

      if (balance == -1) {
        balance = 0;
      }
      if (top != -1) {
        setTopstakers(top);
      }
      if (info != -1) {
        setInfo(info);
      }

      let last_claim = 0;
      let claim = "0.0000";
      let staked_amount = "0.0000 HERB";
      let unstaked_amount = "0.0000 HERB";
      let unlock_cooldown = 0;

      if (staked != -1) {
        // console.log(staked.last_claim);
        last_claim = new Date(staked.last_claim + "Z").getTime();
        claim = calculateClaim(staked.quantity, last_claim);
        staked_amount = staked.quantity;
      }

      if (unstaked != -1) {
        // console.log(unstaked);
        unlock_cooldown = new Date(unstaked.unlock_time + "Z").getTime();
        // console.log(unlock_cooldown);
        unstaked_amount = unstaked.quantity;
        // alert(new Date(unstaked.unlock_time).getTime());
      }

      setUser((previous_obj) => ({
        ...previous_obj,
        owner,
        staked_amount,
        claim,
        last_claim,
        balance,
        unstaked_amount,
        unlock_cooldown,
      }));
    } catch (error) {
      alert(error);
    }
  }

  function calculateClaim(quantity, last_claim) {
    // console.log(quantity);
    let asset = quantity.split(" ");
    let staked_amount = parseFloat(asset[0]);
    // console.log(staked_amount);
    let current_time = Date.now();
    let elapsed_time = (current_time - parseInt(last_claim)) / 1000;
    // const apy = 0.1; // 10% APY
    const reward_per_second = 0.08 / 365 / 24 / 60 / 60; // APY converted to per second
    let claim_amount = (
      staked_amount *
      reward_per_second *
      elapsed_time
    ).toFixed(4);
    setRph(staked_amount * reward_per_second * 60 * 60);
    // console.log(reward_per_second);
    // console.log(claim_amount);
    return claim_amount;
  }

  function reset() {
    setTopstakers([]);
    setRph(0);
    setUser({
      owner: "",
      staked_amount: "0.0000 HERB",
      claim: "0.0000",
      last_claim: 0,
      balance: "0",
      unstaked_amount: "0.0000 HERB",
      unlock_cooldown: 0,
    });
  }

  if (isuser) {
    setTimeout(() => {
      setUser((prevObject) => ({
        ...prevObject, // Spread previous object properties
        unlock_cooldown:
          prevObject.unlock_cooldown > 0 ? prevObject.unlock_cooldown + 1 : 0, // Update only the desired property
        claim: calculateClaim(prevObject.staked_amount, prevObject.last_claim),
        last_claim: prevObject.last_claim + 1,
      }));
    }, 1000);
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

  // if (user.last_claim > 0) {
  //   setTimeout(() => {
  //     setUser((prevObject) => ({
  //       ...prevObject, // Spread previous object properties
  //       claim: calculateClaim(prevObject.staked_amount, prevObject.last_claim),
  //       last_claim: prevObject.last_claim + 1, // Update only the desired property
  //     }));
  //   }, 5000);
  // }

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
      <div className="staking_reward">
        {/* <h2>Claimable Earning</h2> */}
        <h2 className="main_heading">Staking Information</h2>
        <div className="claim_box">
          <span className="claim_amount">
            <img src="HERB.png" alt="" />
            <span>{user.claim}</span>
          </span>
          <span className="reward_perhour">{`(${rph.toFixed(4)}/h)`}</span>
          <Button
            setModal={setModal}
            text={"claim"}
            setType={setType}
            isuser={isuser}
          />
        </div>

        {/* <div className="staking_info"> */}
        {/* <h2>Staking Information</h2> */}
        <div className="stake_box">
          <span className="title">Staked</span>
          <span className="amount">{user.staked_amount}</span>
          <Button
            text={"stake"}
            setModal={setModal}
            setType={setType}
            isuser={isuser}
          />
        </div>

        {
          <div className="unstake_box">
            <span className="title">Unstaked</span>
            <span className="amount">{user.unstaked_amount}</span>

            <div className="btn_box">
              <Button
                text={"unstake"}
                setModal={setModal}
                setType={setType}
                isuser={isuser}
              />
              <Button
                text={"restake"}
                setModal={setModal}
                setType={setType}
                isuser={isuser}
              />
            </div>
          </div>
        }
        {/* </div> */}
        {isuser && (
          <div className="redeem_box">
            <span className="redeem_cooldown">
              {user.unlock_cooldown > 0
                ? calculateTimeLeft(user.unlock_cooldown)
                : 0}
            </span>
            <Button
              text={"redeem"}
              setModal={setModal}
              setType={setType}
              isuser={isuser}
            />
          </div>
        )}
      </div>
      <hr
        style={{
          color: "white",
          opacity: "0.5",
          width: "80vw",
          margin: "1rem",
        }}
      />
      <h2>Reward Calculator</h2>
      <Calculator />
      <hr
        style={{
          color: "white",
          opacity: "0.5",
          width: "80vw",
          margin: "1rem",
        }}
      />
      <h2>Stats</h2>
      <Stats info={info} />
      <hr
        style={{
          color: "white",
          opacity: "0.5",
          width: "80vw",
          margin: "1rem",
        }}
      />
      <h2>Top Stakers</h2>
      <TopStaked topstakers={topstakers} />
      {modal && (
        <Modal
          setModal={setModal}
          transact={wax_transact}
          user={user}
          type={type}
          getData={getData}
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

export default MainPage;

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

function calculateTimeLeft(unlockTime) {
  var currentTime = Date.now();
  var timeDifference = parseInt(unlockTime) - currentTime;

  var seconds = Math.floor((timeDifference / 1000) % 60);
  var minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  var hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

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
