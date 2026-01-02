import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/dashboard/Dashboard';
import Contact from './pages/Contact';
import About from './pages/About';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
      {/* Dashboard Route */}
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/about' element={<About/>}/>
      </Routes>
    </>
  )
}

export default App
