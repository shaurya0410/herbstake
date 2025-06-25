"use server";
import "dotenv/config";
import mongoose from "mongoose";
import PromoCode from "../app/model/PromoCode";

const mongoURI = process.env.DB;

mongoose
  .connect(mongoURI)
  .then(console.log("connected to mongodb"))
  .catch((error) => {
    console.log(error);
  });

function generateRandomCode(prefix) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset[randomIndex];
  }
  // Split into readable parts
  const formattedCode = code.slice(0, 6) + "-" + code.slice(6);
  return `${prefix}-${formattedCode}`;
}

// Example usage:
console.log(generateGiftCode("HERB")); // ➤ HERB-KD7FR-PLX9Z

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

oneWayHash("HERB-KD7FR-PLX9Z").then(console.log);
// ➤ a3c15e72f1240b11c8943f9b1f738ba44a7cd6be348c4db95096d37f1b0c2031

export async function applyPromoCode(code, account) {
  try {
    let data = await PromoCode.findOne({ promoCode: code });

    //checking whether code exist
    if (data) {
      //checking whether code already redeemed
      if (data.isRedeemed) {
        return {
          success: false,
          message: "Promo code is expired",
        };
      }

      //redeeming code
      await PromoCode.findOneAndUpdate(
        { promoCode: code },
        {
          $set: {
            redeemedBy: account,
            redeemedAt: Date.now(),
            isRedeemed: true,
          },
        }
      );

      return { success: true, message: "Promo code redeemed successfully" };
    } else {
      return { success: false, message: "Invalid redeem code" };
    }
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
}

export async function newPromoCode(account) {
  try {
    let code = await generateRandomCode();
    let data = await PromoCode.findOne({ promoCode: code });

    //checking whether redeem code already exist (2x)
    if (data) {
      code = await generateRandomCode();
      data = await PromoCode.findOne({ promoCode: code });
      if (data) {
        return { success: false, message: "redeem code already exist" };
      }
    }

    //creating new redeem code
    await PromoCode.create({
      promoCode: code,
      createdBy: account,
      createdAt: Date.now(),
    });
    return { success: true, message: code };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
}
