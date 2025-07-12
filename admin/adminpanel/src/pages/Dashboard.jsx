import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import ScanQR from "./Dashboard/Scanqr";

function Dashboard() {
  return (
    <>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<DashboardLayout />}>
         <Route path="validate" element={<ScanQR/>}/>
       
        </Route>
      </Routes>
    </>
  );
}

export default Dashboard;
