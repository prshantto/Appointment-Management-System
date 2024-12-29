const express = require("express");
const router = express.Router();
const doctorController = require("../controller/doctorController");
const Doctor = require("../models/Doctors.model");

router.get("/", async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

router.post("/createDoctors", doctorController.createDoctors);

module.exports = router;
