// server/index.js

import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import sessionMiddleware from "./config/session.js";
import { corsOptions } from "./config/corsOptions.js";
import cron from "node-cron";
import deleteUnpaidBookings from "./tasks/deleteUnpaidBookings.js";

cron.schedule("*/5 * * * *", deleteUnpaidBookings); // every 5 min
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares (you can add bodyParser, cors, etc.)
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(sessionMiddleware);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
