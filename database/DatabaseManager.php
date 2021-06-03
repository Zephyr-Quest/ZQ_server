<?php
require('Credentials.php');

/**
 * A class to manage the database
 */
abstract class DatabaseManager
{
    const DB_HOST = "localhost";
    const DB_NAME = "zephyrquest";
    const DB_USERNAME = Credentials::DB_USERNAME;
    const DB_PASSWORD = Credentials::DB_PASSWORD;

    /**
    * Connect to the database and return it
    * @return PDO The database
    */
    public static function dbConnect(){
    	$db = new PDO('mysql:host=' . self::DB_HOST . ';dbname=' . self::DB_NAME . ';charset=utf8', self::DB_USERNAME, self::DB_PASSWORD);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	return $db;
    }
}
