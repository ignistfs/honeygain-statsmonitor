

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
$totaldevices=0;
$sq="";
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
	$dnamehash=base64_encode($devicename);
	$crs=$obj1['data'][$i]['stats']['total_credits'];
	$d=date("Y-m-d H:i:s");
	$sq= $sq."INSERT INTO devices (name,crs,date) VALUES('".md5($dnamehash)."','".$crs."','".$d."');";
	switch(true){
		case ($crs <= 50):
		$returnback= $returnback.''.'<div style="border:2px solid #8b0000;" class="indentity'.md5($dnamehash).'" id="device_warp"><span id="name">'.$devicename.'</span><button onclick=\'getstats("'.$dnamehash.'","'.$crs.'","'.md5($dnamehash).'")\' id="viewpr"><span>View progress</span></button><span id="credits">'.$crs.'</span></div>';
		break;
		case ($crs <= 450):
		$returnback= $returnback.''.'<div style="border:2px solid #ffa500;" class="indentity'.md5($dnamehash).'" id="device_warp"><span id="name">'.$devicename.'</span><button onclick=\'getstats("'.$dnamehash.'","'.$crs.'","'.md5($dnamehash).'")\' id="viewpr"><span>View progress</span></button><span id="credits">'.$crs.'</span></div>';

		break;
		case ($crs >= 450):
		$returnback= $returnback.''.'<div style="border:2px solid #228b22;" class="indentity'.md5($dnamehash).'" id="device_warp"><span id="name">'.$devicename.'</span><button onclick=\'getstats("'.$dnamehash.'","'.$crs.'","'.md5($dnamehash).'")\' id="viewpr"><span>View progress</span></button><span id="credits">'.$crs.'</span></div>';

		break;
		
	}


	$i++;
	$totaldevices++;
}
$ipages++;

}
echo '<br><br><h3>Devices ('.$totaldevices.')</h3><br><br>'.$returnback;
$conn->multi_query($sq);

?>