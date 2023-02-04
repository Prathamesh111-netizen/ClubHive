import dotenv from "dotenv";
import Razorpay from "razorpay";
import shortid from "shortid";
dotenv.config();

const razorpayOrder = async (req, res, next) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const payment_capture = 1;
    const amount = req.body.amount ? req.body.amount : 100;
    const currency = req.body.currency ? req.body.currency : "INR";

    const options = {
      amount: parseInt(amount) * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
};

const razorpayVerify = async (req, res, next) => {
  try {
    const secret = process.env.secret;

    console.log(req.body);

    const crypto = require("crypto");

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log(digest, req.headers["x-razorpay-signature"]);

    if (digest === req.headers["x-razorpay-signature"]) {
      console.log("request is legit");
      // process it
      require("fs").writeFileSync(
        "payment1.json",
        JSON.stringify(req.body, null, 4)
      );
    } else {
      // pass it
    }
    res.json({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

export { razorpayVerify, razorpayOrder };
