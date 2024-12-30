const mongoose = require("mongoose");

const timeSlots = [];
for (let hour = 10; hour < 18; hour++) {
  timeSlots.push(`${hour}:00 - ${hour}:30`);
  timeSlots.push(`${hour}:30 - ${hour + 1}:00`);
}

const doctorSchema = new mongoose.Schema({
  name: String,
  post: String,
  bookedtimeSlots: [String],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
