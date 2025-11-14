<?php
$to = "hezelcanales22@gmail.com";          // the recipient (can be same as auth user)
$subject = "XAMPP mail() test";
$message = "Hello from XAMPP mail() - sent at " . date("Y-m-d H:i:s");
$headers = "From: hezelcanales22@gmail.com\r\n";
$headers .= "Reply-To: hezelcanales22@gmail.com\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "Mail sent successfully.";
} else {
    echo "Mail failed to send.";
}
?>
