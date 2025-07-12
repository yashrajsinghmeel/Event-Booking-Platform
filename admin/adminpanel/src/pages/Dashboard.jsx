import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";


function Dashboard() {
  return (
    <>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<DashboardLayout />}>
         
       
        </Route>
      </Routes>
    </>
  );
}

export default Dashboard;
