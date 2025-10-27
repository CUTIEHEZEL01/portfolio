<!-- PROJECT SECTION -->
<div id="projectCover" class="about-cover" style="display:none;">
  <div class="about-inner">
    <button class="close" id="closeProject">Close</button>
    <h2>My Projects</h2>
    <p>Add or manage your projects below.</p>

    <!-- Add / Edit Form -->
    <form id="projectForm" action="upload_project.php" method="POST" enctype="multipart/form-data">
  <input type="hidden" id="editIndex">
  <input type="text" name="project_title" id="projectTitle" placeholder="Project Title" required>
  
  <textarea name="project_description" id="projectDescription" placeholder="Project Description" rows="3" required></textarea>
  
  <input type="file" name="file" id="projectFile" accept="image/*" required>
  
  <input type="text" name="project_link" id="projectLink" placeholder="Project Link (optional)">
  
  <button type="submit" id="submitBtn">Add Project</button>
</form>

    <!-- Project List -->
    <div class="grid" id="projectList">
  <?php include('fetch_projects.php'); ?>
</div>

</div>

<!-- VIEW MODAL -->
<div id="viewModal">
  <div id="viewModalContent">
    <button id="closeView">✕</button>
    <h2 id="viewTitle">Project Title</h2>

    <div id="viewBody">
      <img id="viewImage" src="" alt="Project Image">
      <div id="viewText">
        <p id="viewDescription">This is where the project description appears.</p>
        <a id="viewLink" href="#" target="_blank">View Project</a>
      </div>
    </div>
  </div>
</div>

