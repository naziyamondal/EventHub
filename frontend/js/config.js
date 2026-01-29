const API_BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : window.location.origin;

console.log("API URL set to:", API_BASE_URL);
