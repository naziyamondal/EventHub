const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,

  date: String,
  time: String,          // NEW
  duration: String,      // NEW (eg: "2 hours")

  location: String,

  price: Number,         // NEW
  type: String,
  status: String,
  capacity: Number,
  image: String
});

module.exports = mongoose.model("Event", EventSchema);
