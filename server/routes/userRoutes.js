import express from "express";
import {
  sendOtp,
  verifyOtp,
  setPassword,
  loginUser,
  resendOtp,
  sendResetOtp,
  verifyResetOtp,
  resetPassword,
  logoutUser,
  getCurrentUser
} from "../controllers/authController.js";
import { otpRateLimiter } from "../middleware/rateLimiter.js";


const router = express.Router();

router.post("/register/send-otp",otpRateLimiter, sendOtp);
router.post("/register/resend-otp",otpRateLimiter, resendOtp);
router.post("/register/verify-otp", verifyOtp);
router.post("/register/set-password", setPassword);
router.post("/forgot-password/send-otp", otpRateLimiter, sendResetOtp);
router.post("/forgot-password/verify-otp", verifyResetOtp);
router.post("/forgot-password/reset", resetPassword);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", getCurrentUser); // ✅ Add this route

export default router;
