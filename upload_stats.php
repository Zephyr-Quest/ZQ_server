<?php
require('database/DatabaseManager.php');
require('database/User.php');
session_start();

// Get the current user
$username = $_SESSION['username'];
$user = User::getUserByUsername($username);
if(is_null($user)) {
    header('Location: index.html');
    return;
}

// Get stats
if(!isset($_POST['last_time'])){
    header('Location: launcher.php');
    return;
}
$last_time = htmlspecialchars($_POST['last_time']);
if(!ctype_digit($last_time)){
    header('Location: launcher.php');
    return;
}
$last_time = (int) $last_time;

$user->setLastTime($last_time);
$user->update();
$_SESSION['last_time'] = $last_time;
header('Location: launcher.php');