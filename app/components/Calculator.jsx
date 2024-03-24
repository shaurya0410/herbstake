"use client";
import React, { useState } from "react";
import "../Calculator.css";
const Calculator = () => {
  const handleCalculate = async () => {
    const reward_per_second = 0.08 / 365 / 24 / 60 / 60; // APY converted to per second
    let claim_amount_second = calc.amount * reward_per_second;
    setCalc((prevObj) => ({
      ...prevObj,
      amount: calc.amount,
      claim_amount_second: claim_amount_second,
    }));
  };

  const onChange = (e) => {
    let amount = e.target.value;
    if (amount > 10000000) {
      amount = 10000000;
    }
    setCalc((prevObj) => ({
      ...prevObj,
      amount: amount,
      claim_amount_second: 0,
    }));
  };
  const [calc, setCalc] = useState({ amount: 0, claim_amount_second: 0 });
  return (
    <form className="calc_form">
      <div className="calc_input_box">
        <div className="calc_input_item">
          <span>Amount</span>
          <input
            type="number"
            value={calc.amount}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <img src="HERB.png" alt="" />
        </div>
        {/* <div className="calc_input_item">
          <span>USD</span>
          <input type="text" />
          <img src="USDT.png" alt="" />
        </div> */}
      </div>
      <div className="calc_profit_box">
        <div className="calc_profit_item">
          <span className="title">Daily profit</span>
          <span>
            {((calc.claim_amount_second * 365 * 24 * 60 * 60) / 365).toFixed(4)}{" "}
            HERB
          </span>
        </div>
        <div className="calc_profit_item">
          <span className="title">Monthly profit</span>
          <span>
            {((calc.claim_amount_second * 365 * 24 * 60 * 60) / 12).toFixed(4)}{" "}
            HERB
          </span>
        </div>
        <div className="calc_profit_item">
          <span className="title">Yearly profit</span>
          <span>
            {(calc.claim_amount_second * 365 * 24 * 60 * 60).toFixed(4)} HERB
          </span>
        </div>
        <div className="calc_profit_item">
          <span className="title">Yearly yield</span>
          <span>{"8%"}</span>
        </div>
      </div>
      {calc.amount > 0? (
        <button
          className="calc_btn"
          onClick={(e) => {
            e.preventDefault();
            handleCalculate();
          }}
        >
          Calculate
        </button>
      ) : (
        <button disabled style={{ opacity: "0.5" }} className="calc_btn">
          Calculate
        </button>
      )}
    </form>
  );
};

export default Calculator;
