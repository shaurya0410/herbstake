"use client";
import React from "react";

const TopStaked = ({ topstakers , parse_numbers}) => {
  // console.log(topStakers);
  return (
    <div className="top_box">
      {topstakers.sort((a, b) => b.amount - a.amount).slice(0,20).map((element,index) => {
        return (
          <div className="top_items" key={element.owner}>
            <span className="top_index">{numToLogo(index+1)}</span>
            <span className="top_owner">{element.owner}</span>
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