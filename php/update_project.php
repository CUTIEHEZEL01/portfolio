<?php
include 'db.php';

header('Content-Type: application/json');

$id = $_POST['id'] ?? '';
$title = $_POST['project_title'] ?? '';
$description = $_POST['project_description'] ?? '';
$link = $_POST['project_link'] ?? '';
$filePath = '';

if (isset($_FILES['file']) && $_FILES['file']['error'] === 0) {
    $targetDir = "../uploads/";
    $fileName = basename($_FILES['file']['name']);
    $targetFile = $targetDir . $fileName;
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
        $filePath = "uploads/" . $fileName;
    }
}

if (empty($id)) {
    echo json_encode(["success" => false, "message" => "Missing project ID"]);
    exit;
}

$sql = "UPDATE projects SET 
        project_title = ?, 
        project_description = ?, 
        project_link = ?" . 
        ($filePath ? ", file = ?" : "") . 
        " WHERE id = ?";

$stmt = $conn->prepare($sql);
if ($filePath) {
    $stmt->bind_param("ssssi", $title, $description, $link, $filePath, $id);
} else {
    $stmt->bind_param("sssi", $title, $description, $link, $id);
}

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Project updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Update failed"]);
}

$stmt->close();
$conn->close();
?>
