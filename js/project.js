document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const projectCover = document.getElementById('projectCover');
  const openProject = document.getElementById('openProject');
  const closeProject = document.getElementById('closeProject');
  const projectForm = document.getElementById('projectForm');
  const projectList = document.getElementById('projectList');

  // Edit index for updating projects
  let editIndex = null;

  // ==========================
  // PROJECT FORM SUBMISSION
  // ==========================
  if (projectForm) {
    projectForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(projectForm);

      try {
        const response = await fetch('php/projects.php', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        console.log(result);

        if (result.success) {
          alert("✅ Project uploaded successfully!");
          projectForm.reset();
          await loadProjectsFromDatabase();
        } else {
          alert("❌ Upload failed: " + result.message);
        }
      } catch (error) {
        console.error("Error connecting to server:", error);
        alert("⚠️ Error connecting to server.");
      }
    });
  } else {
    console.error("❌ projectForm not found in DOM");
  }

  // ==========================
  // LOAD PROJECTS FROM DATABASE
  // ==========================
  async function loadProjectsFromDatabase() {
    try {
      const response = await fetch('php/get_projects.php');
      const data = await response.json();

      if (!projectList) return;
      projectList.innerHTML = '';

      if (!data.success || data.projects.length === 0) {
        projectList.innerHTML = `<p style="text-align:center;color:#aaa;">No projects yet.</p>`;
        return;
      }

      data.projects.forEach((p) => {
        const card = document.createElement('article');
        card.classList.add('card');
        card.innerHTML = `
          <a href="${p.project_link || '#'}" target="_blank" rel="noopener noreferrer">
            <img src="${p.file ? p.file : 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${p.project_title}">
            <div class="meta">
              <h3>${p.project_title}</h3>
              <p class="sub">${p.project_description || ''}</p>
            </div>
          </a>
        `;
        projectList.appendChild(card);
      });
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  }

  // ==========================
  // OPEN / CLOSE PROJECT PANEL
  // ==========================
  if (openProject) {
    openProject.addEventListener('click', (e) => {
      e.preventDefault();
      if (projectCover) projectCover.style.display = 'block';
      loadProjectsFromDatabase();
    });
  }

  if (closeProject) {
    closeProject.addEventListener('click', () => {
      if (projectCover) projectCover.style.display = 'none';
    });
  }

  // ==========================
  // INITIAL LOAD
  // ==========================
  loadProjectsFromDatabase();
});
