const router = require("express").Router();
const Booking = require("../models/Booking");
const { sendMail } = require("../utils/mailer");

// CREATE BOOKING
const Event = require("../models/Event");

router.post("/", async (req, res) => {
  const {
    userName,
    userEmail,
    eventTitle,
    eventDate,
    ticketPrice,
    ticketCount
  } = req.body;

  const event = await Event.findOne({ title: eventTitle });

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (event.capacity < ticketCount) {
    return res.status(400).json({ message: "Not enough seats" });
  }

  // ✅ Reduce seats
  event.capacity -= ticketCount;
  await event.save();

  // ✅ Create booking
  const booking = await Booking.create({
    userName,
    userEmail,
    eventTitle,
    eventDate,
    ticketCount,
    ticketPrice,                    // ONE ticket price
    totalPaid: ticketPrice * ticketCount,
    status: "confirmed"
  });

  res.json(booking);
});

// ADMIN – GET ALL BOOKINGS
router.get("/all", async (req, res) => {
  const bookings = await Booking.find().sort({ bookedAt: -1 });
  res.json(bookings);
});

// GET BOOKINGS BY USER EMAIL
router.get("/:email", async (req, res) => {
  const bookings = await Booking.find({ userEmail: req.params.email });

  const today = new Date();

  for (let b of bookings) {
    if (new Date(b.eventDate) < today && b.status === "confirmed") {
      b.status = "completed";
      await b.save();
    }
  }

  res.json(bookings);
});

// CANCEL BOOKING
router.put("/cancel/:id", async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking || booking.status !== "confirmed") {
    return res.status(400).json({ message: "Invalid booking" });
  }

  const event = await Event.findOne({ title: booking.eventTitle });

  if (event) {
    event.capacity += booking.ticketCount;   // ✅ REFUND SEATS
    await event.save();
  }

  booking.status = "cancelled";
  await booking.save();

  res.json({ success: true });
});

// COUNT CONFIRMED BOOKINGS
router.get("/count/active", async (req, res) => {
  const count = await Booking.countDocuments({
    status: { $in: ["confirmed", "completed"] }
  });
  res.json({ count });
});

module.exports = router;
