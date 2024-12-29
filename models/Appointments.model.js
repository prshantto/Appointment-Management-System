const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  doctor: String,
  time: String,
  isCheckedIn: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled", "No Show - Rescheduled", "completed"],
    default: "confirmed",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
