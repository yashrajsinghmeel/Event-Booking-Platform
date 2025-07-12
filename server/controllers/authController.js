// authController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { sendOTP } from "../utils/sendOTP.js";

// Step 1: Register with phone + username
export const sendOtp = async (req, res) => {
  const { username, phone } = req.body;

  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    return res.status(400).json({ message: "Phone number already registered" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit

  const hashedOtp = await bcrypt.hash(otp, 10);
  const newUser = new User({ username, phone });

  await newUser.save();

  await Otp.deleteMany({ phone }); // 🆕 remove old OTPs
  await Otp.create({ phone, otp: hashedOtp }); // 🆕 save hashed OTP

  // Integrate SMS sending API like Twilio, Fast2SMS, MSG91
  console.log(`✅ OTP for ${phone}: ${otp}`); // remove in production

  try {
    await sendOTP(phone, otp);
    // Optionally: store OTP in DB or session
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

// resend OTP
export const resendOtp = async (req, res) => {
  const { phone } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Delete any previous OTPs
    await Otp.deleteMany({ phone });

    // Save new OTP
    await Otp.create({ phone, otp: hashedOtp });

    // Send via SMS
    await sendOTP(phone, otp);
    console.log(`✅ [RESEND OTP] for ${phone}: ${otp}`); // dev only

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("❌ Error resending OTP:", error);
    res.status(500).json({ message: "Failed to resend OTP", error });
  }
};

// Step 2: Verify OTP
export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  const user = await User.findById(userId);
  if (!user)
    return res
      .status(404)
      .json({ message: "User not found, please register first" });

  const otpRecord = await Otp.findOne({ phone: user.phone }); // 🆕
  if (!otpRecord)
    return res
      .status(400)
      .json({ message: "OTP expired or not found, resend Otp" });

  const isMatch = await bcrypt.compare(otp, otpRecord.otp); // 🆕
  if (!isMatch) return res.status(400).json({ message: "Invalid OTP" });

  user.isVerified = true;
  await user.save();
  await Otp.deleteMany({ phone: user.phone }); // 🆕 Clean up OTP

  res.status(200).json({ message: "OTP verified successfully" });
};

// Step 3: Set password after OTP
export const setPassword = async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({ message: "User not found, please signup" });
  }

  if (!user.isVerified) {
    return res.status(400).json({ message: "User not verified, otp sent " });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();

  res
    .status(200)
    .json({ message: "Password set successfully. You can now log in." });
};

// Login user with phone number
export const loginUser = async (req, res) => {
  const { phone, password, role } = req.body;

  try {
    const user = await User.findOne({ phone, role });
    if (!user) {
      return res.status(400).json({ message: "Oops! New here? Sign up 😄 " });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "user not verified otp sent " });
    }

    const isMatch =  bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ Set session data
    req.session.user = {
      _id: user._id,
      name: user.username,
      phone: user.phone,
      role: user.role,
    };

    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

// ✅ Logout user (clear session)
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logout successful" });
  });
};

// Forget Password Section

// send reset Otp
export const sendResetOtp = async (req, res) => {
  const { phone } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found, please signup" });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "User is not verified, otp sent" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await Otp.deleteMany({ phone }); // Remove old
    await Otp.create({ phone, otp: hashedOtp });

    await sendOTP(phone, otp); // via Twilio
    console.log(`✅ [RESET OTP] for ${phone}: ${otp}`);

    res.status(200).json({
      message: "OTP sent for password reset",
      phone,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error });
  }
};

// verify resetOTP

export const verifyResetOtp = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ phone });
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    const isMatch = await bcrypt.compare(otp, otpRecord.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Optional: mark that user can now reset password
    await Otp.deleteMany({ phone });

    res.status(200).json({
      message: "OTP verified. You can now reset your password.",
      phone,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to verify OTP", error });
  }
};

// resetPassword

export const resetPassword = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User not found, please signup" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "User not verified, otp sent " });
    }
    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to reset password", error });
  }
};

// ✅ Get current user (if session is active)
export const getCurrentUser = async(req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  
  const phone = req.session.user.phone;
  const user = await User.findOne({phone});
  // Later, when user adds email
  req.session.user.email = user.email;
  // or
  // req.session.user = {
    //   ...req.session.user,
    //   email: user.email
    // };
    

  res.status(200).json({ user: req.session.user });
};
