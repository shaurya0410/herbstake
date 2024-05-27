"use client";
import React, { useState } from "react";

const TopStaked = ({ topstakers, parse_numbers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  //get currnt page
  // console.log(topstakers);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPage = Math.ceil(topstakers.length / itemsPerPage);
  console.log(totalPage);
  // const currentItems = topstakers
  //   .sort((a, b) => b.amount - a.amount)
  //   .slice(indexOfFirstItem, indexOfLastItem);

  // console.log(topStakers);
  function togglePage(value) {
    // console.log("clicked");
    if (value > 0 && value <= totalPage) {
      setCurrentPage(value);
    }
  }
  return (
    <div className="top_box">
      <div
        className="top_items"
        style={{ color: "gray", fontSize: "1.2rem", fontWeight: "bold" }}
      >
        <span style={{ textAlign: "left" }}>RANK</span>
        <span>OWNER</span>
        <span>MINING MULTIPLIER</span>
        <span style={{ textAlign: "right" }}>STAKED</span>
      </div>
      {topstakers
        .sort((a, b) => b.amount - a.amount)
        .slice(indexOfFirstItem, indexOfLastItem)
        .map((element, index) => {
          return (
            <div className="top_items" key={element.owner}>
              <span className="top_index">
                {numToLogo(index + 1 + (itemsPerPage * currentPage - itemsPerPage))}
              </span>
              <span className="top_owner">{element.owner}</span>
              <span className="top_bonus">
                {calculateMultiplier(element.amount)}x
              </span>
              <div className="top_quantity">
                <span>{parse_numbers(element.amount)}</span>
                <img src="HERB.png" alt="" />
              </div>
            </div>
          );
        })}
      <div className="paginationButton">
        <span
          onClick={() => {
            togglePage(currentPage - 1);
          }}
        >
          Prev
        </span>
        <span
          onClick={() => {
            togglePage(1);
          }}
        >
          1
        </span>
        <span
          onClick={() => {
            togglePage(Math.floor(totalPage/2));
          }}
        >
          {Math.floor(totalPage/2)}
        </span>
        <span
          onClick={() => {
            togglePage(totalPage);
          }}
        >
          {totalPage}
        </span>
        <span
          onClick={() => {
            togglePage(currentPage + 1);
          }}
        >
          Next
        </span>
      </div>
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

function calculateMultiplier(amount) {
  if (amount >= 25000) {
    // return "50%";
    return 1.5;
  } else if (amount >= 17500) {
    // return "35%";
    return 1.35;
  } else if (amount >= 10000) {
    // return "20%";
    return 1.2;
  } else if (amount >= 5000) {
    // return "10%";
    return 1.1;
  } else if (amount >= 2500) {
    // return "5%";
    return 1.05;
  } else {
    // return "0%";
    return 1;
  }
}
