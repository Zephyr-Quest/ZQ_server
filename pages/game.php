<?php
session_start();
if(!isset($_SESSION['username'])) {
    header('Location: ../index.html');
    return;
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZEPHYR QUEST</title>
    <meta name="description" content="Welcome in our one-line play">
    <meta name="author" content="Thomas RAFFRAY">
    <link rel="stylesheet" href="../CSS/styleGame.css">


    <!-- Ajouter les logos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />

    <!--police-->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=KoHo:wght@300&display=swap" rel="stylesheet">

    <link rel="icon" type="image/png" sizes="16x16" href="../img/logo2-removebg-preview.png">
</head>

<body>
    <!--barre du haut-->

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
                        <section>
                            <button id="maker_button" class="bouton2">MAKE</button>
                        </section>
                    </td>
                </tr>
            </table>
        </section>
    </section>

    <div id="bouton_commande" class="bouton_commande">
        <section class="play">
            <i title="Play" id="play_button" class="far fa-play-circle"></i><br>
        </section>
        <section class="pause">
            <i title="Pause" id="pause_button" class="far fa-pause-circle"></i><br>
        </section>
        <section class="reset">
            <i title="Reset Map" id="reset_button" class="fas fa-redo-alt"></i><br>
        </section>
        <section class="clue">
            <i title="Clue" id="giveClue" class="fas fa-key"></i>
        </section>
        <section class="modenightday">
            <i title="Day/Night Mode" id="daynight" class="fas fa-sun"></i>
        </section>
        <section class="musiconoff">
            <i title="Mute/Sounds" id="cut_volume" class="fas fa-volume-up"></i>
        </section>
        <section class="change_map">
        <a href="created.php" style="text-decoration:none;color:white"><i title="Change Map" class="fas fa-list"></i></a>
        </section>
    </div>

    <section class="fond_jeu">
        <canvas id="myCanvas" width="1500" height="1500">
                Your browser does not supsport the HTML canvas tag.</canvas>
        <canvas id="obstacles" width="1500" height="1500">
                    Your browser does not support the HTML canvas tag.</canvas>
    </section>
    <section id="bottom_line" class="bottom_line">
        <table>
            <tr>
                <td id='timer' class="timer">
                    <p>00:00</p>
                </td>
            </tr>
            <tr>
                <td id="r_shots" class="r_shots">
                    <p>Remaining Shots : 0</p>

                </td>
            </tr>
        </table>
    </section>

    <!-- !CREATION PANEL-->

    <div id="container_make" class="container_make">
        <img id="add_button" title="Lever" src="../img/obstacles/Button_close.png" alt="">
        <img id="add_door" title="Door" src="../img/obstacles/Door_closedX.png" alt="">
        <img id="add_hole" title="Hole" src="../img/obstacles/Hole.png" alt="">
        <img id="add_torch" title="Torch" src="../img/obstacles/Torche.png" alt="">
        <img id="add_wall" title="Wall" src="../img/obstacles/Wall.png" alt="">
        <i class="fas fa-minus"></i>
        <img id="erase" title="Erase" src="../img/gomme.png" alt="">
        <img id="resetMaker" title="Reset" src="../img/reset_button.png" alt="">
        <img id="disquette" title="Save Map" src="../img/disquette.ico" alt="">
    </div>
    <div id="instructions" class="instructions_maker">
        <ul>
            <li>Place obstacles using the panel on the left of the game platform.</li><br>
            <li>To create a door and its activator (lever), first place one or more doors and place a lever, the doors will be highlighted and you can click on each of the doors you want to link to this lever. To exit this "link edition" mode, simply click
                on the lever you have placed.</li><br>
            <li>You can reset what you have created by clicking on the arrow at the bottom left of the panel.</li><br>
            <li>You can erase what you have created by clicking on the eraser at the bottom left of the panel.</li><br>
            <li>You can save the map you have created, and store it online so you can play it later.</li>
        </ul>
    </div>

    <div id=gamewin>
        <span id="title_win">WELL DONE !</span>
        <br><br>
        <div>
            <button onclick="document.location.href='created.php';" id="leavethegame">LEAVE</button>
            <button onclick="document.getElementById('gamewin').style.display='none';reset()">REPLAY</button>
        </div>
    </div>
    <div id=gamelost>
        GAME LOST !
    </div>
    <div id=askForSave> SAVE THE MAP :<br><br>

        <input id="nameOfMap" type="text" placeholder="Name">
        <div>
            <button id="save_save">Save</button>
            <button id="cancel_save">Cancel</button>
        </div>
    </div>
    <!-- !AUDIO -->
    <audio autoplay loop id="bruits_divers" style="display:none" src="../JS/Musics/Bruits_divers.mp3"></audio>
    <audio style="display:none" id="bruits_pas_1" src="../JS/Musics/Bruits_pas_1.wav"></audio>
    <audio style="display:none" id="bruits_pas_2" src="../JS/Musics/Bruits_pas_2.wav"></audio>
    <audio style="display:none" id="engrenage" src="../JS/Musics/Bruit_engrenages.wav"></audio>
    <audio style="display:none" id="porte" src="../JS/Musics/Porte_proche.wav"></audio>
    <audio style="display:none" id="torche_prise" src="../JS/Musics/Torche.wav"></audio>
    <audio loop style="display:none" id="music" src="../JS/Musics/Music.wav"></audio>

    <!-- !ANIMATIONS -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="../JS/api.js"></script>
    <script src="../JS/maker.js"></script>
    <script src="../JS/obstacles.js">
    </script>
    <script src="../JS/tools.js"></script>
    <script src="../JS/background.js"></script>
    <script src="../JS/mode.js">
    </script>
    <script src="../JS/main.js"></script>
    <script src="../JS/animation.js"></script>

    <footer>
        <section class="groupe">
            <p><a href="mentionslegales.html">Declemy Maxime &#x2759 Delebecque Martin &#x2759 Marquant Enguerrand &#x2759 Mullier Tom &#x2759 Raffray Thomas &#x2759 Van Boxem Rémi</a></p>
        </section>
    </footer>

    <input type="hidden" name="username" id="username_field" value="<?= $_SESSION['username'] ?>" />

</body>

</html>