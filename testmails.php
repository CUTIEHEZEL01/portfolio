<?php
$to = "";
$subject = "Test mail";
$message = "Hello! This is a test mail.";
$headers = "From: hezelcanales22@gmail.com'\r\n";

if(mail($to, $subject, $message, $headers)) {
    echo "Mail sent!";
} else {
    echo "Mail failed";
}
?>