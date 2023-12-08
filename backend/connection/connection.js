const mongoose = require("mongoose");
require("dotenv").config();

const connection = async (req, res) => {
  try {
    await mongoose
      .connect(process.env.BASE_URL)
      .then(() => console.log("Mongoose connected"));
  } catch (error) {
    console.error("Error in Connecting db", error);
  }
};

connection();