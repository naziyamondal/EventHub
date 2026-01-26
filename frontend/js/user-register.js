document.getElementById("registerForm").addEventListener("submit", async e => {
  e.preventDefault();

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  const res = await fetch("http://localhost:4000/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }) // ✅ FIXED
  });

  if (!res.ok) {
    alert("Registration failed");
    return;
  }

  alert("Registration successful! Please login.");
  showLogin();
});
