'use client'
import React from "react";
import "../Stats.css";
const TOTAL_SUPPLY = "1000000.0000 HERB";
const Stats = ({ info, parse_numbers }) => {
  return (
    <div className="stats_box">
      <div className="stats_items supply">
        <span className="stats_items_title">Total Supply</span>
        <span className="stats_items_amount">{parse_numbers(parse_asset(TOTAL_SUPPLY))}</span>
        <span className="stats_items_percentage">100%</span>
      </div>
      <div className="stats_items staked">
        <span className="stats_items_title">Total Staked</span>
        <span className="stats_items_amount">{parse_numbers(parse_asset(info.total_staked))}</span>
        <span className="stats_items_percentage">
          {((parse_asset(info.total_staked) / parse_asset(TOTAL_SUPPLY)) * 100).toFixed(2)}%
        </span>
      </div>
      <div className="stats_items unstaked">
        <span className="stats_items_title">Total Unstaked</span>
        <span className="stats_items_amount">{parse_numbers(parse_asset(info.total_unstaked))}</span>
        <span className="stats_items_percentage">{((parse_asset(info.total_unstaked) / parse_asset(TOTAL_SUPPLY)) * 100).toFixed(2)}%</span>
      </div>
    </div>
  );
};

export default Stats;

function parse_asset(quantity) {
  let asset = quantity.split(" ");
  let amount = parseFloat(asset[0]);
  return amount;
}