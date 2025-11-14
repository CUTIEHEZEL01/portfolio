<?php

$host = "db.fr-pari1.bengt.wasmernet.com";
$user = "6dc17f3a74cb80007f5945cc4e24";
$password = "06916dc1-7f3a-7642-8000-e797d273ba74";
$dbname = "hezel_portfolio";
$port = 10272;

$conn = new mysqli($host, $user, $password, $dbname, $port);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

?>
