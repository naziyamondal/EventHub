const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  alert("Please login to continue");
  window.location.href = "login.html";
}

let currentEvent = null;

fetch(`https://eventhub-backend-hs65.onrender.com/api/events/${eventId}`)
  .then(res => res.json())
  .then(event => {
    currentEvent = event;

    document.getElementById("eventImage").src =
      `https://eventhub-backend-hs65.onrender.com${event.image}`;

    document.getElementById("eventTitle").innerText = event.title;
    document.getElementById("eventDesc").innerText = event.description;
    document.getElementById("eventDate").innerText = event.date;
    document.getElementById("eventLocation").innerText = event.location;
    document.getElementById("eventSeats").innerText = event.capacity;
    document.getElementById("eventPrice").innerText = event.price;

    const ticketInput = document.getElementById("tickets");
    const totalPrice = document.getElementById("totalPrice");
    const confirmBtn = document.getElementById("confirmBtn");

    // 🔒 Disable booking if no seats
    if (event.capacity === 0) {
      confirmBtn.disabled = true;
      confirmBtn.innerText = "Sold Out";
      confirmBtn.style.background = "#ccc";
      return;
    }

    // 💰 Initial price
    totalPrice.innerText = event.price;

    // 💰 Live price update
    ticketInput.addEventListener("input", () => {
      const count = Number(ticketInput.value);

      if (count > event.capacity) {
        ticketInput.value = event.capacity;
        return;
      }

      totalPrice.innerText = count * event.price;
    });

    // ✅ Submit booking
    document.getElementById("registerForm").onsubmit = function (e) {
      e.preventDefault();

      const ticketCount = Number(ticketInput.value);

      fetch("https://eventhub-backend-hs65.onrender.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: user.name,
          userEmail: user.email,
          eventTitle: event.title,
          eventDate: event.date,
          ticketPrice: event.price,
          ticketCount
        })
      })
      .then(res => {
        if (!res.ok) throw new Error("Not enough seats");
        return res.json();
      })
      .then(() => {
        alert("🎉 Booking confirmed!");
        window.location.href = "bookings.html";
      })
      .catch(err => alert(err.message));
    };
  });
