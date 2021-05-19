<?php // Show errors
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
?>

<?php
require('database/DatabaseManager.php');
require('database/Map.php');

// Describe which method for each route
$routes = [
    "/maps" => "GET",
    "/mapById" => "GET",
    "/newMap" => "POST"
];

// Get all of saved maps
function maps($body){
    $maps = Map::getAllMaps();
    $result = [];
    foreach($maps as $map){
        $map_object = [
            "name" => $map->getName(),
            "author" => $map->getAuthor(),
            "items" => $map->getData()
        ];
        array_push($result, $map_object);
    }
    return json_encode($result);
}

// Get a map by its ID
function mapById($body){
    $id = htmlspecialchars($_GET['id']);
    if(!ctype_digit($id)) throw new Exception('ID must be a numeric value', 400);
    $id = (int) $id;
    $map = Map::getMapById($id);
    if(is_null($map)) throw new Exception('Not foud', 404);
    return $map->getJsonData();
}

// Upload a new map
function newMap($body){
    $name = htmlspecialchars($_GET['name']);
    $author = isset($_GET['author']) ? htmlspecialchars($_GET['author']) : "admin";
    $map = new Map($name, $author, $body);
    $map->pushToDB();
    return 'OK';
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
        header('Content-Type: application/json');
        echo $response;
    } else {
        // Send 404 error
        throw new Exception("Not found", 404);
    }

} catch (Exception $e) {
    http_response_code($e->getCode());
    echo '{"error": "' . $e->getMessage() . '"}';
    header('Content-Type: application/json');
}
