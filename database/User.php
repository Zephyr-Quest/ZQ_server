<?php

/**
 * Class to represent a user
 */
class User extends DatabaseManager
{
    private $id;
    private $username;
    private $last_time;

    const TABLE_NAME = "users";

    function __construct($username, $last_time, $id = null){
        $this->username = $username;
        $this->last_time = $last_time;
        $this->id = $id;
    }

    /**
    * Upload the new user to the database
    */
    public function pushToDB(){
        $db = self::dbConnect();
        $add = $db->prepare('INSERT INTO ' . self::TABLE_NAME . '(username, last_time) VALUES(:username, :last_time)');
        $add->execute([
            'username' => $this->username,
            'last_time' => $this->last_time
        ]);
        $add->closeCursor();
    }

    /**
    * Update the user to the database
    */
    public function update(){
        $db = self::dbConnect();
        $edit = $db->prepare('UPDATE ' . self::TABLE_NAME . ' SET last_time=:last_time WHERE username=:username');
        $edit->execute([
            'username' => $this->username,
            'last_time' => $this->last_time
        ]);
        $edit->closeCursor();
    }

    /**
    * Get an user by his username
    * @param string $usermane User's name
    * @return User User object representing the wanted user
    */
    public static function getUserByUsername($username){
        $db = self::dbConnect();
        $query = $db->prepare('SELECT * FROM ' . self::TABLE_NAME . ' WHERE username=?');
        $query->execute([$username]);
        $data = $query->fetch();
        $query->closeCursor();
        return isset($data['id']) ? new User($data['username'], $data['last_time'], $data['id']) : null;
    }

    // Getters
    public function getId(){ return $this->id; }
    public function getUsername(){ return $this->username; }
    public function getLastTime(){ return $this->last_time; }

    // Setters
    public function setLastTime($last_time){ $this->last_time = $last_time; }
}
