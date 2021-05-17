<?php

class Map extends DatabaseManager {
    private $id;
    private $name;
    private $data;

    const TABLE_NAME = "maps";

    function __construct($name, $data, $id = null){
        $this->name = $name;
        $this->data = $data;
        $this->id = $id;
    }

    /**
     * Add map to the database
     */
    // public function pushToDB(){
    //     $db = self::dbConnect();
    //     $add = $db->prepare('INSERT INTO ' . self::TABLE_NAME . '(name, data) VALUES(:name, :data)');
    //     $add->execute([
    //         'name' => $this->name,
    //         'data' => getStrData(),
    //     ]);
    //     $add->closeCursor();
    // }

    // Getters
    public function getId(){ return $this->id; }
    public function getName(){ return $this->name; }
    public function getData(){ return $this->data; }
    public function getStrData(){
        /*
        Example of a data array :
        [["x"=>0,"y"=>0,"texture"=>"hole","can_hover"=>true,"can_kill"=>true,"can_use"=>false,"can_open"=>false],...]
        */
        return json_encode($this->data);
    }

    // Setters
    public function setName($name){ $this->name = $name; }
    public function setData($data){ $this->data = $data; }

}