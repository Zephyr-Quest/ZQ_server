<?php

class Map extends DatabaseManager {
    private $id;
    private $name;
    private $data;

    /*
        Example of a data array :
        [
            ["x"=>0,"y"=>0,"texture"=>"hole","can_hover"=>true,"can_kill"=>true,"can_use"=>false,"can_open"=>false],
            ...
        ]
    */

    const TABLE_NAME = "maps";

    function __construct($name, $data, $id = null){
        // Create a map
        $this->name = $name;
        $this->data = $data;
        $this->id = $id;
    }

    /**
     * Add map to the database
     */
    public function pushToDB(){
        $db = self::dbConnect();
        $add = $db->prepare('INSERT INTO ' . self::TABLE_NAME . '(name, data) VALUES(:name, :data)');
        $add->execute([
            'name' => $this->name,
            'data' => $this->getJsonData()
        ]);
        $add->closeCursor();
    }

    /**
     * Get a map by its ID
     * @param int $id Map id
     * @return Map The found task or null
     */
    public static function getMapById($id){
        $db = self::dbConnect();
        $query = $db->prepare('SELECT * FROM ' . self::TABLE_NAME . ' WHERE id=?');
        $query->execute([$id]);
        $data = $query->fetch();
        $query->closeCursor();
        return isset($data['id']) ? new Map($data['name'], json_decode($data['data'], true), $data['id']) : null;
    }

    /**
    * Get all of saved maps
    * @return Map[] An array of Map
    */
    public static function getAllMaps(){
        $db = self::dbConnect();
        $query = $db->query('SELECT * FROM ' . self::TABLE_NAME);
        $maps = [];
        while($map = $query->fetch()){
            array_push($maps, new Map($map['name'], json_decode($map['data'], true), $map['id']));
        }
        $query->closeCursor();
        return $maps;
    }

    // Getters
    public function getId(){ return $this->id; }
    public function getName(){ return $this->name; }
    public function getData(){ return $this->data; }
    public function getJsonData(){ return json_encode($this->data); }
}