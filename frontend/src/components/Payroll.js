import React, { useState } from "react";
import axios from "axios";

const PayrollForm = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [payroll, setPayroll] = useState(null);

  const handleAddPayroll = async () => {
    try {
      console.log("Sending data:", { employeeId, month, year });
      const response = await axios.post(
        "http://localhost:5000/api/payroll/add",
        {
          employeeId,
          month,
          year,
        }
      );
      console.log("Payroll added successfully:", response.data);
      setPayroll(response.data);
      setError("");

      alert(
        `Payroll Added Successfully!\nTotal Salary: ${response.data.finalSalary}\nDeductions: ${response.data.deductions}\nTotal Attendance: ${response.data.totalAttendance}`
      );

      setEmployeeId("");
      setMonth("");
      setYear("");
    } catch (error) {
      console.error(
        "Error adding payroll:",
        error.response ? error.response.data : error.message
      );
      setError("Error adding payroll. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add Payroll Entry</h2>
      <input
        type="number"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button onClick={handleAddPayroll}>Add Payroll</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {payroll && (
        <div>
          <h3>Payroll Details</h3>
          <p>Employee ID: {payroll.employeeId}</p>
          <p>Month: {payroll.month}</p>
          <p>Final Salary: {payroll.finalSalary}</p>
          <p>Deductions: {payroll.deductions}</p>
        </div>
      )}
    </div>
  );
};

export default PayrollForm;
