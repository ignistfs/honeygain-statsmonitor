<?php
require_once('db.php');
require_once('config.php');

$query1 = "SELECT id FROM devices";
$result1 = mysqli_query($conn, $query1);
$sq01=$conn->query($query1);
if($sq01 === true) {
//
}
else{
$conn->query("CREATE TABLE IF NOT EXISTS devices (
                id     INT(255) AUTO_INCREMENT PRIMARY KEY,
                name   VARCHAR (255)        DEFAULT NULL,
                crs int (255)        DEFAULT NULL,
                date VARCHAR (400)        DEFAULT NULL

            )");
}


$ch = curl_init('https://dashboard.honeygain.com/api/v1/devices');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    $auth,
));
$response = curl_exec($ch);
curl_close($ch);
$obj=json_decode($response,true);
$totalpages= $obj['meta']['pagination']['total_pages'];
$ipages=1;
$totaldevicesoffline=0;
$returnback="";
while($ipages <= $totalpages){
$ch1 = curl_init('https://dashboard.honeygain.com/api/v1/devices?page='.$ipages);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch1, CURLOPT_HTTPHEADER, array(
    $auth,
));
$response1 = curl_exec($ch1);
curl_close($ch1);
$obj1=json_decode($response1,true);
$totalitemsonpage=count($obj1['data']);
$i=0;
while($totalitemsonpage > $i){
	$devicename=$obj1['data'][$i]['title'];
	$dnamehash=md5(base64_encode($devicename));
	$crs=$obj1['data'][$i]['stats']['total_credits'];
  $newcr=mysqli_fetch_assoc($conn->query("SELECT crs FROM devices WHERE name = '$dnamehash' ORDER BY id DESC LIMIT 1;"));
  $oldcr=mysqli_fetch_assoc($conn->query("SELECT crs FROM devices WHERE name = '$dnamehash' ORDER BY id DESC LIMIT 1,1;"));
  if($newcr == $oldcr){
    $returnback= $returnback.'<div class="error">The device with the name <b><i>'.$devicename.'</i></b> seems to be offline, please check it!</div>';
    $totaldevicesoffline++;
  }else{
    
  }
	


	$i++;
}
$ipages++;

}
if($totaldevicesoffline == 0){
	echo '0';
}
else{
echo $returnback;
}

?>