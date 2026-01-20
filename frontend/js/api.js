const API_URL = "http://localhost:5000";

function getToken() {
  return localStorage.getItem("accessToken");
}

async function apiFetch(url, options = {}) {
  const token = getToken();

  const res = await fetch(API_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  });

  if (res.status === 401) {
    alert("Session expired. Please login again.");
    localStorage.clear();
    window.location.href = "login.html";
    return;
  }

  return res.json();
}
