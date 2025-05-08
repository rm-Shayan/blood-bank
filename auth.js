import checkLogin from './islogin.js';
checkLogin(); // Run it when the script loads



// Select elements
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginFormElement = document.getElementById("loginFormElement");
const signupFormElement = document.getElementById("signupFormElement");
const alertContainer = document.getElementById("alertContainer");

// Utility: Show alert
const showAlert = (message, type = "error") => {
  const div = document.createElement("div");
  div.className = `bg-${type === "error" ? "red" : "green"}-100 text-${type === "error" ? "red" : "green"}-700 px-4 py-2 rounded shadow`;
  div.innerText = message;
  alertContainer.appendChild(div);
  setTimeout(() => div.remove(), 3000);
};

// Utility: Get users from localStorage
const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

// Utility: Save user to localStorage
const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

// Tab switching logic
const switchToLogin = () => {
  loginTab.classList.add("text-red-600", "border-b-2", "border-red-600");
  loginTab.classList.remove("text-gray-500");

  signupTab.classList.remove("text-red-600", "border-b-2", "border-red-600");
  signupTab.classList.add("text-gray-500");

  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
};

const switchToSignup = () => {
  signupTab.classList.add("text-red-600", "border-b-2", "border-red-600");
  signupTab.classList.remove("text-gray-500");

  loginTab.classList.remove("text-red-600", "border-b-2", "border-red-600");
  loginTab.classList.add("text-gray-500");

  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
};

loginTab.addEventListener("click", switchToLogin);
signupTab.addEventListener("click", switchToSignup);

// Login form submit handler
loginFormElement?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value.trim();

  const user = getUsers().find((u) => u.email === email && u.password === password);

  if (user) {
    const isLoggedIn=true;
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("currentUser", JSON.stringify(user));
   
    showAlert("Login successful!", "success");
    setTimeout(() => window.location.href = "index.html", 1000); // Redirect after success
  } else {
    showAlert("Invalid email or password.", "error");
  }
});


// Signup form submit handler
signupFormElement?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value.trim();

  const users = getUsers();
  const exists = users.some((user) => user.email === email);

  if (exists) {
    showAlert("Email already exists. Please log in.", "error");
    return;
  }

  saveUser({ name, email, password });
  showAlert("Signup successful! You can now log in.", "success");
  signupFormElement.reset();
  switchToLogin(); // Auto switch to login
});

// Default: Show login tab
switchToLogin();
