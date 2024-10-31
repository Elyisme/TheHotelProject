const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: "./backend/.env" }); // Load environment variables from .env file

// Debugging line to check if the MONGO_URI is loaded
console.log("MONGO_URI:", process.env.MONGO_URI); // Check this output

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in .env file.");
} else {
  console.log("MongoDB URI found.");
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend from "frontend" folder
app.use(express.static(path.join(__dirname, "frontend")));

// MongoDB connection (using connection string from .env file)
const mongoURI = process.env.MONGO_URI; // This should now correctly get the URI

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err)); // Improved error logging

// Define Routes (add more routes as needed)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html")); // Corrected to match frontend folder
});

// Example booking route
app.post("/book-room", (req, res) => {
  const { roomNumber, customerName, bookingDate } = req.body;

  // You will later replace this with MongoDB logic
  console.log(
    `Booking received for Room ${roomNumber} by ${customerName} on ${bookingDate}`
  );

  res.status(200).send({ message: "Booking successful!" });
});

// Port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
