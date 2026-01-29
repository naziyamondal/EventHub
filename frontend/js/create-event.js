if (!localStorage.getItem("admin")) {
  alert("Admin access only");
  window.location.href = "admin-login.html";
}

document.getElementById("eventForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const eventData = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    duration: document.getElementById("duration").value + " min",
    location: document.getElementById("location").value,
    type: document.getElementById("type").value,
    status: document.getElementById("status").value,
    price: Number(document.getElementById("price").value),
    capacity: Number(document.getElementById("capacity").value),
    image: document.getElementById("image").value
  };

  fetch(`${API_BASE_URL}/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData)
  })
    .then(res => res.json())
    .then(() => {
      alert("✅ Event created successfully!");
      window.location.href = "admin-dashboard.html";
    })
    .catch(() => alert("❌ Error creating event"));
});
