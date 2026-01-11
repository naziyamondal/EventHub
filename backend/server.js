const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://127.0.0.1:27017/eventhub");

const app = express();
app.use(cors());
app.use(express.json());
const path = require("path");

// Serve images folder
app.use("/images", express.static(path.join(__dirname, "public/images")));


app.use("/api/events", require("./routes/events"));
app.use("/api/bookings", require("./routes/bookings"));

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});

const seedEvents = require("./seedEvents");

mongoose.connect("mongodb://127.0.0.1:27017/eventhub")
  .then(() => {
    console.log("MongoDB connected");
    seedEvents(); // 👈 ADD HERE
  })
  .catch(err => console.log(err));

  const seedAdmin = require("./seedAdmin");

mongoose.connect("mongodb://127.0.0.1:27017/eventhub")
  .then(() => {
    console.log("MongoDB connected");
    seedEvents();
    seedAdmin();   
  })
  .catch(err => console.log(err));

  app.use("/api/admin", require("./routes/admin"));
  app.use("/api/users", require("./routes/userRoutes"));
