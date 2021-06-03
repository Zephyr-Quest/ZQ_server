<?php // Show errors
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
?>

<?php
require('database/DatabaseManager.php');
require('database/Map.php');

header('Content-Type: application/json');

// Describe which method for each route
$routes = [
    "/maps" => "GET",
    "/mapByName" => "GET",
    "/newMap" => "POST",
    "/validate" => "POST"
];

// Get all of saved maps
function maps($body){
    $maps = Map::getAllMaps();
    $result = [];
    foreach($maps as $map){
        $map_object = [
            "name" => $map->getName(),
            "author" => $map->getAuthor(),
            "solvable" => $map->isSolvable(),
            "items" => $map->getData(),
            "solutions" => $map->getSolutions()
        ];
        array_push($result, $map_object);
    }
    return json_encode($result);
}

// Get a map by its ID
function mapByName($body){
    if(!isset($_GET['name'])) throw new Exception("Missing argument 'name'", 400);
    $name = htmlspecialchars($_GET['name']);
    $map = Map::getMapByName($name);
    if(is_null($map)) throw new Exception('Not found', 404);
    return json_encode([
        "name" => $map->getName(),
        "author" => $map->getAuthor(),
        "solvable" => $map->isSolvable(),
        "items" => $map->getData(),
        "solutions" => $map->getSolutions()
    ]);
}

// Upload a new map
function newMap($body){
    if(!isset($_GET['name'])) throw new Exception("Missing argument 'name'", 400);
    $name = htmlspecialchars($_GET['name']);
    if(!is_null(Map::getMapByName($name))) throw new Exception("The map '" . $name . "' already exists", 400);
    $author = isset($_GET['author']) ? htmlspecialchars($_GET['author']) : "admin";
    $map = new Map($name, $author, $body);
    $map->pushToDB();
    return '{"response": "OK"}';
}

function validate($body){
    if(!isset($_GET['name'])) throw new Exception("Missing argument 'name'", 400);
    $name = htmlspecialchars($_GET['name']);
    $map = Map::getMapByName($name);
    if(is_null($map)) throw new Exception("The map '" . $name . "' doesn't exist", 400);
    $map->setSolutions($body);
    $map->markAsSolvable();
    return '{"response": "OK"}';
}

try {
    // Get request data
    $method = $_SERVER['REQUEST_METHOD'];
    $body = json_decode(file_get_contents('php://input'), true);
    if(!isset($_SERVER['PATH_INFO'])) {
        // Send 404 error
        throw new Exception("Not found", 404);
    }
    $path = $_SERVER['PATH_INFO'];
    
    // Check request data
    $exists = false;
    foreach ($routes as $current_route => $current_method) {
        if($current_route == $path && $current_method == $method) $exists = true;
    }
    if($exists){
        // Execute the route method
        $response = substr($path, 1)($body);
        http_response_code(200);
        echo $response;
    } else {
        // Send 404 error
        throw new Exception("Not found", 404);
    }

} catch (Exception $e) {
    http_response_code($e->getCode());
    echo '{"error": "' . $e->getMessage() . '"}';
}
