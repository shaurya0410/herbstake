"use client";
import React, { useState } from "react";
import Calculator from "./components/Calculator";
import Button from "./components/Button";
import Modal from "./components/Modal";
import TopStaked from "./components/TopStaked";
import * as waxjs from "@waxio/waxjs/dist";
const wax = new waxjs.WaxJS({
  rpcEndpoint: "https://wax.greymass.com",
  tryAutoLogin: false,
});

const MainPage = () => {
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
      let [staked, unstaked, balance, top] = await Promise.all([
        wax_staked_data(owner),
        wax_unstaked_data(owner),
        herb_balance(owner),
        wax_top_stakers_data(),
      ]);

      // console.log(balance);

      if (balance == -1) {
        balance = 0;
      }
      if (top != -1) {
        setTopstakers(top);
      }

      if(staked == -1 && unstaked == -1){
        setUser((previous_obj) => ({
          ...previous_obj,
          owner: owner,
          balance: balance,
        }));
      }
      if (staked != -1) {
        let last_claim = new Date(staked.last_claim + "z").getTime();
        let claim_amount = calculateClaim(staked.quantity, last_claim);
        setUser((previous_obj) => ({
          ...previous_obj,
          owner: staked.owner,
          staked_amount: staked.quantity,
          claim: claim_amount,
          last_claim: last_claim,
          balance: balance,
        }));
      }
      if (unstaked != -1) {
        // console.log(unstaked);
        let unlock_cooldown = new Date(unstaked.unlock_time + "z").getTime();
        // console.log(unlock_cooldown);
        setUser((previous_obj) => ({
          ...previous_obj,
          owner: unstaked.owner,
          unstaked_amount: unstaked.quantity,
          unlock_cooldown: unlock_cooldown,
          balance: balance,
        }));
      }
    } catch (error) {
      alert(error);
    }
  }

  function reset() {
    setTopstakers([]);
    setUser({
      owner: "",
      staked_amount: "0.0000 HERB",
      claim: "0.0000",
      last_claim: "0",
      balance: "0",
      unstaked_amount: "0.0000 HERB",
      unlock_cooldown: -10,
    });
  }

  if (user.unlock_cooldown > 0) {
    setTimeout(() => {
      setUser((prevObject) => ({
        ...prevObject, // Spread previous object properties
        unlock_cooldown: prevObject.unlock_cooldown + 1, // Update only the desired property
      }));
    }, 1000);
  }

  if (user.last_claim > 0) {
    setTimeout(() => {
      setUser((prevObject) => ({
        ...prevObject, // Spread previous object properties
        claim: calculateClaim(prevObject.staked_amount, prevObject.last_claim),
        last_claim: prevObject.last_claim + 1, // Update only the desired property
      }));
    }, 1000);
  }

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
            onClick={async () => {
              try {
                const isAutoLoginAvailable = await wax.isAutoLoginAvailable();
                if (isAutoLoginAvailable) {
                  setIsUser(true);
                  // alert(`${wax.userAccount} connected`);
                  getData(wax.userAccount);
                } else {
                  const nonce = "herbstaking";
                  const userAccount = await wax.login(nonce);
                  if (wax.proofVerified) {
                    setIsUser(true);
                    // alert(`${userAccount} connected`);
                    getData(userAccount);
                  }
                }
              } catch (error) {
                return;
              }
            }}
          >
            {"connect"}
          </button>
        ) : (
          <button
            className="btn"
            onClick={async () => {
              try {
                wax.logout();
                setIsUser(false);
                reset();
              } catch (error) {
                return;
              }
            }}
          >
            {"logout"}
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

       { <div className="unstake_box">
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
        </div>}
        {/* </div> */}
        {user.unlock_cooldown > 0 && (
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
  var currentTime = new Date().getTime();
  var timeDifference = unlockTime - currentTime;

  var seconds = Math.floor((timeDifference / 1000) % 60);
  var minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  var hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
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
  } catch (error) {
    // return -1;
    return { value: -1, message: error.message };
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
    console.log(newData);
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

function calculateClaim(quantity, last_claim) {
  // console.log(quantity);
  let asset = quantity.split(" ");
  let staked_amount = parseFloat(asset[0]);
  // console.log(staked_amount);
  let current_time = new Date().getTime();
  let elapsed_time = (current_time - last_claim) / 1000;
  // const apy = 0.1; // 10% APY
  const reward_per_second = 0.08 / 365 / 24 / 60 / 60; // APY converted to per second
  let claim_amount = (
    staked_amount *
    reward_per_second *
    elapsed_time
  ).toFixed(4);
  // console.log(claim_amount);
  return claim_amount;
}