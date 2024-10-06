import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Payroll from "./components/Payroll";
import Attendance from "./components/Attendance";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/Attendance" element={<Attendance />} />
      </Routes>
    </Router>
  );
};

export default App;
