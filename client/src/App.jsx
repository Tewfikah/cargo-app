import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Contact from './pages/Contact';
import About from './pages/About';

import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Fleetmanagment from './pages/dashboard/Fleetmanagment';
import Shipments from './pages/dashboard/Shipments';
import UserManagement from './pages/dashboard/UserManagement';
import SystemSettings from './pages/dashboard/SystemSettings';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path='/contact' element={<Contact/>}/>
       <Route path='/about' element={<About/>}/>

       {/* Dashboard nested routes use a persistent DashboardLayout */}
       <Route path="/dashboard" element={<DashboardLayout />}>
         <Route index element={<Dashboard />} />
         <Route path="fleet-management" element={<Fleetmanagment/>} />
         <Route path="shipments-orders" element={<Shipments/>} />
         <Route path="user-management" element={<UserManagement/>} />
         <Route path="system-settings" element={<SystemSettings/>} />
       </Route>
      </Routes>
    </>
  )
}

export default App
