import { useState , useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import SetPassword from "./pages/SetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyResetOtp from "./pages/VerifyResetOtp";
import ResetPassword from "./pages/ResetPassword";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/Navbar";
import useAuth from "./hooks/useAuth";

function App() {
  const [count, setCount] = useState(0);
  const {refetch}=useAuth();
useEffect(() => {
  
refetch();
  
}, [])

  return (
    <Router>
      <NavBar/>
      <div>
        {/* Toast notifications */}
        <ToastContainer position="top-center" autoClose={500} />

        {/* Routing */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/verify" element={<VerifyOtp />} />
          <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected route example */}
          <Route
            path="/"
            element={
              // <ProtectedRoute>
              <Home />
              // </ProtectedRoute>
            }
          />
          {/* Protected route example */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
