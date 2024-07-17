// "use client";
import React from "react";
import "./Richlist.css";
import * as waxjs from "@waxio/waxjs/dist";
const wax = new waxjs.WaxJS({
  rpcEndpoint: "https://wax.greymass.com",
  // tryAutoLogin: false,
});

const RichListPage = async () => {
  let rich = [];
  //function to parse all data
  async function whale_data() {
    // let ts=0;
    let stakedData = await wax_top_stakers_data();
    let rawBalance = await herb_richlist();
    let balance = [];
    rawBalance.forEach((e) => {
      let stakedBalance = stakedData.find((element) => element.owner == e[0]);
      stakedBalance = stakedBalance == undefined ? 0 : stakedBalance.amount;
      // ts += Number(stakedBalance) + Number(e[1]);
      balance.push({
        wallet: e[0],
        balance: e[1],
        staked: stakedBalance,
        total: Number(stakedBalance) + Number(e[1]),
      });
    });
    rich = balance;
    // console.log(ts-285000);
  }
  await whale_data();

  return (
    <>
      <div className="richlist">
        <span>Rank</span>
        <span>Wallet</span>
        <span>Balance</span>
        <span>Staked</span>
        <span>Share</span>
      </div>
      {/* ---data-- */}
      {rich
        .sort((a, b) => b.total - a.total)
        .slice(1, 101)
        .map((e, i) => {
          return (
            <div className="richlist_data" key={e.wallet}>
              <span>#{i + 1}</span>
              <span>
                <a
                  href={`https://waxblock.io/account/${e.wallet}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {e.wallet}
                </a>
              </span>
              <span>{M(e.balance)}</span>
              <span>{M(e.staked)}</span>
              <span>{((e.total / 1320000) * 100).toFixed(2)}%</span>
            </div>
          );
        })}
        <div style={{marginBottom:'5rem'}}></div>
    </>
  );
};

export default RichListPage;

//top herb holders
async function herb_richlist() {
  try {
    let data = await fetch(
      `https://wax.light-api.net/api/topholders/wax/naturestoken/HERB/500`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let rich = await data.json();
    // console.log(rich);
    return rich;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

const wax_top_stakers_data = async () => {
  try {
    // console.log(process.env.CONTRACT);
    const data = await wax.rpc.get_table_rows({
      json: true,
      code: "stake.herb",
      scope: "stake.herb",
      table: "stakes",
      // lower_bound: _owner,
      limit: 500,
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

//helper function
const M = (value) => {
  if (value >= 1000000000000) {
    return (value / 1000000000000).toFixed(2) + "T";
  } else if (value >= 1000000000) {
    return (value / 1000000000).toFixed(2) + "B";
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(2) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(2) + "K";
  } else {
    return (value / 1).toFixed(2).toString();
  }
};
