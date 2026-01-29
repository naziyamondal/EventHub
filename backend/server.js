const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // IMPORTANT for process.env.PORT

const app = express();

/* ===== PORT ===== */
const PORT = process.env.PORT || 4000;

/* ===== MIDDLEWARE ===== */
app.use(cors());
app.use(express.json());

/* ===== STATIC FILES ===== */
app.use("/public/images", express.static(path.join(__dirname, "public/images")));
app.use(express.static(path.join(__dirname, "../frontend")));

/* ===== ROUTES ===== */
app.use("/api/events", require("./routes/events"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/users", require("./routes/userRoutes"));

/* ===== DATABASE + SEEDING ===== */
const seedEvents = require("./seedEvents");
const seedAdmin = require("./seedAdmin");

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eventhub")
  .then(() => {
    console.log("MongoDB connected");
    seedEvents();
    seedAdmin();
  })
  .catch((err) => console.log(err));

/* ===== START SERVER ===== */

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    const open = (await import("open")).default;
    await open(`http://localhost:${PORT}`);
  } catch (err) {
    console.error("Failed to open browser:", err);
  }
});
