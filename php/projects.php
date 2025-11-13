<?php
header('Content-Type: application/json');

// Database connection
$host = "localhost";
$user = "root";
$password = "";
$dbname = "hezel_portfolio";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Get form data
$project_title = $_POST['project_title'] ?? '';
$project_description = $_POST['project_description'] ?? '';
$project_link = $_POST['project_link'] ?? '';
$file = $_FILES['file'] ?? null;

// Validate
if ($project_title === '' || $project_description === '') {
    echo json_encode(["success" => false, "message" => "Title and description are required"]);
    exit;
}

// Handle file upload
$file_path = null;
if ($file && $file['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . '/../uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $targetFile = $uploadDir . basename($file['name']);
    if (move_uploaded_file($file['tmp_name'], $targetFile)) {
        // store relative path in DB
        $file_path = 'uploads/' . basename($file['name']);
    } else {
        echo json_encode(["success" => false, "message" => "File upload failed"]);
        exit;
    }
}

// Insert into database
$stmt = $conn->prepare("
    INSERT INTO projects (project_title, project_description, file, project_link)
    VALUES (?, ?, ?, ?)
");
$stmt->bind_param("ssss", $project_title, $project_description, $file_path, $project_link);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Project uploaded successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Insert failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
