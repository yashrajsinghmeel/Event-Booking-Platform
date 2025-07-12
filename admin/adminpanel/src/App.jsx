import { useState } from 'react'
import './App.css'
import Login from './pages/Login';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <NavBar/>
      <div>
        {/* Toast notifications */}
        <ToastContainer position='top-center' autoClose={500}/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
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
  )
}

export default App
