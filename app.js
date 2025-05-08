import checkLogin from "./islogin.js";

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Check login status
    checkLogin();
    checkLoginStatus();
    
    // Add event listeners
    setupEventListeners();
});

// Check login status and update UI
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    
    // Get DOM elements
    const profileSection = document.getElementById('profileSection');
    const loginSection = document.getElementById('loginSection');
    const userInitial = document.getElementById('userInitial');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    
    if (isLoggedIn && userInfo) {
        // Show profile section
        if (profileSection) profileSection.classList.remove('hidden');
        if (loginSection) loginSection.classList.add('hidden');
        
        // Update user info
        if (userInitial) userInitial.textContent = userInfo.name.charAt(0).toUpperCase();
        if (userName) userName.textContent = userInfo.name;
        if (userEmail) userEmail.textContent = userInfo.email;
    } else {
        // Show login section
        if (profileSection) profileSection.classList.add('hidden');
        if (loginSection) loginSection.classList.remove('hidden');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Profile dropdown toggle
    const profileButton = document.getElementById('profileButton');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (profileButton && profileDropdown) {
        profileButton.addEventListener('click', () => {
            profileDropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }
}

// Handle logout
function logout() {
    // Clear user data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
    
    // Reload page
    window.location.reload();
}

// Export functions
window.checkLoginStatus = checkLoginStatus;
window.logout = logout;
 

