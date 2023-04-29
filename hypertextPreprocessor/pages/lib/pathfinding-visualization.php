<?php

include 'utils/autoloader.php';

?>

<div class='nav'>
    <div style='color: white;'>
        <h1 style='margin: 0rem;'>Pathfinding Visualization</h1>
    </div>
    <div style='color: white;'>Some configuration</div>
</div>

<?php

$columns = 0;

if (isset($_POST['w']) && isset($_POST['h'])) {
    $w = $_POST['w'];
    $h = $_POST['h'];

    $grid = new PathFindingVisualizationGrid($w, $h);
}

?>

<div class="wrapper" id="wrapper" style="--columns: <?php echo $grid->getFlooredColumns(); ?>;">

    <?php

    if ($grid->getFlooredColumns() < 1 || $grid->getFlooredRows() < 1) {
        echo 'Error: No width or height was sent.';

        return;
    }

    for ($i = 0; $i < $grid->getQuantity(); $i++) {
        echo "
        <div
            onClick = 'this.style.backgroundColor = \"black\";'
        >
        </div>";
    }

    ?>

</div>

<div class="footer">
    <div>
        <p> ©2023 Magnus Zoeschinger(mzoesch).All rights reserved. < /p>
    </div>
</div>