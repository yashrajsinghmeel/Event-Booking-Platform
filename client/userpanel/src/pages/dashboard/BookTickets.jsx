import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
function BookTickets() {
  const [ticketOptions, setTicketOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await API.get("/events/getEvents");
        setTicketOptions(res.data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load tickets");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);
  const handleBook = (title, price, eventId) => {
    toast.info(`🚀 Booking process started for: ${title}`);
   

    navigate(`/dashboard/book-now/${title}`, {
      state: {
        ticketType: title,
        pricePer: price,
        eventId:eventId,
      },
    });
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-green-700 font-semibold">
        Loading ticket options...
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3 ">
      {ticketOptions.map((ticket, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow hover:shadow-lg hover:scale-105 transition transform duration-200 p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold text-green-700 mb-2">
              {ticket.title}
            </h3>
            <p className="text-lg text-green-900 mb-4">
              {" "}
              ₹{ticket.price} for each
            </p>
            <p className="text-gray-600 mb-6">{ticket.description}</p>
          </div>
          <button
            onClick={() => handleBook(ticket.title, ticket.price, ticket._id)}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default BookTickets;
