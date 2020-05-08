<?php

$servername = "localhost"; //db server
$username = "root"; //db user
$password = ""; //db pass
$db='updates'; //db name

// Create connection
$conn = new mysqli($servername, $username, $password,$db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

