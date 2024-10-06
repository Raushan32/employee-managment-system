const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

router.post("/log", async (req, res) => {
  const { employeeId, status } = req.body;

  if (!employeeId || !status) {
    return res
      .status(400)
      .json({ message: "Employee ID and status are required." });
  }

  try {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    const attendanceRecord = new Attendance({
      employeeId,
      month,
      status,
      date,
    });
    await attendanceRecord.save();
    return res.status(201).json(attendanceRecord);
  } catch (error) {
    console.error("Error saving attendance:", error);
    return res.status(500).json({ message: "Error logging attendance" });
  }
});

router.get("/:employeeId", async (req, res) => {
  try {
    const records = await Attendance.find({
      employeeId: req.params.employeeId,
    });
    return res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    return res
      .status(500)
      .json({ message: "Error fetching attendance records" });
  }
});

module.exports = router;
