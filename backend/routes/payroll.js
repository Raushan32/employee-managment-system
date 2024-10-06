const express = require("express");
const router = express.Router();
const Payroll = require("../models/Payroll");
const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

router.post("/add", async (req, res) => {
  const { employeeId, month, year } = req.body;

  try {
    const employee = await Employee.findOne({ employeeId: employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const basicSalary = employee.salary;

    const attendanceRecords = await Attendance.find({
      employeeId: employeeId,
      month: month,
    });

    const totalAttendance = attendanceRecords.filter(
      (record) => record.status === "Present"
    ).length;
    const totalDaysInMonth = 30;
    const totalAbsentDays = totalDaysInMonth - totalAttendance;
    const dailyIncome = basicSalary / totalDaysInMonth;
    const totalSalary = dailyIncome * totalAttendance;
    const deductions = dailyIncome * totalAbsentDays;

    const bonus = 0;
    const finalSalary = totalSalary + bonus;

    const payrollRecord = new Payroll({
      employeeId,
      month,
      year,
      basicSalary,
      totalAttendance,
      totalAbsentDays,
      deductions,
      totalSalary,
      finalSalary,
    });

    await payrollRecord.save();
    return res.status(201).json(payrollRecord);
  } catch (error) {
    console.error("Error adding payroll:", error);
    return res.status(500).json({ message: "Error adding payroll." });
  }
});

module.exports = router;
