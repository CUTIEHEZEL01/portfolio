// project.js 
const projectCover = document.getElementById('projectCover');
const openProject = document.getElementById('openProject');
const closeProject = document.getElementById('closeProject');
const projectForm = document.getElementById('projectForm');
const projectList = document.getElementById('projectList');

let editIndex = null;

// ==========================
// CREATE VIEW MODAL
// ==========================
const viewModal = document.createElement('div');
viewModal.id = "viewModal";
viewModal.style.display = "none";
viewModal.style.position = "fixed";
viewModal.style.top = "0";
viewModal.style.left = "0";
viewModal.style.width = "100%";
viewModal.style.height = "100%";
viewModal.style.background = "rgba(0,0,0,0.8)";
viewModal.style.backdropFilter = "blur(4px)";
viewModal.style.justifyContent = "center";
viewModal.style.alignItems = "center";
viewModal.style.zIndex = "9999";
viewModal.innerHTML = `
  <div id="viewModalContent" style="
    background: var(--card);
    color: white;
    border-radius: 20px;
    padding: 20px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
    position: relative;">
    <button id="closeView" style="
      position: absolute;
      top: 10px;
      right: 10px;
      background: var(--accent);
      border: none;
      color: white;
      border-radius: 8px;
      padding: 5px 10px;
      cursor: pointer;">Close</button>
    <div id="viewContent"></div>
  </div>
`;
document.body.appendChild(viewModal);

// ==========================
// OPEN / CLOSE PROJECT PANEL
// ==========================
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

document.getElementById('closeView').addEventListener('click', () => {
  viewModal.style.display = "none";
});

// ==========================
// FILE TO BASE64
// ==========================
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// ==========================
// LOAD & DISPLAY PROJECTS
// ==========================
function loadProjects() {
  projectList.innerHTML = '';
  const projects = JSON.parse(localStorage.getItem('myProjects')) || [];

  if (projects.length === 0) {
    projectList.innerHTML = `<p style="text-align:center;color:#aaa;">No projects yet. Add one above!</p>`;
    return;
  }

  projects.forEach((p, index) => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.innerHTML = `
      <div class="project-thumb">
        <img src="${p.image || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${p.title}">
      </div>
      <div class="meta">
        <h3>${p.title}</h3>
        <p class="sub">${p.description || ''}</p>
      </div>
      <div class="actions">
        <button class="view-btn" data-index="${index}">👁 View</button>
        <button class="edit-btn" data-index="${index}">✏ Edit</button>
        <button class="delete-btn" data-index="${index}">🗑 Delete</button>
      </div>
    `;
    projectList.appendChild(card);
  });

  // Action Buttons
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => deleteProject(e.target.dataset.index));
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => editProject(e.target.dataset.index));
  });

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => viewProject(e.target.dataset.index));
  });
}

// ==========================
// ADD OR UPDATE PROJECT
// ==========================
if (projectForm) {
  projectForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('projectTitle').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const fileInput = document.getElementById('projectFile');
    const link = document.getElementById('projectLink').value.trim();

    if (!title || !description) {
      alert("⚠️ Please fill in both title and description.");
      return;
    }

    let image = '';
    if (fileInput.files.length > 0) {
      image = await toBase64(fileInput.files[0]);
    }

    const projects = JSON.parse(localStorage.getItem('myProjects')) || [];

    if (editIndex !== null) {
      const current = projects[editIndex];
      projects[editIndex] = {
        title,
        description,
        link,
        image: image || current.image,
      };
      editIndex = null;
      alert("✅ Project updated successfully!");
    } else {
      projects.push({ title, description, link, image });
      alert("✅ Project added successfully!");
    }

    localStorage.setItem('myProjects', JSON.stringify(projects));
    projectForm.reset();
    loadProjects();

    const addBtn = projectForm.querySelector('button[type="submit"]');
    addBtn.textContent = "Add Project";
  });
}

// ==========================
// EDIT PROJECT
// ==========================
function editProject(index) {
  const projects = JSON.parse(localStorage.getItem('myProjects')) || [];
  const project = projects[index];
  editIndex = index;

  document.getElementById('projectTitle').value = project.title;
  document.getElementById('projectDescription').value = project.description;
  document.getElementById('projectLink').value = project.link || '';

  const addBtn = projectForm.querySelector('button[type="submit"]');
  addBtn.textContent = "Update Project";

  document.getElementById('projectFile').value = '';
  projectForm.scrollIntoView({ behavior: 'smooth' });
}

// ==========================
// DELETE PROJECT
// ==========================
function deleteProject(index) {
  const projects = JSON.parse(localStorage.getItem('myProjects')) || [];
  if (confirm(`Delete project "${projects[index].title}"?`)) {
    projects.splice(index, 1);
    localStorage.setItem('myProjects', JSON.stringify(projects));
    loadProjects();
  }
}

// ==========================
// VIEW PROJECT
// ==========================
function viewProject(index) {
  const projects = JSON.parse(localStorage.getItem('myProjects')) || [];
  const p = projects[index];
  const content = `
    <img src="${p.image || 'https://via.placeholder.com/400x200?text=No+Image'}" 
         alt="${p.title}" 
         style="width:100%;border-radius:10px;margin-bottom:10px;">
    <h2 style="margin-bottom:10px;">${p.title}</h2>
    <p style="margin-bottom:15px;">${p.description}</p>
    ${p.link ? `<a href="${p.link}" target="_blank" style="color:var(--accent-light);text-decoration:underline;">Visit Project</a>` : ''}
  `;
  document.getElementById('viewContent').innerHTML = content;
  viewModal.style.display = "flex";
}

// ==========================
// INITIAL LOAD
// ==========================
loadProjects();

document.getElementById('projectForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    try {
        const response = await fetch('upload_project.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Project added successfully!');
            this.reset();
            location.reload(); // Reload to show new project
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});