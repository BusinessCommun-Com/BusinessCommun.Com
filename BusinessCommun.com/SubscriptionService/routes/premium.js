const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const pool = require('../db');

require('dotenv').config({ path: '\.env' });

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. Create Order
router.post('/create-razorpay-order', async (req, res) => {
  const { amount } = req.body;
  try {
    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Verify and Update Database

router.post('/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, plan, amount } = req.body;

  // Verify signature
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // 1. Update User Premium Status
      // Set is_premium to 1 and store the payment ID as the subscription reference
      await connection.query(
        'UPDATE users SET is_premium = 1, subscription_id = ? WHERE id = ?',
        [razorpay_payment_id, userId]
      );

      // 2. Log the Purchase in purchases table
      await connection.query(
        'INSERT INTO purchases (userId, plan, amount, razorpay_order_id) VALUES (?, ?, ?, ?)',
        [userId, plan, amount, razorpay_order_id]
      );

      await connection.commit();

      const [userRows] = await connection.query(
        'SELECT email, username FROM users WHERE id = ?',
        [userId]
      );

      const userEmail = userRows.length > 0 ? userRows[0].email : null;
      const userName = userRows.length > 0 ? userRows[0].name : userId;

      res.json({
        status: 'success',
        message: 'Premium unlocked!',
        userEmail: userEmail, // Critical for EmailJS
        userName: userName   // Send name back to frontend
      });

    } catch (dbErr) {
      await connection.rollback();
      res.status(500).json({ status: 'error', error: dbErr.message });
    } finally {
      connection.release();
    }
  } else {
    res.status(400).json({ status: 'failure', message: 'Invalid signature' });
  }
});

// 3. Get Investors (Modified to check premium status)
router.get("/investors", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT is_premium FROM users WHERE id = ?",
      [userId],
    );

    // Check if user exists and is_premium is truthy (1 or "1")
    const isPremium = rows.length > 0 && Boolean(rows[0].is_premium);

    if (isPremium) {
      const [investors] = await pool.query("SELECT * FROM investors");
      return res.json({ preview: false, investors });
    }

    // Fallback for non-premium users
    const [preview] = await pool.query(
      "SELECT id, name, company FROM investors LIMIT 3",
    );
    res.json({ preview: true, investors: preview });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;