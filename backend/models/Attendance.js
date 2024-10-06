const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  employeeId: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);
module.exports = Attendance;
