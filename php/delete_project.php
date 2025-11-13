<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$password = "";
$dbname = "hezel_portfolio";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

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
