const router = require("express").Router();
// const User = require("../models/User"); // Database disabled
const STATIC_USERS = [];

// REGISTER (Mock)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // const exists = await User.findOne({ email });
  const exists = STATIC_USERS.find(u => u.email === email);
  if (exists) return res.status(400).json({ message: "User exists" });

  /*
  const user = new User({
    name,          
    email,
    password
  });
  await user.save();
  */

  const newUser = { _id: Date.now().toString(), name, email, password };
  STATIC_USERS.push(newUser);
  console.log("Registered mock user:", newUser);

  res.json({ success: true });
});


// LOGIN (Mock)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // const user = await User.findOne({ email, password });
  const user = STATIC_USERS.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    name: user.name,
    email: user.email
  });
});


module.exports = router;
