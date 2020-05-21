<?php

$servername = "localhost"; //db server
$username = "user"; //db user
$password = "pass"; //db pass
$db='db'; //db name

// Create connection
$conn = new mysqli($servername, $username, $password,$db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

