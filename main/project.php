<!-- PROJECT SECTION -->
<div id="projectCover" class="about-cover" style="display:none;">
  <div class="about-inner">
    <button class="close" id="closeProject">Close</button>
    <h2>My Projects</h2>
    <p>Add or manage your projects below.</p>

    <!-- Add / Edit Form -->
    <form id="projectForm" enctype="multipart/form-data">
      <input type="text" id="projectTitle" name="project_title" required placeholder="Project Title">
      <textarea id="projectDescription" name="project_description" placeholder="Project Description"></textarea>
      <input type="file" id="File" name="file" accept="image/*">
      <input type="text" id="projectLink" name="project_link" placeholder="Project Link (optional)">
      <button type="submit" id="submitBtn">Upload</button>
    </form>

    <!-- Project List -->
    <div class="grid" id="projectList"></div>
  </div>



  <div id="viewModal">
    <div id="viewModalContent">
      <button id="closeView">✕</button>
      <h2 id="viewTitle">Project Title</h2>

      <div id="viewBody">
        <img id="viewImage" src="" alt="Project Image">
        <div id="viewText">
          <p id="viewDescription">This is where the project description appears.</p>
          <a id="viewLink" href="#" target="_blank"></a>
        </div>
      </div>

      <div id="viewActions" style="margin-top: 15px; text-align: right;">
        <button id="deleteProjectBtn" style="background: #e74c3c; color: white; border: none; padding: 8px 14px; border-radius: 5px; cursor: pointer;">
          🗑 Delete Project
        </button>
        <button id="editProjectBtn" style="background: #4ae73cff; color: white; border: none; padding: 8px 14px; border-radius: 5px; cursor: pointer;">✏️ Edit</button>
      </div>
    </div>
  </div>
</div>

<!-- EDIT MODAL -->
<div id="editModal" style="display: none;">
  <div class="editModalContent">
    <button id="closeEdit" class="closeEditBtn">✕</button>
    
    <h2 class="modalTitle">Edit Project</h2>
    
    <form id="editForm" enctype="multipart/form-data">
      <input type="hidden" id="editProjectId">

      <label for="editProjectTitle">Project Title</label>
      <input type="text" id="editProjectTitle" name="project_title" required placeholder="Project Title">

      <label for="editProjectDescription">Project Description</label>
      <textarea id="editProjectDescription" name="project_description" placeholder="Project Description"></textarea>

      <label for="editFile">Project Image</label>
      <input type="file" id="editFile" name="file" accept="image/*">

      <label for="editProjectLink">Project Link (optional)</label>
      <input type="text" id="editProjectLink" name="project_link" placeholder="https://example.com">

      <button type="submit" id="updateBtn">Update Project</button>
    </form>
  </div>
</div>



<script src="js/project.js"></script>

