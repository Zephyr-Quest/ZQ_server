<?php

/**
 * Class to represent a user
 */
class User extends DatabaseManager
{
    private $id;
    private $username;

    const TABLE_NAME = "users";

    function __construct($username, $id = null){
        $this->username = $username;
        $this->id = $id;
    }

    /**
    * Upload the new user to the database
    */
    public function pushToDB(){
        $db = self::dbConnect();
        $add = $db->prepare('INSERT INTO ' . self::TABLE_NAME . '(username) VALUES(:username)');
        $add->execute([
            'username' => $this->username
        ]);
        $add->closeCursor();
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
        return isset($data['id']) ? new User($data['username'], $data['id']) : null;
    }

    // Getters
    public function getId(){ return $this->id; }
    public function getUsername(){ return $this->username; }
}
