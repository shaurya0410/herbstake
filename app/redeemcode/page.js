"use client";
import React, { useState } from "react";
import "../redeemcode/Style.css";
import crypto from "crypto";
let encryptedText;
let iv = crypto.randomBytes(16);
// Example usage
const password = "superSecretPassword";
// Function to encrypt redeem code
function encrypt(code, password) {
  // iv = crypto.randomBytes(16);
  // console.log('iv',iv)
  const key = crypto.pbkdf2Sync(password, iv, 1000, 32, "sha512");
  // console.log("key",key);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(code, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Function to decrypt redeem code
function decrypt(encryptedCode, password) {
  const key = crypto.pbkdf2Sync(password, iv, 1000, 32, "sha512");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedCode, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

const Page = () => {
  const [code, setCode] = useState({ code: "", amount: "", token: "" });
  const onChange = (e) => {
    setCode({
      ...code,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="code_box">
      <button
        onClick={() => {
          encryptedText = encrypt(code.code, password);
          console.log("Encrypted:", encryptedText);
        }}
      >
        encrypt
      </button>
      <button
        onClick={() => {
          const decryptedText = decrypt(encryptedText, password);
          console.log("Decrypted:", decryptedText);
        }}
      >
        decrypt
      </button>
      <h2>Redeem GiftCodes</h2>
      <form className="code_container">
        <input type="text" placeholder="GiftCode" />
        <input type="text" placeholder="Address" />
        <button>Check</button>
        <button>Redeem</button>
      </form>
      <h2>Generate GiftCode</h2>
      <div className="code_box">
        <input
          type="text"
          name="code"
          value={code.code}
          placeholder="Code"
          onChange={onChange}
        />
        <input
          type="number"
          name="amount"
          value={code.amount}
          placeholder="Amount"
          onChange={onChange}
        />
        <input
          type="text"
          name="token"
          value={code.token}
          placeholder="Token"
          onChange={onChange}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            // const redeemCodes = generateRandomCodes(numberOfCodes, codeLength);
            let redeemCode = generateRandomCode(
              length,
              code.token,
              code.amount
            );
            console.log("Redeem Code:", redeemCode);
            setCode({ ...code, code: redeemCode });
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default Page;

// Define the character set from which to generate the codes
const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Function to generate a random code of a specified length
function generateRandomCode(length, token, amount) {
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset[randomIndex];
  }
  code = `${token}_${code}_${amount}`;
  return code;
}

// Function to generate multiple random codes
// function generateRandomCodes(count, length) {
//   const codes = [];
//   for (let i = 0; i < count; i++) {
//     codes.push(generateRandomCode(length));
//   }
//   return codes;
// }

// Example usage
const length = 12;
// const amount = 1;
// const token = "WAX";
