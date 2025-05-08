import checkLogin from "./islogin.js";   

// Dummy blood requests data
const dummyRequests = [
  {
    patientName: "John Smith",
    bloodType: "A+",
    units: 2,
    urgency: "emergency",
    hospital: "City Hospital",
    reason: "Emergency surgery required",
    contactName: "Sarah Smith",
    contactPhone: "1234567890",
    status: "pending",
    requestDate: new Date().toISOString(),
    requestId: "REQ-123456"
  },
  {
    patientName: "Mary Johnson",
    bloodType: "O+",
    units: 3,
    urgency: "urgent",
    hospital: "General Hospital",
    reason: "Cancer treatment",
    contactName: "David Johnson",
    contactPhone: "9876543210",
    status: "pending",
    requestDate: new Date().toISOString(),
    requestId: "REQ-789012"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  checkLogin();
  initializeDonorForm();
  // Hide donor cards section initially
  const donorCardsSection = document.querySelector('.mt-8');
  if (donorCardsSection) {
    donorCardsSection.style.display = 'none';
  }
});
  
const initializeDonorForm = () => {
    const donorForm = document.getElementById("DonorForm");
  if (!donorForm) return;

  donorForm.addEventListener("submit", handleDonorSubmit);
};
  
const handleDonorSubmit = (e) => {
      e.preventDefault();
  
  const formData = new FormData(e.target);
  const donorData = {
    name: formData.get("donorName"),
    birthDate: formData.get("donorBirthDate"),
    gender: formData.get("donorGender"),
    bloodGroup: formData.get("donorBloodGroup"),
    phone: formData.get("donorPhoneNum"),
    email: formData.get("donorEmail"),
    address: formData.get("donorAdress"),
    weight: formData.get("donorWeight"),
    lastDonationDate: formData.get("lastDonationDate"),
    healthConditions: Array.from(formData.getAll("policies"))
  };
  
  const errors = validateDonorData(donorData);
  if (errors.length > 0) {
    showAlert(errors.join("\n"), "error");
    return;
  }

  const donor = createDonorObject(donorData);
  saveDonorData(donor);
  showAlert("Donor registration successful!", "success");
  e.target.reset();
  
  // Show donor cards section and render cards
  const donorCardsSection = document.querySelector('.mt-8');
  if (donorCardsSection) {
    donorCardsSection.style.display = 'block';
    renderDonorCards();
    renderMatchingRequests(donor.bloodGroup);
  }
};

const validateDonorData = (data) => {
  const errors = [];

  // Name validation
  if (!data.name || data.name.length < 2) {
    errors.push('Please enter a valid name');
      }
  
  // Age validation (must be 18-65)
  const age = calculateAge(data.birthDate);
  if (age < 18 || age > 65) {
    errors.push('Donor must be between 18 and 65 years old');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.push('Please enter a valid email address');
      }
  
  // Phone validation
  const phoneRegex = /^[0-9]{10,}$/;
  if (!phoneRegex.test(data.phone.replace(/[^0-9]/g, ''))) {
    errors.push('Please enter a valid phone number');
  }

  // Weight validation (must be at least 50kg)
  if (parseFloat(data.weight) < 50) {
    errors.push('Donor must weigh at least 50kg');
        }
  
  // Last donation validation
  if (data.lastDonationDate) {
    const lastDonationDate = new Date(data.lastDonationDate);
    const today = new Date();
    const monthsSinceLastDonation = (today - lastDonationDate) / (1000 * 60 * 60 * 24 * 30);
    if (monthsSinceLastDonation < 3) {
      errors.push('Must wait at least 3 months between donations');
    }
  }

  return errors;
};

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
        }
  
  return age;
};

const createDonorObject = (formData) => {
  return {
    name: formData.name,
    birthDate: formData.birthDate,
    gender: formData.gender,
    bloodGroup: formData.bloodGroup,
    phone: formData.phone,
    email: formData.email,
    address: formData.address,
    weight: formData.weight,
    lastDonationDate: formData.lastDonationDate,
    healthConditions: formData.healthConditions,
    registrationDate: new Date().toISOString(),
    status: 'active'
  };
};

const saveDonorData = (donor) => {
      const storedDonors = JSON.parse(localStorage.getItem("donors")) || [];
  
  // Check for existing donor
  const existingDonorIndex = storedDonors.findIndex(d => d.email === donor.email);
  
  if (existingDonorIndex !== -1) {
    // Update existing donor
    storedDonors[existingDonorIndex] = donor;
      } else {
    // Add new donor
    storedDonors.push(donor);
  }
  
        localStorage.setItem("donors", JSON.stringify(storedDonors));
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
  
const renderDonorCards = () => {
  const donorCardsContainer = document.getElementById("donorCards");
  if (!donorCardsContainer) return;
  
  const donors = JSON.parse(localStorage.getItem("donors")) || [];
  
  if (donors.length === 0) {
    donorCardsContainer.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-gray-600">No donors registered yet.</p>
      </div>
    `;
    return;
  }

  donorCardsContainer.innerHTML = donors.map(donor => `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">${donor.name}</h3>
      <div class="space-y-2">
        <p class="text-gray-600"><span class="font-medium">Blood Type:</span> ${donor.bloodGroup}</p>
        <p class="text-gray-600"><span class="font-medium">Age:</span> ${calculateAge(donor.birthDate)} years</p>
        <p class="text-gray-600"><span class="font-medium">Contact:</span> ${donor.phone}</p>
        <p class="text-gray-600"><span class="font-medium">Last Donation:</span> ${donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : 'Never'}</p>
        <p class="text-gray-600"><span class="font-medium">Status:</span> ${donor.lastDonationDate ? 'Available' : 'New Donor'}</p>
      </div>
    </div>
  `).join('');
};

const renderMatchingRequests = (bloodType) => {
  const requestsContainer = document.createElement('div');
  requestsContainer.className = 'mt-12';
  requestsContainer.innerHTML = `
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Matching Blood Requests</h2>
    <div id="matchingRequests" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  `;

  const donorCardsSection = document.querySelector('.mt-8');
  if (!donorCardsSection) return;

  // Get all requests (combine stored and dummy)
  const storedRequests = JSON.parse(localStorage.getItem("bloodRequests")) || [];
  const allRequests = [...storedRequests, ...dummyRequests];
  
  // Filter requests matching the donor's blood type
  const matchingRequests = allRequests.filter(request => 
    request.bloodType === bloodType && request.status === 'pending'
  );

  if (matchingRequests.length === 0) {
    requestsContainer.innerHTML += `
      <div class="col-span-full text-center py-8">
        <p class="text-gray-600">No matching blood requests found.</p>
      </div>
    `;
  } else {
    requestsContainer.innerHTML += matchingRequests.map(request => `
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">${request.patientName}</h3>
        <div class="space-y-2">
          <p class="text-gray-600"><span class="font-medium">Blood Type:</span> ${request.bloodType}</p>
          <p class="text-gray-600"><span class="font-medium">Units Needed:</span> ${request.units}</p>
          <p class="text-gray-600"><span class="font-medium">Urgency:</span> ${request.urgency}</p>
          <p class="text-gray-600"><span class="font-medium">Hospital:</span> ${request.hospital}</p>
          <p class="text-gray-600"><span class="font-medium">Contact:</span> ${request.contactName} (${request.contactPhone})</p>
          <button onclick="contactRequester('${request.contactPhone}')" 
            class="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            Contact Requester
          </button>
        </div>
      </div>
    `).join('');
  }

  requestsContainer.innerHTML += '</div>';
  donorCardsSection.appendChild(requestsContainer);
};

// Make contactRequester function available globally
window.contactRequester = (contact) => {
  showAlert(`Contacting requester at ${contact}...`, 'success');
};
  