<?php
header("Content-Type: application/json; charset=UTF-8");

$connect = new PDO("mysql:host=localhost;dbname=000760618", "000760618", "19930324"); 

$news_id = $_GET["news_id"];

if ($news_id > 0) 
{
    $stmt = $connect->prepare("SELECT * FROM NewsTable WHERE news_id > ?");
 } 
 else 
 {
    $stmt = $connect->prepare("SELECT * FROM NewsTable");
 }
// $stmt->bind_param();
$stmt->execute(array($news_id));
// $result = $stmt->get_result();
$output = $stmt->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($output);

?>