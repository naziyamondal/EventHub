const Event = require("./models/Event");

async function seedEvents() {
  const count = await Event.countDocuments();
 if (count > 0) return; // keep commented for now

  await Event.insertMany([
    {
      title: "Digital Marketing Strategies Seminar",
      description: "Learn proven digital marketing strategies including SEO, content marketing, and ads.",
      date: "02 05, 2025",
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
      title: "AI & Machine Learning Summit 2025",
      description: "Join AI experts to explore the latest trends in artificial intelligence.",
      date: "02 20, 2025",
      time: "09:00",
      duration: "480 min",
      location: "Convention Center, San Francisco",
      type: "Conference",
      status: "Upcoming",
      price: 99.99,
      capacity: 500,
      image: "/public/images/ai.png"
    },
    {
      title: "Blockchain & Web3 Technology Conference",
      description: "Explore decentralized technologies, NFTs, and smart contracts.",
      date: "03 10, 2025",
      time: "08:30",
      duration: "540 min",
      location: "Online Event",
      type: "Conference",
      status: "Upcoming",
      price: 149.99,
      capacity: 1000,
      image: "/public/images/blockchain.png"
    }
  ]);

  console.log("✅ Sample events added");
}

module.exports = seedEvents;
