const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend from "public" folder (change 'frontend' if necessary)
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection (update with your MongoDB URI)
const mongoURI =
  "mongodb+srv://ThirdUser:ThirdUseR@cluster0.euxvmtf.mongodb.net/thehotelproject?retryWrites=true&w=majority&appName=Cluster0";
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
