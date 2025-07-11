// server/controllers/paymentController.js

import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import { createSecureBooking } from "./bookingController.js"; // 👈 Import helper logic

// 💳 STEP 1: Create a Razorpay Order (amount verified server-side)
export const createOrder = async (req, res) => {
  const { bookingId } = req.body;

  try {
    const ticket = await Booking.findById(bookingId);
    if (!ticket) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const {eventId,ticketCount} = ticket;

    // ✅ Step 1: Fetch actual event from DB
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 💰 Calculate total price securely
    const amount = event.price * ticketCount;

    // 🧾 Create Razorpay order
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`, // ✅ always < 40
    };

    const order = await razorpay.orders.create(options);

    // 📝 Optional: Save pending booking info in-memory or DB (advanced version)

    res.status(201).json({
      success: true,
      order,
      amount,
      currency: "INR",
      ticket,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create Razorpay order", error: err });
  }
};

// 💳 STEP 2: Verify Razorpay Signature and Create Booking
export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingId,
  } = req.body;

  try {
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // 👇 Call the secure booking + QR code logic from bookingController
    await createSecureBooking({ bookingId }, res);
  } catch (error) {
    res.status(500).json({ message: "Payment verification failed", error });
  }
};

/*
👨‍👦 NOTES FROM DAD:
- Never trust amount/ticket count from frontend. Always check server-side.
- Save receipt/order mapping if scaling big.
- Use Razorpay Webhooks for even stronger security (not required now but good future step).
*/
