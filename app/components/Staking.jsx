"use client";
import React, { useEffect } from "react";
import Button from "../components/Button";
const Staking = ({
  isuser,
  staked,
  claim,
  lastClaim,
  setClaim,
  unstaked,
  unlockCooldown,
  setModal,
  setType,
  info,
}) => {
  useEffect(() => {
    // if(isuser){
    const intervalId = setInterval(() => {
      // console.log(staked+unstaked);
      setClaim(calculateClaim(staked, lastClaim, info.base_apr));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="staking_reward">
        {/* <h2>Claimable Earning</h2> */}
        <h2 className="main_heading" style={{marginTop:'9rem'}}>Staking Information</h2>
        <div className="claim_box">
          <span className="claim_amount">
            <img src="HERB.png" alt="" />
            <span>{claim.toFixed(4)}</span>
          </span>
          <span className="reward_perhour">{`(${(
            staked *
            (info.base_apr / 100 / 365 / 24)
          ).toFixed(4)}/h)`}</span>
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
          <span className="amount">{staked} HERB</span>
          <Button
            text={"stake"}
            setModal={setModal}
            setType={setType}
            isuser={isuser}
          />
        </div>

        {
          <div className="unstake_box">
            <span className="title">Unstaked</span>
            <span className="amount">{unstaked} HERB</span>

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
          </div>
        }
        {/* </div> */}
        <div className="redeem_box">
          <span className="redeem_cooldown">
            {unlockCooldown - Date.now() > 0
              ? calculateTimeLeft(unlockCooldown)
              : 0}
          </span>
          <Button
            text={"redeem"}
            setModal={setModal}
            setType={setType}
            isuser={isuser}
          />
        </div>
      </div>

      <hr
        style={{
          color: "white",
          opacity: "0.5",
          width: "80vw",
          margin: "1rem",
        }}
      />
    </>
  );
};

export default Staking;

//helper function

function calculateClaim(staked_amount, last_claim, apy) {
  let current_time = Date.now();
  let elapsed_time = (current_time - parseInt(last_claim)) / 1000;
  // const apy = 0.1; // 10% APY
  const reward_per_second = apy / 100 / 365 / 24 / 60 / 60; // APY converted to per second
  let claim_amount = staked_amount * reward_per_second * elapsed_time;
  return claim_amount;
}

function calculateTimeLeft(unlockTime) {
  var currentTime = Date.now();
  var timeDifference = parseInt(unlockTime) - currentTime;

  var seconds = Math.floor((timeDifference / 1000) % 60);
  var minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  var hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
