import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import ScanQR from "./Dashboard/Scanqr";
import UserInfo from "./Dashboard/UserInfo";
import AdminDashboard from "./Dashboard/Settings";

function Dashboard() {
  return (
    <>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<DashboardLayout />}>
        <Route index element={<ScanQR />} />
         <Route path="validate" element={<ScanQR/>}/>
         <Route path="user" element={<UserInfo/>}/>
         <Route path="settings" element={<AdminDashboard/>}/>
       
        </Route>
      </Routes>
    </>
  );
}

export default Dashboard;
