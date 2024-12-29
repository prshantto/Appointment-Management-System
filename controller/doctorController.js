const Appointment = require("../models/Appointments.model.js");
const newAppointments = require("../models/Appointments.model.js");

const doctorService = require("../services/doctors.service.js");

module.exports.createDoctors = async function (req, res) {
  const { name, post, timeSlots } = req.body;

  const Doctor = await doctorService.newDoctors({
    name,
    post,
    timeSlots,
  });

  res.status(200).send("Doctor added successfully");
};
