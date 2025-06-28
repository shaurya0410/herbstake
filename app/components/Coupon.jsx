"use client";
import React, { useEffect, useState } from "react";
import "../Coupon.css";
import Login from "../components/Login";
import * as waxjs from "@waxio/waxjs/dist";
const wax = new waxjs.WaxJS({
  rpcEndpoint: "https://wax.greymass.com",
  // tryAutoLogin: false,
});

import AnchorLink from "anchor-link";
import AnchorLinkBrowserTransport from "anchor-link-browser-transport";
import GiftCode from "./GiftCode";

const transport = new AnchorLinkBrowserTransport();
const link = new AnchorLink({
  transport,
  chains: [
    {
      chainId:
        "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
      nodeUrl: "https://wax.greymass.com",
    },
  ],
});
const CouponPage = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [wallet, setWallet] = useState("wax"); //anchor
  const [session, setSession] = useState("");
  const [isuser, setIsUser] = useState(false);
  // const [topstakers, setTopstakers] = useState([]);
  // const [user, setUser] = useState('...');
  const [user, setUser] = useState({
    owner: "...",
    balance: "0",
  });

  const onChangeRC = (e) => {
    let code = e.target.value;
    setRedeemCode(code);
  };

  const [amount, setAmount] = useState();

  const onTokenChange = (e) => {
    let token = e.target.value;
    setToken(token);
  };

  const onChange = (e) => {
    let amount = e.target.value;
    if (amount <= 0) {
      setAmount(0);
    } else {
      setAmount(amount);
    }
  };

  const onCountChange = (e) => {
    let amount = e.target.value;
    if (amount < 1 || amount > 10) {
      setCount(1);
    } else {
      setCount(amount);
    }
  };

  const [redeemCode, setRedeemCode] = useState("");
  const [token, setToken] = useState("WAX");
  // const [gen, setGen] = useState({ code: "", hash: "" });
  const [codes, setCodes] = useState([]);
  const [count, setCount] = useState(); // number of codes to generate
  const [success, setSuccess] = useState(0);

  const generateBatchCodes = async (token, count) => {
    let result = [];
    let hashArray = [];
    for (let i = 0; i < count; i++) {
      let code = generateGiftCode(token);
      let hash = await oneWayHash(code);
      result.push({ code, hash });
      hashArray.push(hash);
    }
    setCodes(result);
    return hashArray.join(","); // Return comma-separated hash string
  };

  const wax_transact_redeem = async (_owner, _giftcode) => {
    try {
      if (wallet == "wax") {
        const result = await wax.api.transact(
          {
            actions: [
              {
                account: "gift.herb",
                name: "claim",
                authorization: [
                  {
                    actor: _owner,
                    permission: "active",
                  },
                ],
                data: {
                  user: _owner,
                  giftcode: _giftcode,
                },
              },
            ],
          },
          {
            blocksBehind: 3,
            expireSeconds: 1200,
          }
        );

        return { value: 1, message: result.transaction_id };
      } else {
        const action = {
          account: "gift.herb",
          name: "claim",
          authorization: [session.auth],
          data: {
            user: _owner,
            giftcode: _giftcode,
          },
        };

        const tx = await session.transact({ action });
        return { value: 1, message: tx.processed.id };
      }
    } catch (error) {
      // return -1;
      return { value: -1, message: error.message };
    }
  };

  const wax_transact_generate = async (
    _owner,
    _quantity,
    _code_hash,
    _symbol
  ) => {
    let contract = _symbol == "HERB" ? "naturestoken" : "eosio.token";
    let decimal = _symbol == "HERB" ? "4" : "8";

    try {
      if (wallet == "wax") {
        const result = await wax.api.transact(
          {
            actions: [
              {
                account: contract,
                name: "transfer",
                authorization: [
                  {
                    actor: _owner,
                    permission: "active",
                  },
                ],
                data: {
                  from: _owner,
                  to: "gift.herb",
                  quantity: `${parseFloat(_quantity).toFixed(
                    decimal
                  )} ${_symbol}`,
                  memo: _code_hash,
                },
              },
            ],
          },
          {
            blocksBehind: 3,
            expireSeconds: 1200,
          }
        );

        return { value: 1, message: result.transaction_id };
      } else {
        const action = {
          account: contract,
          name: "transfer",
          authorization: [session.auth],
          data: {
            from: _owner,
            to: "gift.herb",
            quantity: `${parseFloat(_quantity).toFixed(decimal)} ${_symbol}`,
            memo: _code_hash,
          },
        };

        const tx = await session.transact({ action });
        return { value: 1, message: tx.processed.id };
      }
    } catch (error) {
      // return -1;
      return { value: -1, message: error.message };
    }
  };

  return (
    <>
      <div className="wallet_box">
        {!isuser ? (
          <button
            className="btn"
            onClick={() => {
              setLoginModal(true);
            }}
          >
            {`connect`}
          </button>
        ) : (
          <button
            className="btn"
            onClick={async () => {
              try {
                wax.logout();
                if (session) {
                  session.remove();
                }
                setIsUser(false);
                // reset();
                // setWallet("");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {`${user.owner}`}
          </button>
        )}
      </div>

      <div className="coupon_box">
        <div className="redeem_section coupon_card">
          {/* <input type="text" placeholder="wallet" /> */}
          <input
            type="text"
            placeholder="HERB-KD7FRY-PLX9ZT"
            value={redeemCode}
            onChange={onChangeRC}
          />
          <button
            onClick={async () => {
              try {
                // console.log(user.owner=='...');
                if (user.owner == "...") {
                  alert("connect wallet!");
                  return;
                } else {
                  let tx = await wax_transact_redeem(user.owner, redeemCode);
                  if (tx.value != -1) {
                    alert(`claimed! ✅`);
                  } else {
                    alert(tx.message);
                  }
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            redeem
          </button>
        </div>
        <div className="generate_section coupon_card">
          <input
            type="number"
            name=""
            value={amount}
            onChange={(e) => {
              onChange(e);
            }}
            placeholder="amount"
          />
          <select
            id="gift_token"
            name="token"
            value={token}
            onChange={(e) => {
              onTokenChange(e);
            }}
          >
            <option value="WAX">WAX</option>
            <option value="HERB">HERB</option>
          </select>
          {/* <label htmlFor="">count</label> */}
          <input
            type="number"
            value={count}
            onChange={onCountChange}
            placeholder="no. of codes"
          />
          <button
            onClick={async () => {
              try {
                // console.log(user.owner=='...');
                if (user.owner == "...") {
                  alert("connect wallet!");
                  return;
                } else {
                  // Example usage:
                  // let code = generateGiftCode(token); // ➤ HERB-KD7FR-PLX9Z
                  // let hash = (await oneWayHash(code)).toString();
                  const memoString = await generateBatchCodes(token, count);
                  console.log(memoString);
                  let tx = await wax_transact_generate(
                    user.owner,
                    amount,
                    memoString,
                    token
                  );
                  if (tx.value != -1) {
                    // setGen({ code: code, hash: hash });
                    setSuccess(1);
                    alert(`Code generated! ✅`);
                  } else {
                    alert(tx.message);
                  }
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            generate
          </button>
        </div>

        <div className="generatedCode_section coupon_card">
          <label htmlFor="">GIFTCODE:</label>
          {success ? (
            codes.map((item, index) => (
              <GiftCode code={item.code} key={index} />
            ))
          ) : (
            <GiftCode code={"..."} />
          )}

          <small>
            🔐 Your gift code is private and won’t be stored.{" "}
            <strong>Save it now.</strong>
          </small>
        </div>
        {/* <div>
          <div
            className=""
            style={{
              border: "none",
              borderTop: "2px solid rgba(255, 255, 255, 0.5)",
              padding: "1rem",
              borderRadius: "8px",
              background: "black",
              maxWidth: "600px",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "0.5rem",
              }}
            >
              🔒 Activate Your Gift Code
            </p>

            <ol style={{ paddingLeft: "1.2rem", marginBottom: "1rem" }}>
              <li>
                Copy the generated <strong>hash</strong> above.
              </li>
              <li>
                Send a deposit to{" "}
                <code style={{ padding: "2px 4px", borderRadius: "4px" }}>
                  gift.herb
                </code>{" "}
                with your desired amount.
              </li>
              <li>
                Paste the copied hash as the <strong>memo</strong> in the
                transfer.
              </li>
              <li>GiftCode is ready to share.</li>
            </ol>

            <p style={{ color: "#cc0000", fontSize: "12px", marginTop: "8px" }}>
              ⚠️ This gift code won&apos;t work until you complete the
              activation step.
            </p>
          </div>
        </div> */}
      </div>

      {loginModal && (
        <Login
          setLoginModal={setLoginModal}
          // getData={getData}
          setUser={setUser}
          setSession={setSession}
          setIsUser={setIsUser}
          setWallet={setWallet}
          link={link}
          wax={wax}
        />
      )}
    </>
  );
};

async function oneWayHash(code) {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(buffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

function generateGiftCode(prefix) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset[randomIndex];
  }
  // Split into readable parts
  const formattedCode = code.slice(0, 6) + "-" + code.slice(6);
  return `${prefix.toUpperCase()}-${formattedCode}`;
}

export default CouponPage;
