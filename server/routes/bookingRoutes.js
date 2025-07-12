// server/routes/bookingRoutes.js
import express from "express";
import {
  createBooking,
  createSecureBooking,
  getAllBooking,
  getBooking,
  validateQRCode
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/tempbooking", createBooking); // /api/bookings
router.post("/ticketbooking", createSecureBooking);
router.get("/getTicket/:bookingId", getBooking);
router.get("/getalltickets/:userId",getAllBooking);
router.post("/validate", validateQRCode);

export default router;
