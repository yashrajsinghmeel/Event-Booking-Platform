// utils/sendOTP.js
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOTP = async (toPhone, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP is:  ${otp} , Hello Mummy this is yashraj`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${toPhone}`,
    });

    console.log("✅ OTP sent:", message.sid);
    return message.sid;
  } catch (error) {
    console.error("❌ Failed to send OTP:", error);
    throw error;
  }
};
