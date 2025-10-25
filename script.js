// // ✅ Display current year
// const yearElement = document.getElementById('year');
// if (yearElement) {
//   yearElement.textContent = new Date().getFullYear();
// 

// 🔹 Login system setup
// const loginModal = document.getElementById("loginModal");
// const portfolioContent = document.getElementById("portfolioContent");
// const getOtpBtn = document.getElementById("getOtpBtn");
// const confirmOtpBtn = document.getElementById("confirmOtpBtn");
// const signUpBtn = document.getElementById("signUpBtn");
// const otpInput = document.getElementById("otpInput");
// const fullName = document.getElementById("fullName");
// const email = document.getElementById("email");
// const logoutBtn = document.getElementById("logoutBtn");
// let generatedOtp = "";


// // 🔹 Admin access shortcut
// const urlParams = new URLSearchParams(window.location.search);
// if (urlParams.get("admin") === "true" && loginModal && portfolioContent && logoutBtn) {
//   loginModal.style.display = "none";
//   portfolioContent.style.display = "block";
//   logoutBtn.style.display = "inline-block";
// }

// // 🔹 OTP System
// if (getOtpBtn) {
//   getOtpBtn.addEventListener("click", () => {
//     if (email && fullName && email.value.includes("@gmail.com") && fullName.value.trim() !== "") {
//       generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
//       alert("📩 Your OTP is: " + generatedOtp);
//       if (otpInput && confirmOtpBtn) {
//         otpInput.style.display = "block";
//         confirmOtpBtn.style.display = "block";
//       }
//     } else {
//       alert("⚠️ Please enter your full name and valid Gmail address.");
//     }
//   });
// }

// if (confirmOtpBtn) {
//   confirmOtpBtn.addEventListener("click", () => {
//     if (otpInput && otpInput.value === generatedOtp) {
//       alert("✅ Login successful! Welcome, " + (fullName ? fullName.value : ""));
//       if (loginModal) loginModal.style.display = "none";
//       if (portfolioContent) portfolioContent.style.display = "block";
//       if (logoutBtn) logoutBtn.style.display = "inline-block";
//     } else {
//       alert("❌ Invalid OTP. Please try again.");
//     }
//   });
// }

// if (logoutBtn) {
//   logoutBtn.addEventListener("click", () => {
//     alert("👋 You have logged out.");
//     if (portfolioContent) portfolioContent.style.display = "none";
//     if (loginModal) loginModal.style.display = "flex";
//     if (otpInput) otpInput.value = "";
//     generatedOtp = "";
//   });
// }

// // 🔹 ABOUT Section
// const aboutCover = document.getElementById('aboutCover');
// const openAbout = document.getElementById('openAbout');
// const closeAbout = document.getElementById('closeAbout');

// if (openAbout && aboutCover) {
//   openAbout.addEventListener('click', (e) => {
//     e.preventDefault();
//     aboutCover.style.display = "block";
//   });
// }

// if (closeAbout && aboutCover) {
//   closeAbout.addEventListener('click', () => {
//     aboutCover.style.display = "none";
//   });
// }

// // PROJECT SECTION
// const projectCover = document.getElementById('projectCover');
// const openProject = document.getElementById('openProject');
// const closeProject = document.getElementById('closeProject');
// const projectForm = document.getElementById('projectForm');
// const projectList = document.getElementById('projectList');

// // Open project window
// if (openProject) {
//   openProject.addEventListener('click', (e) => {
//     e.preventDefault();
//     projectCover.style.display = "block";
//     loadProjects();
//   });
// }

// // Close project window
// if (closeProject) {
//   closeProject.addEventListener('click', () => projectCover.style.display = "none");
// }

// // Load saved projects
// function loadProjects() {
//   projectList.innerHTML = '';
//   const projects = JSON.parse(localStorage.getItem('myProjects')) || [];

//   if (projects.length === 0) {
//     projectList.innerHTML = `<p style="text-align:center;color:#aaa;">No projects yet. Add one above!</p>`;
//     return;
//   }

//   projects.forEach((p, index) => {
//     const card = document.createElement('article');
//     card.classList.add('card');
//     card.innerHTML = `
//       <a href="${p.link || '#'}" target="_blank">
//         <img src="${p.image || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${p.title}">
//         <div class="meta">
//           <h3>${p.title}</h3>
//           <p class="sub">${p.description || ''}</p>
//         </div>
//       </a>
//       <button class="delete-btn" data-index="${index}">🗑 Delete</button>
//     `;
//     projectList.appendChild(card);
//   });

//   // Attach delete button listeners
//   document.querySelectorAll('.delete-btn').forEach(btn => {
//     btn.addEventListener('click', (e) => {
//       const i = e.target.dataset.index;
//       deleteProject(i);
//     });
//   });
// }

// // Add new project
// if (projectForm) {
//   projectForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const title = document.getElementById('projectTitle').value.trim();
//     const description = document.getElementById('projectDescription').value.trim();
//     const fileInput = document.getElementById('projectFile');
//     const link = document.getElementById('projectLink').value.trim();

//     if (!title || !description) {
//       alert("⚠️ Please fill in both title and description.");
//       return;
//     }

//     let image = '';
//     if (fileInput.files.length > 0) {
//       image = await toBase64(fileInput.files[0]);
//     }

//     const newProject = { title, description, image, link };
//     const projects = JSON.parse(localStorage.getItem('myProjects')) || [];
//     projects.push(newProject);
//     localStorage.setItem('myProjects', JSON.stringify(projects));

//     projectForm.reset();
//     loadProjects();
//   });
// }

// // Convert image to Base64
// function toBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// }

// // Delete project by index
// function deleteProject(index) {
//   const projects = JSON.parse(localStorage.getItem('myProjects')) || [];
//   if (confirm(`Delete project "${projects[index].title}"?`)) {
//     projects.splice(index, 1);
//     localStorage.setItem('myProjects', JSON.stringify(projects));
//     loadProjects();
//   }
// }

// // Load existing projects when opened
// loadProjects();


// // 🔹 CONTACT Section
// const contactCover = document.getElementById('contactCover');
// const openContact = document.getElementById('openContact'); // ✅ fixed selector
// const closeContact = document.getElementById('closeContact');

// if (openContact && contactCover) {
//   openContact.addEventListener('click', (e) => {
//     e.preventDefault();
//     contactCover.style.display = "block";
//   });
// }

// if (closeContact && contactCover) {
//   closeContact.addEventListener('click', () => {
//     contactCover.style.display = "none";
//   });
// }
