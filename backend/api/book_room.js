// api/book-room.js
const connectToDatabase = require("./connect");
const Booking = require("./models/Booking");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    await connectToDatabase();

    const { roomNumber, customerName, bookingDate } = req.body;

    try {
      const newBooking = new Booking({ roomNumber, customerName, bookingDate });
      await newBooking.save();
      res.status(200).json({ message: "Booking successful!" });
    } catch (error) {
      res.status(500).json({ message: "Booking failed.", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
