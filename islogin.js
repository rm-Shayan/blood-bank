
const checkLogin = () => {
  // Prevent check from running multiple times on same page
  if (window.__CHECK_LOGIN_RAN__) return;
  window.__CHECK_LOGIN_RAN__ = true;

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const isLoginPage = window.location.pathname.includes("auth.html");

  if (user && isLoginPage) {
    // Logged in but trying to access login.html
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000); // Optional: 3-second loader delay
  }

  if (!user && !isLoginPage) {
    // Not logged in, trying to access protected page
    window.location.href = "auth.html";
  }

  // Allow access otherwise
};

export default checkLogin;
