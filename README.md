# Appointment Management System

This project is a backend system designed to efficiently manage missed appointments, identify suitable rescheduling slots, and facilitate rebooking seamlessly. The system uses Node.js with Express.js for the backend, MongoDB for the database, and can be integrated with any frontend framework such as React or Next.js.

## Key Features

1. **Automatic Detection**: Detect no-shows after a 15-minute grace period.
2. **Slot Finder**: Identify available slots in the doctor's schedule dynamically.
3. **Notification System**: Notify patients with rescheduling options via email/SMS.
4. **Rebooking Management**: Allow doctors and patients to confirm new slots quickly.
5. **Conflict Resolution**: Ensure no double-booking for rescheduled appointments.

## Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: React or Next.js
- **Database**: MongoDB

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/prshantto/Appointment-Management-System.git
   ```

2. **Install dependencies**:

   ```bash
   cd appointment-management-system
   npm install
   ```

3. **Set up MongoDB**:
   - Make sure MongoDB is installed and running on your machine.
   - Update the MongoDB connection string in `index.js`.

## Usage

1. **Start the server**:

   ```bash
   npm start
   ```

2. **Endpoints**:

   - **Detect No-shows**:

     ```http
     POST /appointments/:id/no-show
     ```

     Mark an appointment as a no-show if the patient hasn't checked in 15 minutes past the appointment time.

   - **Find Available Slots**:

     ```http
     GET /doctors/:id/available-slots
     ```

     Retrieve available slots in the doctor's schedule dynamically.

   - **Send Rescheduling Notifications**:

     ```http
     POST /appointments/:id/reschedule
     ```

     Notify patients with rescheduling options via email/SMS.

   - **Rebook Appointment**:

     ```http
     POST /appointments/:id/rebook
     ```

     Allow patients and doctors to confirm new slots quickly.

   - **Prevent Double-booking**:
     Ensure no double-booking for rescheduled appointments by checking slot availability before confirming the booking.

## Models

- **Appointment Model**:
  ```javascript
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
  ```

## Example Environment Configuration

- **SMTP Config**:
  For email notifications, set up your SMTP configuration in the `notifyPatient` function using `nodemailer`.

- **Twilio Config**:
  For SMS notifications, configure Twilio with your `ACCOUNT_SID` and `AUTH_TOKEN`.
