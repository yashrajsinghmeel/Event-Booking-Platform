import { useState, useEffect } from "react";
import API from "../../services/api";
import useAuth from "../../hooks/useAuth";
import {toast} from "react-toastify";

export default function YourTickets() {
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth();
  // console.log(user);
  // const userId = user._id;
  // console.log(userId);
  useEffect(() => {
    if (!user) return; // wait for user to be loaded
    const fetchTickets = async () => {
      try {
        const { data } = await API.get(`/bookings/getalltickets/${user._id}`);
        setTickets(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTickets();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-green-700">
        Loading your tickets…
      </div>
    );
  }
  if (tickets == []) {
    return (
      <div className="max-h-screen flex items-center justify-center text-xl font-semibold text-green-700">
        🎟️ No tickets booked yet! Book your first ticket now.
      </div>
    );
  }



  return (
    <div className="min-h-screen  p-4 sm:p-8 lg:p-12">
      <div className="space-y-12">
        {tickets.map((t) => (
          <div
            key={t._id}
            className="mx-auto max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition duration-300"
          >
            <div className="flex flex-col md:flex-row">
              {/* LEFT SIDE: DETAILS */}
              <div className="flex-1 p-6 bg-gradient-to-br from-green-500 via-teal-400 to-green-600 text-white relative">
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12 -translate-y-12" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 translate-y-12" />

                <h2 className="text-3xl font-extrabold tracking-tight">
                  PRAKRITI POOJA <span className="block text-xl">2025</span>
                </h2>
                <div className="mt-2 inline-block px-3 py-1 rounded-full text-sm font-bold bg-yellow-300 text-yellow-900">
                  {t.paymentStatus.toUpperCase()}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="uppercase text-xs opacity-75">Name</p>
                    <p className="font-semibold">{t.name}</p>
                  </div>
                  <div>
                    <p className="uppercase text-xs opacity-75">Phone</p>
                    <p className="font-semibold">{t.phone}</p>
                  </div>
                  <div>
                    <p className="uppercase text-xs opacity-75">Persons</p>
                    <p className="font-semibold">{t.ticketCount}</p>
                  </div>
                  <div>
                    <p className="uppercase text-xs opacity-75">Amount</p>
                    <p className="font-semibold">₹{t.amount}</p>
                  </div>
                </div>

                <div className="mt-6 bg-white/20 rounded-xl text-center py-2">
                  <p className="text-xs uppercase opacity-75">Booking Code</p>
                  <p className="mt-1 font-mono text-lg">
                    {t._id.slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE: QR */}
              <div className="flex items-center justify-center p-6 bg-white relative">
                {/* Perforation circles */}
                <div className="absolute left-0 top-1/2 w-8 h-8 bg-gray-100 rounded-full -translate-x-4 -translate-y-1/2" />
                <div className="absolute right-0 top-1/2 w-8 h-8 bg-gray-100 rounded-full translate-x-4 -translate-y-1/2" />

                <div className="relative w-40 h-40 bg-gradient-to-br from-green-400 to-teal-300 rounded-2xl flex items-center justify-center shadow-inner">
                  {t.paymentStatus === "pending" ? (
                    <svg
                      className="w-16 h-16 text-white animate-pulse"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM11 11h2v6h-2v-6zm0-4h2v2h-2V7z" />
                    </svg>
                  ) : (
                    <img
                      src={t.qrCodeImage}
                      alt="QR Code"
                      className="w-32 h-32 rounded-lg border-4 border-white"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
