<?php
session_start(); // Starts the Session

// I, Max Blamauer, 000760618 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// unless explicitly stated otherwise

// Ensures proper login
if ($_POST["userid"] === "MaxB" and $_POST["password"] === "maxspassword") 
{
    $_SESSION["userid"] = $_POST["userid"];  
    $_SESSION["is_authenticated"] = true;
    header('Location: /~000760618/private/10065/a3/menu.php');
}
else
{
    // If invalid it ends session
    session_unset();
    session_destroy();
    header('Location: /~000760618/private/10065/a3/index.html');
}


?>