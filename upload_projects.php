<?php
// upload_project.php
require_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $project_title = $_POST['project_title'] ?? '';
        $project_description = $_POST['project_description'] ?? '';
        $project_link = $_POST['project_link'] ?? '';
        
        // Handle file upload
        $file_path = null;
        if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
            $upload_dir = 'uploads/';
            
            // Create uploads directory if it doesn't exist
            if (!is_dir($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }
            
            $file_name = time() . '_' . basename($_FILES['file']['name']);
            $target_file = $upload_dir . $file_name;
            
            if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
                $file_path = $target_file;
            }
        }
        
        // Insert into database
        $sql = "INSERT INTO projects (project_title, project_description, file_path, project_link) 
                VALUES (:title, :description, :file_path, :link)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':title' => $project_title,
            ':description' => $project_description,
            ':file_path' => $file_path,
            ':link' => $project_link
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Project added successfully!']);
        
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>