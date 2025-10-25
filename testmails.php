<?php
$to = "do.earljan@gmail.com";
$subject = "Test mail";
$message = "Hello! This is a test mail.";
$headers = "From: anjelou.felizarta.15@gmail.com\r\n";

if(mail($to, $subject, $message, $headers)) {
    echo "Mail sent!";
} else {
    echo "Mail failed";
}
?>