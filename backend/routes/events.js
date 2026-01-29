const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(404).json({ message: "Event not found" });
  }
});


// CREATE
router.post("/", async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
});

// UPDATE
router.put("/:id", async (req, res) => {
  await Event.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
