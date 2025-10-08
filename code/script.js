// ✅ Display current year
document.getElementById('year').textContent = new Date().getFullYear();

// 🔹 Login system setup
const loginModal = document.getElementById("loginModal");
const portfolioContent = document.getElementById("portfolioContent");
const getOtpBtn = document.getElementById("getOtpBtn");
const confirmOtpBtn = document.getElementById("confirmOtpBtn");
const otpInput = document.getElementById("otpInput");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const logoutBtn = document.getElementById("logoutBtn");
let generatedOtp = "";

// 🔹 Admin access shortcut
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("admin") === "true") {
  loginModal.style.display = "none";
  portfolioContent.style.display = "block";
  logoutBtn.style.display = "inline-block";
}

// 🔹 OTP System
getOtpBtn.addEventListener("click", () => {
  if (email.value.includes("@gmail.com") && fullName.value.trim() !== "") {
    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    alert("📩 Your OTP is: " + generatedOtp);
    otpInput.style.display = "block";
    confirmOtpBtn.style.display = "block";
  } else {
    alert("⚠️ Please enter your full name and valid Gmail address.");
  }
});

confirmOtpBtn.addEventListener("click", () => {
  if (otpInput.value === generatedOtp) {
    alert("✅ Login successful! Welcome, " + fullName.value);
    loginModal.style.display = "none";
    portfolioContent.style.display = "block";
    logoutBtn.style.display = "inline-block";
  } else {
    alert("❌ Invalid OTP. Please try again.");
  }
});

logoutBtn.addEventListener("click", () => {
  alert("👋 You have logged out.");
  portfolioContent.style.display = "none";
  loginModal.style.display = "flex";
  otpInput.value = "";
  generatedOtp = "";
});

// 🔹 ABOUT Section
const aboutCover = document.getElementById('aboutCover');
const openAbout = document.getElementById('openAbout');
const closeAbout = document.getElementById('closeAbout');

if (openAbout) {
  openAbout.addEventListener('click', (e) => {
    e.preventDefault();
    aboutCover.style.display = "block";
  });
}
if (closeAbout) {
  closeAbout.addEventListener('click', () => aboutCover.style.display = "none");
}

// 🔹 PROJECT Section (previously Portfolio)
const projectCover = document.getElementById('projectCover');
const openProject = document.getElementById('openProject');
const closeProject = document.getElementById('closeProject');
const projectForm = document.getElementById('projectForm');
const projectList = document.getElementById('projectList');

if (openProject) {
  openProject.addEventListener('click', (e) => {
    e.preventDefault();
    projectCover.style.display = "block";
    loadProjects();
  });
}

if (closeProject) {
  closeProject.addEventListener('click', () => projectCover.style.display = "none");
}

function loadProjects() {
  if (!projectList) return;
  projectList.innerHTML = '';
  const projects = JSON.parse(localStorage.getItem('myProjects')) || [];
  projects.forEach((p) => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.innerHTML = `
      <a href="${p.link || '#'}" target="_blank">
        <img src="${p.image || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${p.title}">
        <div class="meta">
          <div class="title">${p.title}</div>
        </div>
      </a>
    `;
    projectList.appendChild(card);
  });
}

if (projectForm) {
  projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('projectTitle').value;
    const image = document.getElementById('projectImage').value;
    const link = document.getElementById('projectLink').value;

    const newProject = { title, image, link };
    const projects = JSON.parse(localStorage.getItem('myProjects')) || [];
    projects.push(newProject);
    localStorage.setItem('myProjects', JSON.stringify(projects));
    projectForm.reset();
    loadProjects();
  });
}
loadProjects();

// 🔹 CONTACT Section
const contactCover = document.getElementById('contactCover');
const openContact = document.querySelector('a[href="#contact"]');
const closeContact = document.getElementById('closeContact');

if (openContact) {
  openContact.addEventListener('click', (e) => {
    e.preventDefault();
    contactCover.style.display = "block";
  });
}
if (closeContact) {
  closeContact.addEventListener('click', () => {
    contactCover.style.display = "none";
  });
}
