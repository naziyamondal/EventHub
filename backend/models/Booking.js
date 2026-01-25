const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  eventTitle: String,

  eventDate: String,
  ticketPrice: Number,
  ticketCount: Number,
  totalPaid: Number,

  status: {
    type: String,
    default: "confirmed" // confirmed | completed | cancelled
  },

  bookedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", BookingSchema);
