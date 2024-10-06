import React, { useState } from "react";
import { createEmployee } from "../api";

const EmployeeForm = ({ refresh }) => {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !employeeId || !email || !position || !department || !salary) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await createEmployee({
        name,
        employeeId: Number(employeeId), 
        email,
        position,
        department,
        salary: Number(salary), 
      });
      alert("Employee added successfully!");
      refresh();

      // Clear the form
      setName("");
      setEmployeeId("");
      setEmail("");
      setPosition("");
      setDepartment("");
      setSalary("");
    } catch (error) {
      console.error("Error adding employee:", error.response ? error.response.data : error.message);
      alert("Failed to add employee. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Employee</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        required
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
