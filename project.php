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
      <button type="submit">Upload</button>
    </form>

    <!-- Project List -->
    <div class="grid" id="projectList"></div>
  </div>
</div>
