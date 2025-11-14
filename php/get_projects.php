<?php
include 'db.php';

header('Content-Type: application/json');

$result = $conn->query("SELECT * FROM projects ORDER BY created_at DESC");
$projects = [];

while ($row = $result->fetch_assoc()) {
    $projects[] = $row;
}

echo json_encode(["success" => true, "projects" => $projects]);

$conn->close();
?>
