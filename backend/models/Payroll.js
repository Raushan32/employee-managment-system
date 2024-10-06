const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    employeeId: { type: Number, required: true },
    basicSalary: { type: Number, required: true },
    totalAttendance: { type: Number, required: true },
    totalAbsentDays: { type: Number, required: true },
    finalSalary: { type: Number, required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    deductions: { type: Number, required: true },
    totalSalary: { type: Number, required: true },
  },
  { collection: "payroll" }
);

const Payroll = mongoose.model("Payroll", payrollSchema);
module.exports = Payroll;
