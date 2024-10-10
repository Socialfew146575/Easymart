const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  getStripeApiKey,
  processPayment,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/payment/process", isAuthenticatedUser, processPayment);

router.get("/stripeapikey", isAuthenticatedUser, getStripeApiKey);

module.exports = router;
