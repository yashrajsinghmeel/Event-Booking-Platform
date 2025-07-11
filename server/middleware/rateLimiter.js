// middleware/rateLimiter.js
import rateLimit from "express-rate-limit";

export const otpRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes time window
  max: 5,
  message: {
    status: 429,
    message: "Too many OTP requests. Please try again after 10 minutes.",
  },
});
