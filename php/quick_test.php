<?php
// quick_test.php
$host = 'localhost';
$dbname = 'hezel_portfolio';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    echo "✅ SUCCESS! Connected to database!";
} catch(PDOException $e) {
    echo "❌ FAILED: " . $e->getMessage();
}
?>