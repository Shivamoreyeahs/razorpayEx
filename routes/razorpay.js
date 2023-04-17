const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: "rzp_test_CKwqpCdj1wAf",
  key_secret: "xZahgFJXV8qgNAvMEgPE9f",
});

router.get("/", (req, res) => {
  var options = {
    amount: 600 * 100,
    currency: "INR",
  };
  instance.orders.create(options, (err, order) => {
    if (err) {
      console.log(`Error creating order: ${err}`);
    } else {
      console.log(order);
      res.render("checkout", { amount: order.amount, order_id: order.id });
    }
  });
});

router.post("/pay-verify", (req, res) => {
  console.log(req.body);
  body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", "xZahgFJXV8hxqgNAvMEgPE9f")
    .update(body.toString())
    .digest("hex");
  console.log("signature" +" : " + req.body.razorpay_signature);
  console.log("signature" +" : " + expectedSignature);

  if (expectedSignature === req.body.razorpay_signature) {
    console.log("Payment Success");
  } else {
    console.log("Payment Fail");
  }
});

module.exports = router;
