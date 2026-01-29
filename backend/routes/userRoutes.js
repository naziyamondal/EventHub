const router = require("express").Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User exists" });

  const user = new User({
    name,          // ✅ THIS WAS BEING DROPPED
    email,
    password
  });

  await user.save();
  res.json({ success: true });
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    name: user.name,     // ✅ REQUIRED
    email: user.email
  });
});


module.exports = router;
