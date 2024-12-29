const Appointment = require("../models/Appointments.model.js");

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

module.exports.checkIn = async function (req, res) {
  const appointmentId = req.query.id;
  const patientCheckIn = await Appointment.find({ _id: appointmentId });

  patientCheckIn.forEach(async (patient) => {
    patient.status = "completed";
    patient.isCheckedIn = true;
    await patient.save();
    console.log("Patient CheckedIn");
  });

  res.send("Patient CheckedIn Successfully");
};
