const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const cron = require("node-cron");
const connectDB = require("./config/db");
const appointmentRoutes = require("./routes/appointment.routes");
const Appointment = require("./models/Appointments.model");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

cron.schedule("* * * * *", async () => {
  console.log(`Running no-show detection task ...`);

  const now = new Date();
  const currentTime = now.toLocaleString().split(" ")[1];
  const gracePeriod = 15 * 60 * 1000; // 15 minutes in milliseconds

  const noShowAppointments = await Appointment.find({
    time: { $lte: new Date(now - gracePeriod).toLocaleString() },
    isCheckedIn: false,
    status: "confirmed",
  });

  noShowAppointments.forEach(async (appointment) => {
    appointment.status = "No Show - Rescheduled";
    await appointment.save();
    console.log(
      `Marked appointment ${appointment._id} as no-show at ${currentTime}`
    );
  });
});

app.get("/", async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

router.post("/bookappointment", appointmentController.bookappointment);

app.post("/bookappointment", async function (req, res) {
  const { name, email, phone, doctor, isCheckedin, status } = req.body;

  const appointmentTime = new Date(2024, 11, 29, 14, 30).toLocaleString(); //to be set by frontend

  const appointment = await Appointment.create({
    name,
    email,
    phone,
    doctor,
    time: appointmentTime,
    isCheckedin,
    status,
  });

  res.status(200).json({
    message: "Appointment booked successfully",
    appointmentdata: appointment,
  });
});

app.post("/checkin", async function (req, res) {
  const appointmentId = req.query.id;
  const patientCheckIn = await Appointment.find({ _id: appointmentId });

  patientCheckIn.forEach(async (patient) => {
    patient.status = "completed";
    patient.isCheckedIn = true;
    await patient.save();
    console.log("Patient CheckedIn");
  });

  res.send("Patient CheckedIn Successfully");
});

app.listen(PORT, () => console.log(`server running on ${PORT}...`));
connectDB();
