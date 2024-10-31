const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend from "frontend" folder
app.use(express.static(path.join(__dirname, "frontend")));

// MongoDB connection (using connection string from .env file)
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define Routes (add more routes as needed)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

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
