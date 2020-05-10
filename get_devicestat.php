<?php

include('db.php');

$name=mysqli_real_escape_string($conn,$_GET['name']);
$sq=$conn->query("SELECT * FROM devices WHERE name = '".$name."' ORDER BY id ASC");
$rows = array();
while($r = mysqli_fetch_assoc($sq)) {
    $rows[] = $r;
}
print json_encode($rows);

?>