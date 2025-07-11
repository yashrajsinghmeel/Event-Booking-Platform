import { useState } from 'react'
import './App.css'
import Login from './pages/LoginHome';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import NavBar from './components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <NavBar/>
      <div>
        {/* Toast notifications */}
        <ToastContainer position='top-center' autoClose={500}/>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
