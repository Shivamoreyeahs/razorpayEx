const express = require("express");
const app = express();
const morgan = require("morgan");
const expresslayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

const razorpayRoute = require("./routes/razorpay");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("tiny"));
console.log("Morgan was enabled...");

app.use(expresslayouts);
app.set("view engine", "ejs");

app.use(express.json());
app.use("/", require("./routes/index"));
app.use("/checkout", razorpayRoute);
// app.use('/pay-verify',razorpayRoute)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}.`);
});
