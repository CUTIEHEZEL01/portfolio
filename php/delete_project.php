<?php

include 'db.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode(["success" => false, "message" => "Missing project ID"]);
    exit;
}

$id = intval($data['id']);
$sql = "DELETE FROM projects WHERE id = $id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Project deleted successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete project"]);
}

$conn->close();
