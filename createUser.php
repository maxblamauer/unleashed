<?php
// I, Max Blamauer, 000760618 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// unless explicitly stated otherwise
session_start(); // Starts the Session

header("Content-Type: application/json; charset=UTF-8");

$connect = new PDO("mysql:host=localhost;dbname=000760618", "000760618", "19930324"); 
$stmt = $connect->prepare("SELECT * FROM UserTable WHERE userName = ? and password = ?");
$userName = $_POST["userName"];
$password = $_POST["password"];

$stmt->execute(array($userName, $password));

$output = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Ensures proper login
if (sizeof($output) > 0)
{
    $_SESSION["userName"] = $_POST["userName"];  
    $_SESSION["is_authenticated"] = true;
    $successful = [
        "status" => "sucessful"
    ];
    echo json_encode($successful);
    //header('Location: /~000760618/private/10065/a3/menu.php');
}
else
{
    // If invalid it ends session
    session_unset();
    session_destroy();
    $successful = [
        "status" => "unsuccessful"
    ];
    echo json_encode($successful);
}


?>