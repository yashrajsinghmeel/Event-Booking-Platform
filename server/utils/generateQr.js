// ✅ Updated: utils/generateQr.js
// Utility to generate base64 QR code from signed payload
import QRCode from "qrcode";

export const generateQRCodeImage = async (data) => {
  try {
    const qrImageUrl = await QRCode.toDataURL(data); // Base64 string
    return qrImageUrl;
  } catch (err) {
    throw new Error("QR code generation failed");
  }
};