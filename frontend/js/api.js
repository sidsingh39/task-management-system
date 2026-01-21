const API_URL = "https://striking-wisdom-production-43c9.up.railway.app";

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
