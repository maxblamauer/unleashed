<?php
session_start(); // Starts the Session

// I, Max Blamauer, 000760618 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// unless explicitly stated otherwise

    // Logs out the user
    session_unset();
    session_destroy();
    header('Location: /~000760618/private/10065/a3/index.html');



?>
