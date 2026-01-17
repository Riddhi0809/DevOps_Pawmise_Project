require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
app.use(cors());
app.use(express.json());

/* -------------------- MongoDB -------------------- */
mongoose.connect(process.env.MONGO_URI, { dbName: 'pet_app' })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

/* -------------------- Routes -------------------- */
app.use('/api/visits', require('./routes/visit'));
app.use('/api/board', require('./routes/board'));
app.use('/api', require('./routes/auth'));

/* -------------------- Razorpay -------------------- */
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
  console.log("Razorpay initialized");
} else {
  console.warn("Razorpay keys not found, payment API disabled");
}

/* -------------------- Payment Route -------------------- */
app.post('/api/payment/orders', async (req, res) => {
  try {
    if (!razorpay) return res.status(500).json({ error: "Payment service not configured" });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);

  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- Server -------------------- */
/*const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));*/

module.exports = app;

