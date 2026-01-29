const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

// --- TEMPORARY STATIC DATA (Service Fallback) ---
// This allows the app to work even if MongoDB connection fails.
const STATIC_EVENTS = [
  {
    _id: "1",
    title: "Digital Marketing Strategies Seminar",
    description: "Learn proven digital marketing strategies including SEO, content marketing, and ads. Perfect for beginners and pros.",
    date: "2025-02-05", // Normalized date format
    time: "15:00",
    duration: "150 min",
    location: "Online Event",
    type: "Seminar",
    status: "Upcoming",
    price: 29.99,
    capacity: 200,
    image: "/public/images/marketing.png"
  },
  {
    _id: "2",
    title: "AI & Machine Learning Summit 2025",
    description: "Join AI experts from around the globe to explore the latest trends in artificial intelligence and deep learning.",
    date: "2025-02-20",
    time: "09:00",
    duration: "480 min",
    location: "Convention Center, SF",
    type: "Conference",
    status: "Upcoming",
    price: 99.99,
    capacity: 500,
    image: "/public/images/ai.png"
  },
  {
    _id: "3",
    title: "Blockchain & Web3 Future",
    description: "Explore decentralized technologies, NFTs, and smart contracts. A deep dive into the future of the internet.",
    date: "2025-03-10",
    time: "08:30",
    duration: "540 min",
    location: "Online Event",
    type: "Conference",
    status: "Upcoming",
    price: 149.99,
    capacity: 1000,
    image: "/public/images/blockchain.png"
  },
  {
    _id: "4",
    title: "Startup Pitch Night",
    description: "Watch 10 innovative startups pitch their ideas to a panel of venture capitalists. Network with founders.",
    date: "2025-03-15",
    time: "18:00",
    duration: "120 min",
    location: "Tech Hub, NY",
    type: "Networking",
    status: "Upcoming",
    price: 15.00,
    capacity: 100,
    image: "/public/images/startup.webp"
  }
];

// GET ALL
router.get("/", async (req, res) => {
  // const events = await Event.find(); // Database query disabled
  res.json(STATIC_EVENTS);
});

// GET ONE
router.get("/:id", async (req, res) => {
  /*
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(404).json({ message: "Event not found" });
  }
  */

  const event = STATIC_EVENTS.find(e => e._id === req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});


// CREATE (Mock)
router.post("/", async (req, res) => {
  // const event = await Event.create(req.body);
  const newEvent = { ...req.body, _id: Date.now().toString() };
  STATIC_EVENTS.push(newEvent);
  res.json(newEvent);
});

// UPDATE (Mock)
router.put("/:id", async (req, res) => {
  // await Event.findByIdAndUpdate(req.params.id, req.body);
  const index = STATIC_EVENTS.findIndex(e => e._id === req.params.id);
  if (index !== -1) {
    STATIC_EVENTS[index] = { ...STATIC_EVENTS[index], ...req.body };
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false });
  }
});

// DELETE (Mock)
router.delete("/:id", async (req, res) => {
  // await Event.findByIdAndDelete(req.params.id);
  const index = STATIC_EVENTS.findIndex(e => e._id === req.params.id);
  if (index !== -1) {
    STATIC_EVENTS.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false });
  }
});

module.exports = router;
