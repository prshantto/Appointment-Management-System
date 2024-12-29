const express = require("express");
const router = express.Router();
const appointmentController = require("../controller/appointmentController");
const Appointment = require("../models/Appointments.model");

router.get("/", async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

router.post("/bookappointment", appointmentController.bookappointment);

module.exports = router;
