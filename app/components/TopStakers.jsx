"use client";
import React from "react";

const TopStakers = ({ topStakers }) => {
  // console.log(topStakers);
  return (
    <div className="top_box">
      {topStakers.sort((a, b) => b.amount - a.amount).map((element,index) => {
        return (
          <div className="top_items" key={element.owner}>
            <span className="top_index">{index+1}</span>
            <span className="top_owner">{element.owner}</span>
            <div className="top_quantity">
            <span>{element.amount.toFixed(4)}</span>
            <img src="HERB.png" alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopStakers;
