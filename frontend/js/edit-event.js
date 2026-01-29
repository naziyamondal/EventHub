console.log("Edit Event JS Loaded");

if (!localStorage.getItem("admin")) {
  alert("Admin access only");
  window.location.href = "admin-login.html";
}

const eventId = localStorage.getItem("editEventId");
console.log("Event ID:", eventId);

fetch(`${API_BASE_URL}/api/events/${eventId}`)
  .then(res => res.json())
  .then(event => {
    console.log("Fetched Event:", event);

    document.getElementById("title").value = event.title || "";
    document.getElementById("description").value = event.description || "";
    document.getElementById("date").value = event.date || "";
    document.getElementById("location").value = event.location || "";
    document.getElementById("type").value = event.type || "";
    document.getElementById("status").value = event.status || "";
  })
  .catch(err => console.error("Fetch error:", err));

document.getElementById("eventForm").addEventListener("submit", e => {
  e.preventDefault();

  fetch(`${API_BASE_URL}/api/events/${eventId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title.value,
      description: description.value,
      date: date.value,
      location: location.value,
      type: type.value,
      status: status.value
    })
  }).then(() => {
    alert("✅ Event updated");
    window.location.href = "admin-dashboard.html";
  });
});
