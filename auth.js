import checkLogin from "./islogin.js";

document.addEventListener("DOMContentLoaded", () => {
  checkLogin();

  const $ = (id) => document.getElementById(id);

  const loginTab = $("loginTab");
  const signupTab = $("signupTab");
  const loginForm = $("loginForm");
  const signupForm = $("signupForm");

  const switchTabs = (isLogin) => {
    loginForm.classList.toggle("hidden", !isLogin);
    signupForm.classList.toggle("hidden", isLogin);
    loginTab.classList.toggle("active-tab", isLogin);
    signupTab.classList.toggle("active-tab", !isLogin);
  };

  loginTab.addEventListener("click", () => switchTabs(true));
  signupTab.addEventListener("click", () => switchTabs(false));

  const showAlert = (msg) => alert(msg);

  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const getUser = () => JSON.parse(localStorage.getItem("user")) || null;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (!email || !password) return showAlert("Please fill in both fields.");

    const user = getUser();
    if (user?.email === email && user?.password === password) {
      saveUser({ ...user, loggedIn: true });
      showAlert("Login successful!");
      window.location.href = "index.html";
    } else {
      showAlert("Invalid credentials or user not found.");
    }
  });

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const formData = new FormData(signupForm);
    const userName = formData.get("userName")?.trim();
    const email = formData.get("userEmail")?.trim();
    const password = formData.get("userPassword")?.trim();
  
    if (!userName || !email || !password) {
      return alert("Please fill in all fields.");
    }
  
    class User {
      constructor(userName, email, password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.loggedIn = true;
      }
    }
  
    const existingUser = JSON.parse(localStorage.getItem("user"));
  
    if (existingUser && existingUser.email === email) {
      return alert("User already exists. Please login.");
    }
  
    const newUser = new User(userName, email, password);
    localStorage.setItem("user", JSON.stringify(newUser));
    alert("Signup successful. Please login now.");
  
    // Delay tab switch until after alert is dismissed
    setTimeout(() => {
      // Switch to Login tab
      document.getElementById("loginTab").classList.add("active-tab");
      document.getElementById("signupTab").classList.remove("active-tab");
  
      document.getElementById("signupForm").classList.add("hidden");
      document.getElementById("loginForm").classList.remove("hidden");
    }, 100); // Slight delay to let alert finish
  });
  
});
