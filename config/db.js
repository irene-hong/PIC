const mongoose = require("mongoose");
// const config = require('config');
const db =
  process.env.DB_URL ||
  "mongodb+srv://admin:hJmSvgvNLjmnEBlL@cluster0.2l656.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
