"use client";
import React from "react";

const TopStaked = ({ topstakers, parse_numbers }) => {
  // console.log(topStakers);
  return (
    <div className="top_box">
      <div
        className="top_items"
        style={{ color: "gray", fontSize: "1.2rem", fontWeight: "bold" }}
      >
        <span style={{ textAlign: "left" }}>RANK</span>
        <span>OWNER</span>
        <span>MULTIPLIER</span>
        <span style={{ textAlign: "right" }}>STAKED</span>
      </div>
      {topstakers
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 20)
        .map((element, index) => {
          return (
            <div className="top_items" key={element.owner}>
              <span className="top_index">{numToLogo(index + 1)}</span>
              <span className="top_owner">{element.owner}</span>
              <span className="top_bonus">
                {calculateBonus(element.amount)}
              </span>
              <div className="top_quantity">
                <span>{parse_numbers(element.amount)}</span>
                <img src="HERB.png" alt="" />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TopStaked;

const numToLogo = (num) => {
  if (num == 1) {
    return "🥇";
  } else if (num == 2) {
    return "🥈";
  } else if (num == 3) {
    return "🥉";
  } else {
    return `  ${num} `;
  }
};

function calculateBonus(amount) {
  if (amount >= 100000) {
    return "100%";
  } else if (amount >= 50000) {
    return "50%";
  } else if (amount >= 25000) {
    return "25%";
  } else if (amount >= 10000) {
    return "10%";
  } else if (amount >= 5000) {
    return "5%";
  } else {
    return "0%";
  }
}
