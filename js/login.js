// login.js
const loginModal = document.getElementById("loginModal");
const portfolioContent = document.getElementById("portfolioContent");
const getOtpBtn = document.getElementById("getOtpBtn");
const confirmOtpBtn = document.getElementById("confirmOtpBtn");
const signUpBtn = document.getElementById("signUpBtn");
const otpInput = document.getElementById("otpInput");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const logoutBtn = document.getElementById("logoutBtn");
let generatedOtp = "";

// 🔹 Admin shortcut
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("admin") === "true" && loginModal && portfolioContent && logoutBtn) {
  loginModal.style.display = "none";
  portfolioContent.style.display = "block";
  logoutBtn.style.display = "inline-block";
}

// 🔹 OTP System
if (getOtpBtn) {
  getOtpBtn.addEventListener("click", () => {
    if (email && fullName && email.value.includes("@gmail.com") && fullName.value.trim() !== "") {
      generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      alert("📩 Your OTP is: " + generatedOtp);
      if (otpInput && confirmOtpBtn) {
        otpInput.style.display = "block";
        confirmOtpBtn.style.display = "block";
      }
    } else {
      alert("⚠️ Please enter your full name and valid Gmail address.");
    }
  });
}

if (confirmOtpBtn) {
  confirmOtpBtn.addEventListener("click", () => {
    if (otpInput && otpInput.value === generatedOtp) {
      alert("✅ Login successful! Welcome, " + (fullName ? fullName.value : ""));
      if (loginModal) loginModal.style.display = "none";
      if (portfolioContent) portfolioContent.style.display = "block";
      if (logoutBtn) logoutBtn.style.display = "inline-block";
    } else {
      alert("❌ Invalid OTP. Please try again.");
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    alert("👋 You have logged out.");
    if (portfolioContent) portfolioContent.style.display = "none";
    if (loginModal) loginModal.style.display = "flex";
    if (otpInput) otpInput.value = "";
    generatedOtp = "";
  });
}
