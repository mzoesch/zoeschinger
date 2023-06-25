<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='icon' href='favicon.ico' />

    <title>System Information</title>
</head>

<body>

    <?php

    echo $_SERVER['HTTP_USER_AGENT'];
    phpinfo();

    ?>

</body>

</html>