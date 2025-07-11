// ✅ Updated: models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    ticketCount: {
      type: Number,
      required: true,
      min: 1,
    },
    qrCodeImage: {
      type: String, // Stores signed data string
     
    },
    isScanned: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true, 
      lowercase: true, // always save emails in lowercase
      trim: true, // remove extra spaces
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, collection: "Booking" }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
