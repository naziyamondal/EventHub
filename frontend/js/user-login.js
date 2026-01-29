document.getElementById("loginForm").addEventListener("submit", async e => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    alert("Invalid email or password");
    return;
  }

  // ✅ CORRECT PLACE
  const user = await res.json();

  localStorage.setItem("user", JSON.stringify({
    name: user.name,
    email: user.email
  }));

  window.location.href = "browse-events.html";
});

function showRegister(e) {
  e.preventDefault();
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
  document.getElementById("formTitle").innerText = "User Register";
  document.getElementById("formDesc").innerText = "Create a new account";
}

function showLogin(e) {
  e.preventDefault();
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("formTitle").innerText = "User Login";
  document.getElementById("formDesc").innerText = "Login to manage your bookings";
}
