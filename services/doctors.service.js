const newDoctors = require("../models/Doctors.model");

module.exports.newDoctors = async ({ name, post, timeslots }) => {
  const doctors = await newDoctors.create({
    name,
    post,
    timeSlots,
  });

  return doctors;
};
