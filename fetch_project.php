<?php
// fetch_projects.php
require_once 'db_connection.php';

try {
    $sql = "SELECT * FROM projects ORDER BY created_at DESC";
    $stmt = $pdo->query($sql);
    $projects = $stmt->fetchAll();
    
    if (empty($projects)) {
        echo '<p style="text-align:center; color:#888;">No projects yet. Add your first project!</p>';
    } else {
        foreach ($projects as $project) {
            ?>
            <div class="project-card">
                <?php if ($project['file_path']): ?>
                    <img src="<?= htmlspecialchars($project['file_path']) ?>" alt="<?= htmlspecialchars($project['project_title']) ?>">
                <?php endif; ?>
                
                <h3><?= htmlspecialchars($project['project_title']) ?></h3>
                <p><?= htmlspecialchars($project['project_description']) ?></p>
                
                <?php if ($project['project_link']): ?>
                    <a href="<?= htmlspecialchars($project['project_link']) ?>" target="_blank">View Project</a>
                <?php endif; ?>
                
                <div class="project-actions">
                    <button onclick="viewProject(<?= $project['id'] ?>)">View</button>
                    <button onclick="editProject(<?= $project['id'] ?>)">Edit</button>
                    <button onclick="deleteProject(<?= $project['id'] ?>)">Delete</button>
                </div>
            </div>
            <?php
        }
    }
} catch(Exception $e) {
    echo '<p style="color:red;">Error loading projects: ' . htmlspecialchars($e->getMessage()) . '</p>';
}
?>