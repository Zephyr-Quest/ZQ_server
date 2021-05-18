<?php // Show errors
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
?>

<?php
require('database/DatabaseManager.php');
require('database/User.php');

session_start();
if(!isset($_POST['username'])) {
    header('Location: index.html');
    return;
}

$username = htmlspecialchars($_POST['username']);
$user = User::getUserByUsername($username);

if(is_null($user)){
    // Create the user in the database
    $user = new User($username);
    $user->pushToDB();
}

$_SESSION['username'] = $user->getUsername();
header('Location: launcher.php');