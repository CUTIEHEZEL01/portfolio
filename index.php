<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hezel Canales - Creative Portfolio</title>

  <!-- Combine All CSS -->
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/login.css">
  <link rel="stylesheet" href="css/dashboard.css">
  <link rel="stylesheet" href="css/about.css">
  <link rel="stylesheet" href="css/project.css">
  <link rel="stylesheet" href="css/contact.css">
</head>
<body>

  <?php include 'main/login.php'; ?>
  <?php include 'main/dashboard.php';?>
  <?php include 'main/about.php'; ?>
  <?php include 'main/project.php'; ?>
  <?php include 'main/contact.php';?>

  <?php include'php/db.php'; ?>


<script src="js/dashboard.js"></script>
<script src="js/login.js"></script>
<script src="js/about.js"></script>
<script src="js/contact.js"></script>

</body>
</html>
