let allEvents = [];

fetch(`${API_BASE_URL}/api/events`)
  .then(res => res.json())
  .then(data => {
    allEvents = data;
    displayEvents(allEvents);
  });

function displayEvents(events) {
  const grid = document.getElementById("eventsGrid");
  grid.innerHTML = "";

  const isAdmin = localStorage.getItem("admin");

  if (events.length === 0) {
    grid.innerHTML = "<p>No events found.</p>";
    return;
  }

  events.forEach(e => {
    grid.innerHTML += `
      <div class="event-card">
        <img src="${API_BASE_URL}${e.image}" alt="${e.title}">



        <div class="event-body">
          <span class="event-tag">${e.type.toLowerCase()}</span>
          <span class="price">USD $${e.price}</span>

          <h3>${e.title}</h3>
          <p>${e.description.substring(0, 90)}...</p>

          <ul class="event-info">
            <li>📅 ${e.date}</li>
            <li>⏰ ${e.time} (${e.duration})</li>
            <li>📍 ${e.location}</li>
            <li>👥 Max ${e.capacity} attendees</li>
          </ul>

          <button
            ${e.capacity === 0 ? "disabled" : ""}
            onclick="openEvent('${e._id}')">
            ${e.capacity === 0 ? "Sold Out" : "View Details & Register"}
          </button>

        </div>
      </div>
    `;
  });
}

function getEventStatus(event) {
  const now = new Date();

  const start = new Date(`${event.date}T${event.time}`);
  const durationMinutes = parseInt(event.duration);
  const end = new Date(start.getTime() + durationMinutes * 60000);

  if (now < start) return "Upcoming";
  if (now >= start && now <= end) return "Ongoing";
  return "Completed";
}

function filterEvents() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const type = document.getElementById("typeFilter").value;
  const status = document.getElementById("statusFilter").value;

  const filtered = allEvents.filter(e => {
    const eventStatus = getEventStatus(e);

    return (
      e.title.toLowerCase().includes(search) &&
      (type === "" || e.type === type) &&
      (status === "" || eventStatus === status)
    );
  });

  displayEvents(filtered);
}

function bookEvent(event) {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Login check
  if (!user) {
    alert("Please login to book this event");
    window.location.href = "login.html";
    return;
  }

  fetch(`${API_BASE_URL}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: user.name,
      userEmail: user.email,
      eventTitle: event.title,
      eventDate: event.date,
      ticketPrice: event.price
    })
  })
    .then(res => res.json())
    .then(() => {
      alert("🎉 Registered successfully!");
      window.location.href = "bookings.html";
    });
}



const isAdmin = localStorage.getItem("admin");

if (isAdmin) {
  grid.innerHTML += `
    <button onclick="editEvent('${e._id}')">Edit</button>
    <button onclick="deleteEvent('${e._id}')">Delete</button>
  `;
}

function deleteEvent(id) {
  if (!confirm("Delete this event?")) return;

  fetch(`${API_BASE_URL}/api/events/${id}`, {
    method: "DELETE"
  }).then(() => location.reload());
}

function editEvent(id) {
  localStorage.setItem("editEventId", id);
  window.location.href = "edit-event.html";
}

function openEvent(id) {
  window.location.href = `event-details.html?id=${id}`;
}
