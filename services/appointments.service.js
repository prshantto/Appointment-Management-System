const newAppointments = require("../models/Appointments.model");

module.exports.bookAppointment = async ({
  name,
  email,
  phone,
  time,
  isCheckedin,
  status,
}) => {
  if (!name || !email || !phone) {
    throw new Error("All fields are required");
  }

  const appointment = await newAppointments.create({
    name,
    email,
    phone,
    time,
    isCheckedin,
    status,
  });

  return appointment;
};
