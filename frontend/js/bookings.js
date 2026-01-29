document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login to view your bookings");
    window.location.href = "login.html";
    return;
  }

  fetch(`${API_BASE_URL}/api/bookings/${user.email}`)
    .then(res => res.json())
    .then(renderBookings);
});

function renderBookings(bookings) {
  const container = document.getElementById("bookingsList");
  container.innerHTML = "";

  if (bookings.length === 0) {
    container.innerHTML = "<p>No bookings found.</p>";
    return;
  }

  bookings.forEach(b => {
    container.innerHTML += `
      <div class="booking-card">

        <div class="booking-header">
          <h3>${b.eventTitle}</h3>
          <span class="status ${b.status}">${b.status}</span>
        </div>

        <div class="booking-id">
          Booking ID: ${b._id}
        </div>

        <div class="booking-info">
            <div>
              <strong>📅 Event Date</strong><br>
              ${new Date(b.eventDate).toDateString()}
            </div>

            <div>
              <strong>Tickets</strong><br>
              ${b.ticketCount} × USD $${b.ticketPrice}
            </div>

            <div>
              <strong>Attendee</strong><br>
              ${b.userName}
            </div>

            <div>
              <strong>Total Paid</strong><br>
              USD $${b.totalPaid}
            </div>
        </div>

        ${b.status === "confirmed"
        ? `<button class="cancel-btn" onclick="cancelBooking('${b._id}')">
              Cancel Booking
            </button>`
        : ""}


      </div>
    `;
  });
}

function cancelBooking(id) {
  if (!confirm("Are you sure you want to cancel this booking?")) return;

  fetch(`${API_BASE_URL}/api/bookings/cancel/${id}`, {
    method: "PUT"
  })
    .then(res => res.json())
    .then(() => location.reload());
}
