fetch(`${API_BASE_URL}/api/events`)
  .then(res => res.json())
  .then(events => {
    events.forEach(e => {
      document.getElementById("events").innerHTML += `
        <div class="card">
          <h3>${e.title}</h3>
          <p>${e.description}</p>
          <button onclick="book('${e.title}')">Book</button>
        </div>
      `;
    });
  });

function book(title) {
  const email = prompt("Enter your email");
  fetch(`${API_BASE_URL}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userEmail: email, eventTitle: title })
  })
    .then(() => alert("Booking confirmed & email sent"));
}
function toggleMenu() {
  const nav = document.querySelector(".nav-links");
  nav.classList.toggle("active");
}

function updateAuthButtons() {
  const user = localStorage.getItem("user");

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!loginBtn || !logoutBtn) return;

  if (user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
}

function logoutUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("admin");

  alert("👋 Logged out successfully");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", updateAuthButtons);


function updateAuthUI() {
  const user = JSON.parse(localStorage.getItem("user"));

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const greeting = document.getElementById("userGreeting");

  if (!loginBtn || !logoutBtn || !greeting) return;

  if (user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";

    greeting.style.display = "inline-block";
    greeting.textContent = `Hi, ${user.name}`;
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";

    greeting.style.display = "none";
  }
}

function logoutUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("admin");

  alert("👋 Logged out successfully");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", updateAuthUI);

// ===== DARK MODE TOGGLE =====
const toggleBtn = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  if (toggleBtn) toggleBtn.textContent = "☀️";
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    toggleBtn.textContent = isDark ? "☀️" : "🌙";
  });
}
