// api/connect.js
const mongoose = require("mongoose");
require("dotenv").config({ path: "../backend/.env" });

// MongoDB connection function
let isConnected;

async function connectToDatabase() {
  if (isConnected) {
    console.log("Already connected to database.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("MongoDB connection error.");
  }
}

module.exports = connectToDatabase;
