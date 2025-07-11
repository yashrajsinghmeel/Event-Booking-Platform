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

        //  loads Razorpay’s browser-side payment widget, absolutely required for user to pay.
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
    <div className="h-screen bg-[linear-gradient(to_right,rgba(67,139,71,0.4),rgba(244,196,48,0.4),rgba(47,102,50,0.4))]">
      {isLoading ? (
        <div className="text-center py-10 text-green-700 font-semibold">
          Loading Payment Portal...
        </div>
      ) : null}
    </div>
  );
}

export default Payment;
