const Admin = require("./models/Admin");

async function seedAdmin() {
  const exists = await Admin.findOne({ email: "admin@eventhub.com" });
  if (exists) return;

  await Admin.create({
    email: "admin@eventhub.com",
    password: "admin123"
  });

  console.log("✅ Admin created");
}

module.exports = seedAdmin;
