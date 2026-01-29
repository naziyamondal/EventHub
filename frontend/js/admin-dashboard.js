// PROTECT PAGE
if (!localStorage.getItem("admin")) {
  alert("Admin access only");
  window.location.href = "admin-login.html";
}

const eventsTable = document.getElementById("eventsTable");
const bookingsTable = document.getElementById("bookingsTable");

// LOAD DASHBOARD DATA
loadDashboard();

function loadDashboard() {

  // ✅ EVENTS COUNT
  const API_URL = API_BASE_URL; // Local alias if needed, or just use API_BASE_URL directly
  fetch(`${API_BASE_URL}/api/events`)
    .then(res => res.json())
    .then(events => {
      document.getElementById("totalEvents").innerText = events.length;
      renderEvents(events);
    });

  // ✅ ACTIVE BOOKINGS COUNT (CONFIRMED ONLY)
  fetch(`${API_BASE_URL}/api/bookings/count/active`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("totalBookings").innerText = data.count;
    });

  // ✅ LOAD ALL BOOKINGS FOR TABLE
  fetch(`${API_BASE_URL}/api/bookings/all`)
    .then(res => res.json())
    .then(bookings => {
      renderBookings(bookings);
    });
}

function renderEvents(events) {
  eventsTable.innerHTML = "";
  events.forEach(e => {
    eventsTable.innerHTML += `
      <tr>
        <td>${e.title}</td>
        <td>${e.type}</td>
        <td>${e.status}</td>
        <td>${e.date}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editEvent('${e._id}')">Edit</button>
          <button class="action-btn delete-btn" onclick="deleteEvent('${e._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

function renderBookings(bookings) {
  bookingsTable.innerHTML = "";

  bookings.forEach(b => {
    bookingsTable.innerHTML += `
      <tr class="booking-row ${b.status}">
        <td>${b.userName}</td>
        <td>${b.userEmail}</td>
        <td>${b.eventTitle}</td>
        <td>${b.ticketCount}</td>
        <td>$${b.totalPaid}</td>
        <td>
          <span class="status-badge ${b.status}">
            ${b.status}
          </span>
        </td>
        <td>${new Date(b.bookedAt).toLocaleDateString()}</td>
      </tr>
    `;
  });
}


function deleteEvent(id) {
  if (!confirm("Delete this event?")) return;
  fetch(`${API_BASE_URL}/api/events/${id}`, {
    method: "DELETE"
  }).then(() => location.reload());
}

function editEvent(id) {
  console.log("Editing event:", id); // 👈 ADD THIS
  localStorage.setItem("editEventId", id);
  window.location.href = "edit-event.html";
}


function showEvents() {
  document.getElementById("eventsSection").style.display = "block";
  document.getElementById("bookingsSection").style.display = "none";
}

function showBookings() {
  document.getElementById("eventsSection").style.display = "none";
  document.getElementById("bookingsSection").style.display = "block";
}

function logout() {
  localStorage.removeItem("admin");
  window.location.href = "admin-login.html";
}
