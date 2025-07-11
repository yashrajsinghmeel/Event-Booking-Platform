// ✅ Updated: controllers/bookingController.js
import Booking from "../models/Booking.js";
import { generateQRCodeImage } from "../utils/generateQr.js";
import Event from "../models/Event.js";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.QR_SECRET_KEY || "default_fallback_secret";

function signQRCodeData(payload) {
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(payload);
  const signature = hmac.digest("hex");
  return `${payload}:${signature}`;
}

// get all ticket
export const getAllBooking = async (req, res) => {
  const { userId } = req.params;
  try {
    const ticket = await Booking.find({ userId });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets" }, error);
  }
};

// get ticket by booking Id
export const getBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const ticket = await Booking.findById(bookingId);
    if (!ticket) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ ticket, message: "Ticket fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch ticket", error });
  }
};

// ✅ Public Route — Use this only if event is FREE or Admin confirms payment manually
export const createBooking = async (req, res) => {
  const { email, phone, name, userId, eventId, ticketCount } = req.body;
  const event = await Event.findById(eventId);
  const price = event.price;
  const amount = price * ticketCount;

  try {
    const newBooking = new Booking({
      email,
      amount,
      phone,
      name,
      userId,
      eventId,
      ticketCount,
      paymentStatus: "pending", // 👈 changed from 'paid' to 'pending'
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking created with pending payment",
      bookingId: newBooking._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error });
    console.log(error);
  }
};

// 👨‍👦 Dad’s Note: Exposed for paymentController only — not as a direct route
export const createSecureBooking = async ({ bookingId }, res) => {
  try {
    const ticket = await Booking.findById(bookingId);
    if (!ticket) {
      res.status(404).json({ message: "Booking not found" });
    }
    const { userId, eventId, ticketCount, name, amount, phone, email } = ticket;
    const newBooking = new Booking({
      userId,
      eventId,
      ticketCount,
      name,
      amount,
      phone,
      email,
      paymentStatus: "paid", // ✅ payment verified, safe to mark as paid
    });

    await newBooking.save();

    const payload = `bookingId=${newBooking._id}&userId=${userId}`;
    const signedData = signQRCodeData(payload);
    const qrImage = await generateQRCodeImage(signedData);
    newBooking.qrCodeImage = qrImage;
    await newBooking.save();

    res.status(201).json({
      message: "Payment verified and booking completed",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to finalize booking", error });
  }
};
