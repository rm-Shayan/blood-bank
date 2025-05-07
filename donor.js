import checkLogin from "./islogin.js";   
document.addEventListener("DOMContentLoaded", () => {

  checkLogin();
  
    donor(); // Initialize donor logic
    renderCards(); // Render the cards on page load
  });
  
  const donor = () => {
    const form = document.getElementById("DonorForm");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // --- Collect Input Values ---
      const name = document.getElementById("donorName").value;
      const dob = document.getElementById("donorBirthDate").value;
      const gender = document.getElementById("donorGender").value;
      const bloodGroup = document.getElementById("donorBloodGroup").value;
  
      const phone = document.getElementById("donorPhoneNum").value;
      const email = document.getElementById("donorEmail").value;
      const address = document.getElementById("donorAdress").value;
  
      const weight = document.getElementById("donorWeight").value;
      const lastDonation = document.getElementById("lastDonationDate").value;
  
      const conditions = [...document.querySelectorAll('input[name="policies"]:checked')]
        .map(el => el.nextElementSibling.textContent.trim());
  
      // --- OOP Classes (Encapsulation & Abstraction) ---
      class PersonalInformation {
        constructor(name, dob, gender, bloodGroup) {
          this.name = name;
          this.dob = dob;
          this.gender = gender;
          this.bloodGroup = bloodGroup;
        }
      }
  
      class ContactInformation {
        constructor(phone, email, address) {
          this.phone = phone;
          this.email = email;
          this.address = address;
        }
      }
  
      class HealthInformation {
        constructor(weight, lastDonation, medicalConditions) {
          this.weight = weight;
          this.lastDonation = lastDonation || "N/A";
          this.medicalConditions = medicalConditions;
        }
      }
  
      // --- Base class for polymorphism (Abstraction) ---
      class User {
        constructor(personalInfo, contactInfo) {
          this.personalInfo = personalInfo;
          this.contactInfo = contactInfo;
        }
  
        getSummary() {
          return {
            Name: this.personalInfo.name,
            Email: this.contactInfo.email,
          };
        }
      }
  
      // --- Inheritance: Donor extends User ---
      class Donor extends User {
        constructor(personalInfo, contactInfo, healthInfo) {
          super(personalInfo, contactInfo);
          this.healthInfo = healthInfo;
        }
  
        // Polymorphism: override getSummary
        getSummary() {
          return {
            ...super.getSummary(),
            Gender: this.personalInfo.gender,
            BloodGroup: this.personalInfo.bloodGroup,
            Weight: this.healthInfo.weight,
            LastDonation: this.healthInfo.lastDonation,
            Conditions: this.healthInfo.medicalConditions,
          };
        }
  
        thankYou() {
          alert(`Thank you, ${this.personalInfo.name}, for submitting your donation form!`);
        }
      }
  
      // Create instances
      const personalInfo = new PersonalInformation(name, dob, gender, bloodGroup);
      const contactInfo = new ContactInformation(phone, email, address);
      const healthInfo = new HealthInformation(weight, lastDonation, conditions);
  
      const donor = new Donor(personalInfo, contactInfo, healthInfo);
  
      // --- Save to Local Storage ---
      const storedDonors = JSON.parse(localStorage.getItem("donors")) || [];
  
      if (storedDonors.some(d => d.email === donor.contactInfo.email)) {
        alert("Donor already registered.");
      } else {
        storedDonors.push(donor.getSummary());
        localStorage.setItem("donors", JSON.stringify(storedDonors));
        donor.thankYou();
      }
  
      form.reset(); // Reset the form
      renderCards(); // Re-render the donor cards
    });
  };
  
  const renderCards = () => {
    const donorContainer = document.getElementById("donorCards");
    donorContainer.innerHTML = ""; // Clear existing cards
  
    const storedDonors = JSON.parse(localStorage.getItem("donors")) || [];
  
    storedDonors.forEach(donor => {
      const donorCard = document.createElement("div");
      donorCard.classList.add("bg-white", "shadow-lg", "rounded-lg", "p-6", "mb-6");
  
      donorCard.innerHTML = `
        <h3 class="text-xl font-semibold text-red-600">${donor.Name}</h3>
        <p class="text-gray-600"><strong>Date of Birth:</strong> ${donor.Dob}</p>
        <p class="text-gray-600"><strong>Gender:</strong> ${donor.Gender}</p>
        <p class="text-gray-600"><strong>Blood Group:</strong> ${donor.BloodGroup}</p>
        <p class="text-gray-600"><strong>Email:</strong> ${donor.Email}</p>
        <p class="text-gray-600"><strong>Weight:</strong> ${donor.Weight} kg</p>
        <p class="text-gray-600"><strong>Last Donation:</strong> ${donor.LastDonation}</p>
        <p class="text-gray-600"><strong>Conditions:</strong> ${donor.Conditions.join(", ") || "None"}</p>
      `;
  
      const form = document.getElementById("DonorForm").classList.add("hidden");
      const textDonor=document.getElementById("textdonor").classList.add("hidden")
    const regText=document.getElementById("regDonor").classList.remove("hidden")
      donorContainer.appendChild(donorCard);

    });
  };
  




  