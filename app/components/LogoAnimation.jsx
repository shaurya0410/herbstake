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
//   useEffect(() => {
//     displayImage();
//   }, []);

//   function displayImage() {
//     var copy = document.querySelector("#logo-items").cloneNode(true);
//     document.querySelector(".logos").appendChild(copy);
//   }
  return (
    <section id="section-3">
      {/* <!-- <h3>Supported Tokens</h3> --> */}
      <div className="logos">
        <div id="logo-items" className="logos-slide">
          {tokens.map((token) => {
            return <img src={`${token}.png`} alt={token} key={token}/>;
          })}
        </div>
      </div>
    </section>
  );
};

export default LogoAnimation;
