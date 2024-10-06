import React, { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  const handleLogAttendance = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/attendance/log",
        {
          employeeId,
          status,
        }
      );
      console.log("Attendance logged successfully:", response.data);
      fetchAttendanceRecords();
      setStatus("");
      setEmployeeId("");
      setError("");
    } catch (error) {
      console.error(
        "Error logging attendance:",
        error.response ? error.response.data : error.message
      );
      setError("Error logging attendance. Please try again.");

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/attendance/${employeeId}`
      );
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      setError("Error fetching attendance records. Please try again.");
    }
  };

  useEffect(() => {
    if (employeeId) {
      fetchAttendanceRecords();
    }
  }, [employeeId]);

  return (
    <div>
      <h2>Log Attendance</h2>
      <input
        type="number"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>
      <button onClick={handleLogAttendance}>Log Attendance</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h3>Attendance Records</h3>
      <ul>
        {records.map((record) => (
          <li key={record._id}>
            {new Date(record.date).toLocaleDateString()} - {record.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attendance;
