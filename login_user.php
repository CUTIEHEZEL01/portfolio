<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$password = "";
$dbname = "my_portfolio"; // change this to match your DB

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

$email = $_POST['email'] ?? '';
$passwordInput = $_POST['password'] ?? '';

if ($email === '' || $passwordInput === '') {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

// Find user
$stmt = $conn->prepare("SELECT full_name, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 1) {
    $stmt->bind_result($fullName, $hashedPassword);
    $stmt->fetch();

    if (password_verify($passwordInput, $hashedPassword)) {
        echo json_encode(["success" => true, "fullName" => $fullName]);
    } else {
        echo json_encode(["success" => false, "message" => "Incorrect password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$stmt->close();
$conn->close();
