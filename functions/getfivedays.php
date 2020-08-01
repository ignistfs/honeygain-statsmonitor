<?php
require_once('db.php');
require_once('config.php');
$ch = curl_init('https://dashboard.honeygain.com/api/v1/dashboards/traffic_stats');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    $auth,
));
$response = curl_exec($ch);
curl_close($ch);
$obj=json_decode($response,true);

$day=$obj['data']['traffic_stats'];

$day[4]=($obj['data']['traffic_stats']['29']['traffic']) / 10000000;
$day[3]=($obj['data']['traffic_stats']['28']['traffic']) / 10000000;
$day[2]=($obj['data']['traffic_stats']['27']['traffic'])/ 10000000;
$day[1]=($obj['data']['traffic_stats']['26']['traffic']) / 10000000;
$day[0]=($obj['data']['traffic_stats']['25']['traffic'])/ 10000000;
$responsedata = array();
$responsedata['total_days']=$day[4] + $day[3] + $day[2] + $day[1] + $day[0];
$responsedata['days_values']=[];
for($i=0;$i <= 4 ;$i++){

	array_push($responsedata['days_values'],$day[$i]);

}
print json_encode($responsedata);

?>