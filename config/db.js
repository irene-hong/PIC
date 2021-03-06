const mongoose = require("mongoose");
const config = require("config");
const db = process.env.mongoURI || config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Successfully connected to MongoDB Atlas.");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
