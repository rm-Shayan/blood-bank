import checkLogin from "./islogin.js";

// Dummy donors data
const dummyDonors = [
  {
    name: "Alice Brown",
    birthDate: "1990-05-15",
    gender: "female",
    bloodGroup: "A+",
    phone: "5551234567",
    email: "alice@example.com",
    address: "123 Main St",
    weight: "65",
    lastDonationDate: "2023-12-01",
    healthConditions: ["none"],
    registrationDate: new Date().toISOString(),
    status: "active"
  },
  {
    name: "Bob Wilson",
    birthDate: "1985-08-20",
    gender: "male",
    bloodGroup: "O+",
    phone: "5559876543",
    email: "bob@example.com",
    address: "456 Oak St",
    weight: "75",
    lastDonationDate: "2023-11-15",
    healthConditions: ["none"],
    registrationDate: new Date().toISOString(),
    status: "active"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  checkLogin();
  initializeRequestForm();
  // Hide donor cards section initially
  const donorCardsSection = document.querySelector('.mt-8');
  if (donorCardsSection) {
    donorCardsSection.style.display = 'none';
  }
});

const initializeRequestForm = () => {
  const requestForm = document.getElementById("requestForm");
  if (!requestForm) return;

  requestForm.addEventListener("submit", handleRequestSubmit);
};

const handleRequestSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const requestData = {
    patientName: formData.get("patientName"),
    bloodType: formData.get("bloodType"),
    units: formData.get("units"),
    urgency: formData.get("urgency"),
    hospital: formData.get("hospital"),
    reason: formData.get("reason"),
    contactName: formData.get("contactName"),
    contactPhone: formData.get("contactPhone")
  };

  const errors = validateRequestData(requestData);
  if (errors.length > 0) {
    showAlert(errors.join("\n"), "error");
    return;
  }

  const request = createRequestObject(requestData);
  saveRequestData(request);
  showAlert("Blood request submitted successfully!", "success");
  e.target.reset();
  
  // Show donor cards section and load available donors
  const donorCardsSection = document.querySelector('.mt-8');
  if (donorCardsSection) {
    donorCardsSection.style.display = 'block';
    loadAvailableDonors(requestData.bloodType);
  }
};

const validateRequestData = (data) => {
  const errors = [];

  if (!data.patientName || data.patientName.length < 2) {
    errors.push('Please enter a valid patient name');
  }

  if (!data.bloodType) {
    errors.push('Please select a blood type');
  }

  if (!data.units || data.units < 1 || data.units > 10) {
    errors.push('Please enter a valid number of units (1-10)');
  }

  if (!data.hospital || data.hospital.length < 2) {
    errors.push('Please enter a valid hospital name');
  }

  if (!data.contactName || data.contactName.length < 2) {
    errors.push('Please enter a valid contact name');
  }

  const phoneRegex = /^[0-9]{10,}$/;
  if (!phoneRegex.test(data.contactPhone.replace(/[^0-9]/g, ''))) {
    errors.push('Please enter a valid contact phone number');
  }

  if (!data.reason || data.reason.length < 10) {
    errors.push('Please provide a detailed reason for the blood request');
  }

  return errors;
};

const createRequestObject = (formData) => {
  return {
    patientName: formData.patientName,
    bloodType: formData.bloodType,
    units: parseInt(formData.units),
    urgency: formData.urgency,
    hospital: formData.hospital,
    contactName: formData.contactName,
    contactPhone: formData.contactPhone,
    reason: formData.reason,
    status: 'pending',
    requestDate: new Date().toISOString(),
    requestId: generateRequestId()
  };
};

const generateRequestId = () => {
  return 'REQ-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const saveRequestData = (request) => {
  const storedRequests = JSON.parse(localStorage.getItem("bloodRequests")) || [];
  storedRequests.push(request);
  localStorage.setItem("bloodRequests", JSON.stringify(storedRequests));
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

const loadAvailableDonors = (bloodType) => {
  const donorCardsContainer = document.getElementById("donorCards");
  if (!donorCardsContainer) return;

  if (!bloodType) {
    donorCardsContainer.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-gray-600">Please select a blood type to view available donors.</p>
      </div>
    `;
    return;
  }

  // Get all donors (combine stored and dummy)
  const storedDonors = JSON.parse(localStorage.getItem("donors")) || [];
  const allDonors = [...storedDonors, ...dummyDonors];
  
  const availableDonors = allDonors.filter(donor => 
    donor.bloodGroup === bloodType && 
    (!donor.lastDonationDate || 
     (new Date() - new Date(donor.lastDonationDate)) / (1000 * 60 * 60 * 24 * 30) >= 3)
  );

  if (availableDonors.length === 0) {
    donorCardsContainer.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-gray-600">No donors available for blood type ${bloodType}.</p>
      </div>
    `;
    return;
  }

  donorCardsContainer.innerHTML = availableDonors.map(donor => `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">${donor.name}</h3>
      <div class="space-y-2">
        <p class="text-gray-600"><span class="font-medium">Blood Type:</span> ${donor.bloodGroup}</p>
        <p class="text-gray-600"><span class="font-medium">Age:</span> ${calculateAge(donor.birthDate)} years</p>
        <p class="text-gray-600"><span class="font-medium">Contact:</span> ${donor.phone}</p>
        <p class="text-gray-600"><span class="font-medium">Last Donation:</span> ${donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : 'Never'}</p>
        <button onclick="contactDonor('${donor.phone}')" 
          class="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          Contact Donor
        </button>
      </div>
    </div>
  `).join('');
};

// Add event listener for blood type selection
document.getElementById("bloodType")?.addEventListener("change", (e) => {
  loadAvailableDonors(e.target.value);
});

// Make contactDonor function available globally
window.contactDonor = (contact) => {
  showAlert(`Contacting donor at ${contact}...`, 'success');
};

// Helper function to calculate age
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
  