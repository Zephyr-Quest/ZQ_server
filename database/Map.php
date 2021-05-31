<?php

class Map extends DatabaseManager {
    private $id;
    private $name;
    private $author;
    private $is_solvable;
    private $data;
    private $solutions;

    /*
        Example of a 'data' array :
        [
            ["id"=>1,"x"=>0,"y"=>0,"usage"=>[]],
            ...
        ]
    */

    /*
        Example of a 'solutions' array :
        [
            ["x"=>0,"y"=>0],
            ...
        ]
    */

    const TABLE_NAME = "maps";

    function __construct($name, $author, $data, $id = null){
        // Create a map
        $this->name = $name;
        $this->author = $author;
        $this->is_solvable = false;
        $this->data = $data;
        $this->solutions = null;
        $this->id = $id;
    }

    /**
     * Add map to the database
     */
    public function pushToDB(){
        $db = self::dbConnect();
        $add = $db->prepare('INSERT INTO ' . self::TABLE_NAME . '(name, author, data) VALUES(:name, :author, :data)');
        $add->execute([
            'name' => $this->name,
            'author' => $this->author,
            'data' => $this->getJsonData()
        ]);
        $add->closeCursor();
    }

    /**
     * Mark a map as solvable
     */
    public function markAsSolvable(){
        if(is_null($this->id)) throw new Exception("An error is occured during the update...", 500);
        $db = self::dbConnect();
        $update = $db->prepare('UPDATE ' . self::TABLE_NAME . ' SET solvable=1, solutions=:sols WHERE id=:id');
        $update->execute([
            'id' => $this->id,
            'sols' => $this->getJsonSolutions()
        ]);
        $update->closeCursor();
    }

    /**
     * Get a map by its name
     * @param string $name Map name
     * @return Map The found task or null
     */
    public static function getMapByName($name){
        $db = self::dbConnect();
        $query = $db->prepare('SELECT * FROM ' . self::TABLE_NAME . ' WHERE name=?');
        $query->execute([$name]);
        $data = $query->fetch();
        $query->closeCursor();
        if(!isset($data['id'])) return null;
        $map = new Map($data['name'], $data['author'], json_decode($data['data'], true), $data['id']);
        $map->setSolvable($data['solvable'] == 1);
        if(!is_null($data['solutions'])) $map->setSolutions(json_decode($data['solutions']));
        return $map;
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
            $current_map = new Map($map['name'], $map['author'], json_decode($map['data'], true), $map['id']);
            $current_map->setSolvable($map['solvable'] == 1);
            if(!is_null($map['solutions']))
                $current_map->setSolutions(json_decode($map['solutions']));
            array_push($maps, $current_map);
        }
        $query->closeCursor();
        return $maps;
    }

    // Getters
    public function getId(){ return $this->id; }
    public function getName(){ return $this->name; }
    public function getAuthor(){ return $this->author; }
    public function isSolvable(){ return $this->is_solvable; }
    public function getData(){ return $this->data; }
    public function getJsonData(){ return json_encode($this->data); }
    public function getSolutions(){ return $this->solutions; }
    public function getJsonSolutions(){ return json_encode($this->solutions); }

    // Setters
    public function setSolvable($is_solvable){ $this->is_solvable = $is_solvable; }
    public function setSolutions($solutions){ $this->solutions = $solutions; }
}