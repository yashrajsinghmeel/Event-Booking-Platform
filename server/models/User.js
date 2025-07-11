import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String, // null before OTP verified
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    email: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, collection: "User" }
);

// 👇 This creates a compound unique index on (phone, role)
userSchema.index({ phone: 1, role: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);
export default User;
