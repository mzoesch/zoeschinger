<?php

include 'lib/utils/autoloader.php';

?>

<!DOCTYPE html>
<html lang='en'>

<head>
    <meta charset='UTF-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <link rel='icon' href='favicon.ico' />

    <link rel='stylesheet' href='styles/globals.css' />
    <link rel='stylesheet' href='styles/text_styles.css' />
    <link rel='stylesheet' href='styles/pathfindingVisualization.css' />

    <title>Pathfinding Visualization - Zoeschinger</title>

</head>

<body style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">
    <main>
        <div id='response'></div>
        <script type='text/javascript'>
            function getWindowSize() {
                const w = window.document.documentElement.clientWidth;
                const h = window.document.documentElement.clientHeight;

                const ajax = new XMLHttpRequest();
                ajax.open('POST', '/lib/pathfinding-visualization.php', true);
                ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                ajax.onreadystatechange = function() {
                    if (ajax.readyState === 4 && ajax.status === 200)
                        document.getElementById('response').innerHTML = ajax.responseText;
                    else
                        document.getElementById('response').innerHTML = 'Error: ' + ajax.status;
                };

                const params = 'w=' + w + '&h=' + h;
                ajax.send(params);

                return;
            }

            // window.addEventListener('resize', getWindowSize);
            getWindowSize();
        </script>
    </main>
</body>

</html>