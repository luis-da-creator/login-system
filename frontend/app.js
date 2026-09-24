const API_URL ="https://login-system-w7u3.onrender.com";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegisterBtn = document.getElementById("showRegister");
const toggleText = document.getElementById("toggleText"); // Targets the new span

// Toggle between Login and Register views
showRegisterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.toggle("hidden");
  registerForm.classList.toggle("hidden");
  
  if (registerForm.classList.contains("hidden")) {
    showRegisterBtn.textContent = "Register";
    toggleText.textContent = "Don't have an account? ";
  } else {
    showRegisterBtn.textContent = "Login";
    toggleText.textContent = "Already have an account? ";
  }
});

// Registration Logic
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const messageEl = document.getElementById("registerMessage");

  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      messageEl.textContent = "Registration successful! You can now log in.";
      messageEl.style.color = "green";
      registerForm.reset();
    } else {
      messageEl.textContent = data.message;
      messageEl.style.color = "red";
    }
  } catch (error) {
    messageEl.textContent = "Cannot connect to server. Is the backend running?";
    messageEl.style.color = "red";
  }
});

// Login Logic
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const messageEl = document.getElementById("message");

  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      messageEl.textContent = data.message;
      messageEl.style.color = "red";
    }
  } catch (error) {
    messageEl.textContent = "Cannot connect to server. Is the backend running?";
    messageEl.style.color = "red";
  }
});
