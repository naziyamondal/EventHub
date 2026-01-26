document.getElementById("adminLogin").addEventListener("submit", e => {
  e.preventDefault();

  fetch("http://localhost:4000/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("admin", "true");
        window.location.href = "admin-dashboard.html";
      } else {
        alert("Invalid login");
      }
    });
});
