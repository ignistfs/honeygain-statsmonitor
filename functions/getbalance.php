<?php
require_once('db.php');
require_once('config.php');
$ch = curl_init('https://dashboard.honeygain.com/api/v1/users/balances');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    $auth,
));
$response = curl_exec($ch);
curl_close($ch);
$obj=json_decode($response,true);
$total=round($obj['data']['payout']['credits'] / 1000,2);
$today=round($obj['data']['realtime']['credits'] / 1000,2);
$responsedata = array();
array_push($responsedata,$total);
array_push($responsedata,$today);

print json_encode($responsedata);

?>