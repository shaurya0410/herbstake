"use client";
import React, { useEffect, useState } from "react";
import "./Richlist.css";
import * as waxjs from "@waxio/waxjs/dist";
const wax = new waxjs.WaxJS({
  rpcEndpoint: "https://wax.greymass.com",
});

const RichListPage = () => {
  const [rich, setRich] = useState([]);
  const [filterValue, setFilterValue] = useState(false);
  useEffect(() => {
    console.log("reload");
    const fetchData = async () => {
      try {
        const stakedData = await wax_top_stakers_data();
        const rawBalance = await herb_richlist();
        const balance = rawBalance.map((e) => {
          if (filterValue == false) {
            if (
              e[0] == "stake.herb" ||
              e[0] == "bridge.herb" ||
              e[0] == "naturestoken" ||
              e[0] == "tipbotwallet" ||
              e[0] == "swap.alcor" ||
              e[0] == "reward.alcor" ||
              e[0] == "swap.nefty" ||
              e[0] == "team.herb" ||
              e[0] == "swap.taco" ||
              e[0] == "wallet.herb" ||
              e[0] == "fees.herb" ||
              e[0] == "herb"
            ) {
              return;
            }
          }
          const stakedBalance = stakedData.find(
            (element) => element.owner === e[0]
          );
          const stakedAmount = stakedBalance ? stakedBalance.amount : 0;
          return {
            wallet: e[0],
            balance: e[1],
            staked: stakedAmount,
            total: stakedAmount + Number(e[1]),
          };
        });
        setRich(balance);
      } catch (error) {
        console.error("Error fetching data:", error);
        setRich([]);
      }
    };

    fetchData();
  }, [filterValue]);

  return (
    <>
      <div className="richlist">
        <span>Rank</span>
        <span>Wallet</span>
        <span>Balance</span>
        <span>Staked</span>
        <span>Share</span>
      </div>
      {rich.length > 0 && (
        <div id="filter">
          <div>
            <label htmlFor="">all</label>
            <input
              type="checkbox"
              readOnly
              checked={filterValue}
              onClick={() => {
                if (filterValue) {
                  setFilterValue(false);
                } else {
                  setFilterValue(true);
                }
              }}
            />
          </div>
        </div>
      )}
      {/* Render data */}
      {rich
        .sort((a, b) => b.total - a.total)
        .slice(0, 100)
        .map((e, i) => (
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
            <span>{formatLargeNumber(e.balance)}</span>
            <span>{formatLargeNumber(e.staked)}</span>
            <span>{((e.total / 1000000) * 100).toFixed(2)}%</span>
          </div>
        ))}
      <div style={{ marginBottom: "5rem" }}></div>
    </>
  );
};

export default RichListPage;

async function herb_richlist() {
  try {
    const response = await fetch(
      `https://wax.light-api.net/api/topholders/wax/naturestoken/HERB/500`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching herb richlist:", error);
    return [];
  }
}

const wax_top_stakers_data = async () => {
  try {
    const data = await wax.rpc.get_table_rows({
      json: true,
      code: "stake.herb",
      scope: "stake.herb",
      table: "stakes",
      limit: 200,
      reverse: false,
      show_payer: false,
    });

    const newData = data.rows.map((element) => {
      const [amount] = element.quantity.split(" ");
      return { ...element, amount: parseFloat(amount) };
    });

    return newData;
  } catch (error) {
    console.error("Error fetching wax top stakers data:", error);
    return [];
  }
};

const formatLargeNumber = (value) => {
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
