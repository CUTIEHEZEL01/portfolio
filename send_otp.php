<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer
require 'vendor/autoload.php'; // if installed via Composer
// OR if downloaded manually:
// require 'PHPMailer/src/Exception.php';
// require 'PHPMailer/src/PHPMailer.php';
// require 'PHPMailer/src/SMTP.php';

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (empty($_POST['email'])) {
        echo json_encode(["success" => false, "message" => "No email provided"]);
        exit;
    }

    $email = $_POST['email'];
    $otp = rand(100000, 999999);

    // Configure PHPMailer
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'hezelcanales22@gmail.com'; // your Gmail
        $mail->Password   = 'adsrvcigtegzvpkl'; // your app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Sender & recipient
        $mail->setFrom('yoboijanjan30@gmail.com', 'Jan Mailer');
        $mail->addAddress($email);

        // Message
        $mail->isHTML(true);
        $mail->Subject = 'Your OTP Code';
        $mail->Body    = "<h3>Hello!</h3><p>Your OTP is: <b>$otp</b></p>";

        // Send email
        $mail->send();

        // ✅ Success — return JSON
        echo json_encode(["success" => true, "otp" => $otp]);

    } catch (Exception $e) {
        // ❌ Failed — log and return error
        error_log("Mail error for $email: " . $mail->ErrorInfo);
        echo json_encode(["success" => false, "message" => "Mailer Error: " . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
