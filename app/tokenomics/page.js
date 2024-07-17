"use client";
import React from "react";
import "./Tokenomics.css";
import PieChart from "../components/PieChart";

const Tokenomics = () => {
  return (
    <div id="tokenomics_box">
      <div></div>
      <div className="table_outer_box">
        <h2>$HERB Tokenomics</h2>
        <div className="table_box">
          <div>
            <span>Token Symbol:</span>
            <span>HERB</span>
          </div>
          <div>
            <span>Token Contract:</span>
            <span>naturestoken</span>
          </div>
          <div>
            <span>Circulating Supply:</span>
            <span>1,320,000 HERB</span>
          </div>
          <div>
            <span>Max Supply:</span>
            <span>10,000,000 HERB</span>
          </div>
        </div>
        <hr style={{ width: "80%", opacity: "0.15" }} />
      </div>
      <div className="table_outer_box">
        <h2>$HERB Distribution Model</h2>
        <div className="table_box">
          <PieChart />
          <div>
            <span>Staking Reward:</span>
            <span>8%</span>
          </div>
          <div>
            <span>Chat Mining Reward:</span>
            <span>7%</span>
          </div>
          <div>
            <span>Airdrop and Marketing</span>
            <span>18.5%</span>
          </div>
          <div>
            <span>Team</span>
            <span>7.5%</span>
          </div>
          <div>
            <span>Project Development</span>
            <span>20%</span>
          </div>
          <div>
            <span>LP and LP Reward</span>
            <span>25%</span>
          </div>
          <div>
            <span>Reserve Fund</span>
            <span>15%</span>
          </div>
          <small className="token_distribution_note">
            This distribution plan outlines how HERB will be allocated over a
            25-months period, with 160,000 HERB being allocated each month. Each
            category receives a percentage of the monthly allocation as
            specified in the distribution model.
          </small>
        </div>
        <hr style={{ width: "80%", opacity: "0.15" }} />
      </div>

      <div className="table_outer_box" style={{ marginBottom: "5rem" }}>
        <h2>$HERB Utility</h2>
        <ul className="utiity_box">
          <li>
            <span className="utility_heading">
              10% Token Listing Discount:{" "}
            </span>
            Get 10% discount on token listings within herbtipbot when paying
            fees in herb.
          </li>
          <li>
            <span className="utility_heading">
              Free Withdrawal for Staking 5k Herb:{" "}
            </span>
            Stake 5,000 herb tokens for fee-free withdrawals.
          </li>
          <li>
            <span className="utility_heading">Additional Benefits: </span>
            Enjoy credit discounts, chat multipliers, and more perks.
          </li>
          <li>
            {" "}
            <span className="utility_heading">Limited Edition NFTs: </span>
            Access exclusive herb drop NFTs.
          </li>
          <li>
            {" "}
            <span className="utility_heading">Wax-to-Herb Swaps: </span>
            Swap wax for herb on platforms like Alcor Swap, Waxonedge and Taco
            Swap.
          </li>
          <li>
            {" "}
            <span className="utility_heading">Staking Rewards: </span>Earn
            rewards by staking herb tokens.
          </li>
          <li>
            {" "}
            <span className="utility_heading">Future Expansion: </span>Expect
            more utility enhancements soon.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tokenomics;
