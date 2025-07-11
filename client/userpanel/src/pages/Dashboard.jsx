import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import BookTickets from "./dashboard/BookTickets";
import YourTickets from "./dashboard/YourTickets";
import UserInfo from "./dashboard/UserInfo";
import BookingForm from "./dashboard/BookTicketForm";
import TempTicket from "./dashboard/TempTicket";
import Payment from "./dashboard/Payment";
import PaymentSuccess from "./dashboard/PaymentSucces";

function Dashboard() {
  return (
    <>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<BookTickets />} />
          <Route path="book" element={<BookTickets />} />
          <Route path="tickets" element={<YourTickets />} />
          <Route path="user" element={<UserInfo />} />
        </Route>
        <Route path="/book-now/:type" element={<BookingForm />} />
        <Route path="/temp-ticket" element={<TempTicket />} />
        <Route path="/make-payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </>
  );
}

export default Dashboard;
