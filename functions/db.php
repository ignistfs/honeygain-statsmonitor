<?php
error_reporting(1);
$servername = "localhost"; //edit this with your database server, localhost for 000webhost and local machines
$username = "username"; //edit this with your database username
$password = "passwd"; //edit this with your database password
$db='dbname'; //edit this with your database name

// Create connection
$conn = new mysqli($servername, $username, $password,$db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
