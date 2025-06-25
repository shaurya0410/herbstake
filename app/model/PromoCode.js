const mongoose = require('mongoose');
const promoCodeSchema = new mongoose.Schema({
  promoCode: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    default: "herb",
  },
  redeemedBy: {
    type: String,
  },
  isRedeemed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  redeemedAt: {
    type: Date,
  },
});

const PromoCode = mongoose.models.PromoCode || mongoose.model("PromoCode", promoCodeSchema);

export default PromoCode;
