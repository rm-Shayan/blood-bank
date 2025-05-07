const checkLogin = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
  
    const isAuthPage = window.location.pathname.endsWith("auth.html");
    const isRestricted = ["/donate.html", "/admin.html"].includes(window.location.pathname);
  
    if (user.loggedIn && isAuthPage) {
      window.location.href = "index.html";
    } else if (!user.loggedIn && (isRestricted || !isAuthPage)) {
      window.location.href = "auth.html";
    }
  };
  
  export default checkLogin;
  