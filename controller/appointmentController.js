const Appointment = require("../models/Appointments.model.js");
const newAppointments = require("../models/Appointments.model.js");

const appointmentService = require("../services/appointments.service.js");

module.exports.bookappointment = async function (req, res) {
  const { name, email, phone, doctor, time, isCheckedin, status } = req.body;

  const appointmentTime = new Date(2024, 11, 29, 14, 30).toLocaleString(); //to be set by frontend

  const user = await appointmentService.bookAppointment({
    name,
    email,
    phone,
    doctor,
    time: appointmentTime,
    isCheckedin,
    status,
  });

  res.status(200).send("Appointment Booked successfully");
};
