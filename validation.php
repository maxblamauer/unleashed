<?php

    $name = $_POST['userName'];
    $password = $_POST['password'];

    if ($name === "max" && $password === "1234qwer")
    {
        header('Location: localhost/unleashed/index.html');
    }

?>