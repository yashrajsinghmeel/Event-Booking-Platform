import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../services/api";
import loadRazorpay from "../../services/loadRazorpay";
import { toast } from "react-toastify";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const rzpInstance = useRef(null);
  const { bookingId } = location.state || {};

  useEffect(() => {
    if (!bookingId) {
      toast.error("No booking ID provided");
      navigate("/dashboard/book", {
        replace: true,
      });
      return;
    }
    const createOrder = async () => {
      try {
        const res = await API.post("/payments/create-order", {
          bookingId,
        });
        const { ticket, order, amount, currency } = res.data;
        // loads Razorpay's browser-side payment widget, absolutely required for user to pay.
        const razorpayLoaded = await loadRazorpay(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!razorpayLoaded) {
          toast.error("Razorpay failed to load. Check connection.");
          return;
        }
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency,
          name: "PRAKRITI POOJA 2025",
          description: "Event Ticket Booking",
          order_id: order.id,
          handler: async (response) => {
            try {
              const res = await API.post("/payments/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: bookingId,
              });
              navigate("/dashboard/payment-success", {
                state: {
                   razorpay_payment_id: response.razorpay_payment_id,
                },
              });
              toast.success("Payment verified & booking confirmed!");
            } catch {
              toast.error("Payment verification failed.");
            }
          },
          prefill: {
            name: ticket?.name || "",
            email: ticket?.email || "",
            contact: ticket?.phone || "",
          },
          theme: { color: "#2F6132" },
          modal: {
            ondismiss: function () {
              toast.info(
                "Payment popup closed by user. Your booking is still pending."
              );
              navigate("/dashboard/book", {
                replace: true,
              });
            },
          },
        };
        rzpInstance.current = new window.Razorpay(options);
        rzpInstance.current.open();
      } catch (error) {
        console.log(error);
        toast.error("Failed to start payment process.");
        navigate("/dashboard/book", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };
    createOrder();
    return () => {
      rzpInstance.current?.close();
    };
  }, [bookingId]);

  return (
    <div className="h-screen relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 overflow-hidden">
      {/* Animated background elements - same as HeroSection */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-emerald-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-300 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-emerald-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-green-400 rounded-full opacity-15 animate-ping"></div>
        <div className="absolute top-1/4 right-1/3 w-14 h-14 bg-emerald-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Content with relative positioning to appear above background */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {isLoading ? (
          <div className="text-center py-10 text-green-700 font-semibold">
            Loading Payment Portal...
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Payment;