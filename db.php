<?php
error_reporting(1);
$servername = "localhost"; //db server
$username = "username"; //db user
$password = "passwd"; //db pass
$db='dbname'; //db name

// Create connection
$conn = new mysqli($servername, $username, $password,$db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
