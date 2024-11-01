// api/models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  roomNumber: Number,
  customerName: String,
  bookingDate: Date,
});

module.exports = mongoose.model("Booking", bookingSchema);
