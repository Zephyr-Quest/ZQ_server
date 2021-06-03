<?php
require('../database/DatabaseManager.php');
require('../database/Map.php');
$maps = Map::getAllMaps();
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZEPHYR QUEST</title>
    <meta name="description" content="Welcome in our one-line play">
    <meta name="author" content="Thomas RAFFRAY">
    <link rel="stylesheet" href="style_created.css">


    <!-- Ajouter les logos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />

    <!--police-->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=KoHo:wght@300&display=swap" rel="stylesheet">

    <link rel="icon" type="image/png" sizes="16x16" href="../img/logo2-removebg-preview.png">
</head>

<body>
    <header>
        <!--barre du haut-->
        <section class="rectangle">
            <p> </p>
        </section>
        <section class="barre_haut">
            <section class="logo">
                <a href="../index.html"><img src="../img/logo22.PNG.jpg" height="100" alt="Logo"> </a>
            </section>
            <section class="barre2">

                <table>
                    <tr>
                        <td>
                            <section class="bouton1">
                                <a href="rules.html">RULES</a>
                            </section>
                        </td>
                        <td>
                            <section class="bouton1">
                                <a href="contact.html ">CONTACT US</a>
                            </section>
                        </td>
                        <td>
                            <section class="bouton2">
                                <a href="niveau.html ">PLAY</a>
                            </section>
                        </td>
                    </tr>
                </table>
            </section>
        </section>
    </header>

    <main>
        <section class="main_create">
            <section class="created_titre">
                <h1>CREATED MAPS</h1>
            </section>

            <?php foreach($maps as $map): ?>
            <?php if($map->isSolvable()): ?>
                <a href="game.php?map_name=<?= $map->getName(); ?>">
                    <section class="map_perso">
                        <section class="nom_map">
                            <p><?= $map->getName(); ?></p>
                        </section>
                        <section class="nom_mec">
                            <p><?= $map->getAuthor(); ?></p>
                        </section>
                    </section>
                </a>
            <?php endif; ?>
            <?php endforeach; ?>

        </section>

    </main>

    <footer>
        <section class="groupe">
            <p><a href="mentionslegales.html">Declemy Maxime &#x2759 Delebecque Martin &#x2759 Marquant Enguerrand &#x2759 Mullier Tom &#x2759 Raffray Thomas &#x2759 Van Boxem Rémi</a></p>
        </section>
    </footer>

</body>

</html>