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

app.use("/appointments", appointmentRoutes);

cron.schedule("* * * * *", async () => {
  console.log(`Running no-show detection task ...`);
  const now = new Date();
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
      `Marked appointment ${appointment._id} as no-show at ${
        now.toLocaleString().split(" ")[1]
      }`
    );
  });
});

app.listen(PORT, () => console.log(`server running on ${PORT}...`));
connectDB();
