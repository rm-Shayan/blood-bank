// Admin credentials
const ADMIN_EMAIL = "admin@bloodbank.com";
const ADMIN_PASSWORD = "Admin@123";

document.addEventListener("DOMContentLoaded", () => {
  const adminForm = document.getElementById("adminForm");
  if (!adminForm) return;

  adminForm.addEventListener("submit", handleAdminLogin);
});

const handleAdminLogin = (e) => {
  e.preventDefault();
  
  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Store admin session
    localStorage.setItem("adminSession", "true");
    showAlert("Login successful! Redirecting...", "success");
    
    // Redirect to admin dashboard after a short delay
    setTimeout(() => {
      window.location.href = "admin-dashboard.html";
    }, 1000);
  } else {
    showAlert("Invalid email or password", "error");
  }
};

const showAlert = (message, type = 'error') => {
  const alertDiv = document.createElement('div');
  alertDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
    type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
  }`;
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);
  setTimeout(() => alertDiv.remove(), 3000);
}; 