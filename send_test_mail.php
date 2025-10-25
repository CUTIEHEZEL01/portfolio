<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // If using Composer
// OR use these lines instead if you manually downloaded PHPMailer
// require 'PHPMailer/src/Exception.php';
// require 'PHPMailer/src/PHPMailer.php';
// require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'anjelou.felizarta.15@gmail.com'; // your Gmail
    $mail->Password   = 'yjptboqepdhpepas'; // your Gmail App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    //Recipients
    $mail->setFrom('yoboijanjan30@gmail.com', 'Jan Mailer');
    $mail->addAddress('do.earljan@gmail.com', 'Earl Jan');

    //Content
    $mail->isHTML(true);
    $mail->Subject = '✅ Test PHPMailer';
    $mail->Body    = '<h3>Hello!</h3><p>This is a test mail using <b>PHPMailer</b>.</p>';

    $mail->send();
    echo '✅ Message has been sent successfully';
} catch (Exception $e) {
    echo "❌ Mail error: {$mail->ErrorInfo}";
}
