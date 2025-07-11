import Booking from "../models/Booking.js";

export default async function deleteUnpaidBookings() {
  try {
    const cutoff = new Date(Date.now() - 5 * 60 * 1000); // 5 mins ago
    const result = await Booking.deleteMany({
      paymentStatus: "pending",
      createdAt: { $lt: cutoff }
    });

    console.log(`🗑️ Auto-cleanup: Deleted ${result.deletedCount} unpaid bookings older than 5 mins.`);
  } catch (error) {
    console.error("❌ Error deleting unpaid bookings:", error);
  }
}
