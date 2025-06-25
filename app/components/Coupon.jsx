"use client";
import React, { useEffect, useState } from "react";
import "../Coupon.css";

const CouponPage = () => {
  // const onChange = (e) => {
  //   let amount = e.target.value;
  //   if (amount <= 0) {
  //     amount = 1;
  //   }
  //   setAmount(amount);
  // };

  // const [amount, setAmount] = useState(1);

  const onTokenChange = (e) => {
    let token = e.target.value;
    setToken(token);
  };

  const [token, setToken] = useState("WAX");
  const [gen, setGen] = useState({ code: "", hash: "" });
  const [copied, setCopied] = useState(false);
  return (
    <div className="coupon_box">
      <div className="redeem_section coupon_card">
        {/* <input type="text" placeholder="wallet" /> */}
        <input type="text" placeholder="HERB-KD7FRY-PLX9ZT" />
        <button
          onClick={() => {
            alert(
              "✅ currently disabled! go to -> https://waxblock.io/account/gift.herb?action=claim#contract-actions "
            );
            // alert("✅ claimed successfully!");
          }}
        >
          redeem
        </button>
      </div>
      <div className="generate_section coupon_card">
        {/* <input
          type="number"
          name=""
          id=""
          placeholder="100"
          value={amount}
          onChange={(e) => {
            onChange(e);
          }}
        /> */}
        <select
          id="gift_token"
          name="token"
          value={token}
          onChange={(e) => {
            onTokenChange(e);
          }}
        >
          <option value="wax">WAX</option>
          <option value="herb">HERB</option>
        </select>
        <button
          onClick={async () => {
            // Example usage:
            let code = generateGiftCode(token); // ➤ HERB-KD7FR-PLX9Z
            setGen({ code: code, hash: await oneWayHash(code) });
          }}
        >
          generate
        </button>
      </div>

      <div className="generatedCode_section coupon_card">
        <label htmlFor="">HASH:</label>
        <input
          id="hash"
          type="text"
          value={gen.hash}
          disabled
          placeholder="..."
        />

        <label htmlFor="">GIFTCODE:</label>
        <input type="text" value={gen.code} disabled placeholder="..." />
        <div>
          <button
            className="copybtn"
            onClick={() => {
              copyGiftCode(gen.hash);
            }}
            disabled={!gen.hash}
          >
            copy hash
          </button>
          <button
            className="copybtn"
            onClick={() => {
              copyGiftCode(gen.code);
            }}
            disabled={!gen.code}
          >
            copy code
          </button>
        </div>
        <small>
          🔐 Your gift code is private and won’t be stored.{" "}
          <strong>Save it now.</strong>
        </small>
      </div>
      <div>
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
            <li>
              Visit:{" "}
              <a
                href="https://waxblock.io/account/gift.herb?action=add#contract-actions"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0070f3", textDecoration: "underline" }}
              >
                waxblock.io 🔗
              </a>
            </li>
          </ol>

          <p style={{ color: "#cc0000", fontSize: "12px", marginTop: "8px" }}>
            ⚠️ This gift code won't work until you complete the activation step.
          </p>
        </div>
      </div>
    </div>
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

function copyGiftCode(code) {
  navigator.clipboard
    .writeText(code)
    .then(() => {
      alert("Copied to clipboard!");
    })
    .catch((err) => {
      alert("Failed to copy: " + err);
    });
}

export default CouponPage;
