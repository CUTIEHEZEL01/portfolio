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

$result = $conn->query("SELECT * FROM projects ORDER BY created_at DESC");
$projects = [];

while ($row = $result->fetch_assoc()) {
    $projects[] = $row;
}

echo json_encode(["success" => true, "projects" => $projects]);

$conn->close();
?>
