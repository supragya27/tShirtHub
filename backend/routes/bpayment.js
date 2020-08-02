const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/bpayment");
const router = express.Router();

router.get("/bpayment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);
router.post(
  "/bpayment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
