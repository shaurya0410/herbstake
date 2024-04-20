"use client";
import React, { useState, useEffect } from "react";
import "../app/Home.css";
import LogoAnimation from "./components/LogoAnimation";
const MainPage = () => {
  return (
    <>
      <section id="section-1">
        <div>
          <h2>Share WAX Blockchain Tokens with Your Friends on Telegram!</h2>
          <p>
            Introducing @HerbTipBot - Your Gateway to Seamlessly Send and
            Receive Tokens on the WAX Blockchain within Your Beloved Telegram
            Group! No need for a WAX wallet or worrying about fees! Engage your
            group members with exciting features such as emoji tips, drops,
            giveaways, and more! It's a whole new way to interact with your
            community. Join us today and revolutionize your Telegram experience!
          </p>
          <span id="btn-box">
            <a href="https://t.me/HerbTipBot" target="_b" id="start-btn">
              Get started
            </a>
            <a href="https://t.me/HerbTipBot" target="_b" id="list-btn">
              List Token
            </a>
          </span>
        </div>
        <div>
          <img src="banner.png" alt="tipbot" />
        </div>
      </section>

      <section id="section-2">
        <h3>Play with HERB</h3>
        <div className="box">
          <a href="https://t.me/chat_herb" target="_b">
            <img src="chat.svg" alt="logo" />
            <span>Chat Mining</span>
            <p>Join our official telegram group!</p>
          </a>

          <a
            href="https://wax.alcor.exchange/trade/herb-naturestoken_wax-eosio.token"
            target="_b"
          >
            <img src="exchange.svg" alt="logo" />
            <span>Herb on Exchange</span>
            <p>HERB/WAX pair is avilable on spot market for trade.</p>
          </a>

          <a
            href="https://wax.alcor.exchange/swap?input=WAX-eosio.token&output=HERB-naturestoken"
            target="_b"
          >
            <img src="swap.svg" alt="logo" />
            <span>Herb on Dex</span>
            <p>Herb can be swapped for another tokens on dex.</p>
          </a>

          <a href="https://swap.tacocrypto.io/meal?search=Herb" target="_b">
            <img src="farm.svg" alt="logo" />
            <span>Liquidity Farming</span>
            <p>Earn reward by stacking your LP token on dex.</p>
          </a>
        </div>
      </section>

      <section id="section-4">
        <h3>Commands</h3>
        <ul>
          <li>
            <b>/help - </b>
            <span>Display commands and usage instructions.</span>
          </li>
          <li>
            <b>/balance - </b>
            <span>Check your token balance.</span>
            <span className="command-syntax">[/balance HERB]</span>
          </li>
          <li>
            <b>/tip - </b>
            <span>
              Send any amount of token to any user by replying there message
              with tip command.
            </span>
            <span className="command-syntax">[/tip 1 HERB]</span>
          </li>
          <li>
            <b>/drop - </b>
            <span>
              Airdrop 1 HERB token to 10 active active member, they must claim
              it within 10 minutes.
            </span>
            <span className="command-syntax">[/drop 1 HERB 10]</span>
          </li>
          <li>
            <b>/giveaway - </b>
            <span>
              Do giveaways of 10 HERB tokens, bot will pick 1 winner from
              participants list after 60 seconds.
            </span>
            <span className="command-syntax">[/giveaway 10 HERB 60]</span>
          </li>
          <li>
            <b>/deposit - </b>
            <span>Get your deposit details.</span>
          </li>
          <li>
            <b>/whitelist - </b>
            <span>Check supported tokens.</span>
          </li>
          <li>
            <b>/withdraw - </b>
            <span>Withdraw any amount of tokens to your wallet address.</span>
            <span className="command-syntax">
              [/withdraw 1 HERB memo account]
            </span>
          </li>
          <li>
            <b>/price - </b>
            <span>To check current price and details of token.</span>
            <span className="command-syntax">[/price HERB]</span>
          </li>
          <li>
            <b>/rain - </b>
            <span>Distribute token to active users.</span>
            <span className="command-syntax">[/rain 1 HERB 1h]</span>
          </li>
        </ul>
      </section>
      <LogoAnimation />
    </>
  );
};

export default MainPage;
