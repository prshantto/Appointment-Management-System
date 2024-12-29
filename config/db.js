const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(
      `failed to connect to ${process.env.MONGO_URL} error occurred:  + ${error}`
    );
  }
};

module.exports = connectDB;
