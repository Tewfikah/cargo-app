import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
      {/* Dashboard Route */}
    <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
