<?php
session_start();
if(!isset($_SESSION['username'])) {
    header('Location: index.html');
    return;
}
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Page d'accueil</title>
    </head>
    <body>
        <h1>Bienvenue <?= $_SESSION['username'] ?> !</h1>
        <?php if(is_null($_SESSION['last_time'])): ?>
        <p>Vous n'avez pas encore joué</p>
        <?php else: ?>
        <p>Votre dernier temps de partie est <?= $_SESSION['last_time'] ?></p>
        <?php endif; ?>
        <form action="upload_stats.php" method="POST">
            <input type="hidden" name="last_time" value="100" />
            <input type="submit" value="Envoyer les statistiques" title="Envoyer les statistiques" />
        </form>
        <br>
        <br>
        <a href="logout.php" title="Se déconnecter">Se déconnecter</a>
    </body>
</html>