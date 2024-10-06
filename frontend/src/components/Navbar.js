import React, { useState } from "react";
import "./Navbar.css";
import EmployeeForm from "./EmployeeForm";
import ManageEmployees from "./ManageEmployees";
import Attendance from "./Attendance";
import Payroll from "./Payroll";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  const handleAddEmployeeClick = () => {
    setActiveForm("addEmployee");
    setDropdownOpen(false);
  };

  const handleUpdateEmployeeClick = () => {
    setActiveForm("updateEmployee");
    setDropdownOpen(false);
  };

  const handleDeleteEmployeeClick = () => {
    setActiveForm("deleteEmployee");
    setDropdownOpen(false);
  };

  const handleLogAttendance = () => {
    setActiveForm("attendance");
    setDropdownOpen(false);
  };

  const handlePayroll = () => {
    setActiveForm("payroll");
    setDropdownOpen(false);
  };

  const closeForm = () => {
    setActiveForm(null);
  };

  return (
    <nav>
      <h1>Employee Management System</h1>
      <ul>
        <li
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          Manage Employees
          {dropdownOpen && (
            <ul className="dropdown">
              <li onClick={handleAddEmployeeClick}>Add Employee</li>
              <li onClick={handleUpdateEmployeeClick}>Update Employee</li>
              <li onClick={handleDeleteEmployeeClick}>Delete Employee</li>
            </ul>
          )}
        </li>
        <li onClick={handleLogAttendance}>Attendance</li>
        <li onClick={handlePayroll}>Payroll</li>
      </ul>

      {}
      {activeForm === "addEmployee" && <EmployeeForm refresh={closeForm} />}
      {activeForm === "updateEmployee" && (
        <ManageEmployees mode="update" refresh={closeForm} />
      )}
      {activeForm === "deleteEmployee" && (
        <ManageEmployees mode="delete" refresh={closeForm} />
      )}
      {activeForm === "attendance" && <Attendance refresh={closeForm} />}
      {activeForm === "payroll" && <Payroll refresh={closeForm} />}
    </nav>
  );
};

export default Navbar;
