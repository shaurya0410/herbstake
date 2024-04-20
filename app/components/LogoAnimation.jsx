import React, {useEffect} from "react";
import "../../app/Home.css";
const tokens = [
  "HERB",
  "WAX",
  "WUF",
  "USDT",
  "TLM",
  "RLM",
  "WOMBAT",
  "DUST",
  "WHOLY",
  "BANANA",
  "ECR",
  "WOJAK",
  "LEEF",
  "LEAF",
  "SSN",
  "AQUA",
  "PASTA",
  "XYTE",
  "BROKE",
  "SQS",
  "AMG",
  "SKART",
  "WAXFREN",
  // "CHIPS",
  // "CHAO",
  // "SWL",
  "KEK",
  "KASH",
  "BEGGARS",
  "HERB",
  "WAX",
  "WUF",
  "USDT",
  "TLM",
  "RLM",
  "WOMBAT",
  "DUST",
  "WHOLY",
  "BANANA",
  "ECR",
  "WOJAK",
  "LEEF",
  "LEAF",
  "SSN",
  "AQUA",
  "PASTA",
  "XYTE",
  "BROKE",
  "SQS",
  "AMG",
  "SKART",
  "WAXFREN",
  // "CHIPS",
  // "CHAO",
  // "SWL",
  "KEK",
  "KASH",
  "BEGGARS",
];

const LogoAnimation = () => {

  return (
    <section id="section-3">
      {/* <!-- <h3>Supported Tokens</h3> --> */}
      <div className="logos">
        <div id="logo-items" className="logos-slide">
          {tokens.map((token) => {
            let url = `${token}.png`;
            return <img src={url} alt={token} key={token}/>;
          })}
        </div>
      </div>
    </section>
  );
};

export default LogoAnimation;
