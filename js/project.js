document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const projectCover = document.getElementById('projectCover');
  const openProject = document.getElementById('openProject');
  const closeProject = document.getElementById('closeProject');
  const projectForm = document.getElementById('projectForm');
  const projectList = document.getElementById('projectList');
  const viewModal = document.getElementById('viewModal');
  const closeView = document.getElementById('closeView');

  // ==========================
  // PROJECT FORM SUBMISSION
  // ==========================
  if (projectForm) {
    projectForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(projectForm);

      try {
        // Check if this is an edit
        const editId = projectForm.getAttribute('data-edit-id');
        if (editId) formData.append('id', editId);

        const response = await fetch(editId ? 'php/update_project.php' : 'php/projects.php', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();
        console.log(result);

      if (result.success) {
        alert(editId ? "✅ Project updated successfully!" : "✅ Project uploaded successfully!");
        projectForm.reset();
        projectForm.removeAttribute('data-edit-id');
        document.getElementById('submitBtn').textContent = "Upload"; // reset label
        await loadProjectsFromDatabase();
      }

     else {
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
          <img src="${p.file ? p.file : 'uploads/default.jpg'}" alt="${p.project_title}">
          <div class="meta">
            <h3>${p.project_title}</h3>
            <p class="sub">${p.project_description || ''}</p>
          </div>
        `;

        // When clicked → open view modal
        card.addEventListener('click', () => openViewModal(p));

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
  // VIEW MODAL HANDLERS
  // ==========================
  let currentProjectId = null; 

  function openViewModal(project) {
    console.log("Image path:", project.file);
    const viewTitle = document.getElementById('viewTitle');
    const viewImage = document.getElementById('viewImage');
    const viewDescription = document.getElementById('viewDescription');
    const viewLink = document.getElementById('viewLink');

    currentProjectId = project.id;

    viewTitle.textContent = project.project_title;
    viewImage.src = project.file || 'uploads/default.jpg';
    viewDescription.textContent = project.project_description || 'No description available.';
    viewLink.href = project.project_link || '#';
    viewLink.style.display = project.project_link ? 'inline-block' : 'none';

    viewModal.style.display = 'flex'; // make visible (use flex for centering)
  }

  document.getElementById('deleteProjectBtn').addEventListener('click', async () => {
  if (!currentProjectId) return alert("No project selected.");
  if (!confirm("Are you sure you want to delete this project?")) return;

  try {
    const res = await fetch('php/delete_project.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: currentProjectId })
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Project deleted successfully!");
      document.getElementById('viewModal').style.display = 'none';
      await loadProjectsFromDatabase(); // reload list
    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred while deleting.");
  }
});


const editBtn = document.getElementById('editProjectBtn');
if (editBtn) {
  editBtn.addEventListener('click', (e) => {
  e.stopPropagation();

  if (!currentProjectId) {
    alert("⚠️ No project selected.");
    return;
  }

  console.log("Editing project ID:", currentProjectId);

  // Get project data from modal
  const title = document.getElementById('viewTitle').textContent.trim();
  const description = document.getElementById('viewDescription').textContent.trim();
  const link = document.getElementById('viewLink').getAttribute('href');

  // Fill edit modal fields
  document.getElementById('editProjectId').value = currentProjectId;
  document.getElementById('editProjectTitle').value = title;
  document.getElementById('editProjectDescription').value = description;
  document.getElementById('editProjectLink').value = link;

  // Hide the view modal and show edit modal
  viewModal.style.display = 'none';
  document.getElementById('editModal').style.display = 'flex';
});


} else {
  console.error("Edit button not found in DOM");
}

const editForm = document.getElementById('editForm');
if (editForm) {
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(editForm);
    const projectId = document.getElementById('editProjectId').value;
    formData.append('id', projectId);

    try {
      const response = await fetch('php/update_project.php', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      if (result.success) {
        alert("✅ Project updated successfully!");
        editForm.reset();
        document.getElementById('editModal').style.display = 'none';
        await loadProjectsFromDatabase();
      } else {
        alert("❌ Update failed: " + result.message);
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
      alert("⚠️ Error connecting to server.");
    }
  });
}


const closeEdit = document.getElementById('closeEdit');
if (closeEdit) {
  closeEdit.addEventListener('click', () => {
    document.getElementById('editModal').style.display = 'none';
  });
}

// Optional: close edit modal by clicking outside content
window.addEventListener('click', (e) => {
  if (e.target === document.getElementById('editModal')) {
    document.getElementById('editModal').style.display = 'none';
  }
});


  if (closeView) {
    closeView.addEventListener('click', () => {
      viewModal.style.display = 'none';
    });
  }

  // Close modal by clicking outside content
  window.addEventListener('click', (e) => {
    if (e.target === viewModal) {
      viewModal.style.display = 'none';
    }
  });

  // ==========================
  // INITIAL LOAD
  // ==========================
  loadProjectsFromDatabase();
});
