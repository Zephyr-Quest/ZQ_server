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
    $user = new User($username, null);
    $user->pushToDB();
}

$_SESSION['username'] = $user->getUsername();
$_SESSION['last_time'] = $user->getLastTime();
header('Location: launcher.php');