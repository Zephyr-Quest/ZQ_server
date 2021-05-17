<?php // Show errors
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
function test(){
    http_response_code(200);
    header('Content-Type: application/json');
    echo 'test';
}
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
    $map = new Map("test", [["x"=>0,"y"=>0,"texture"=>"hole","can_hover"=>true,"can_kill"=>true,"can_use"=>false,"can_open"=>false]]);
    return $map->getStrData();
}

// Get a map by its ID
function mapById($body){
    
}

// Upload a new map
function newMap($body){
    
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
    // http_response_code($e->getCode());
    // echo '{"error": "' . $e->getMessage() . '"}';
    // header('Content-Type: application/json');
    echo json_encode([["x"=>0,"y"=>0,"texture"=>"hole","can_hover"=>true,"can_kill"=>true,"can_use"=>false,"can_open"=>false]]);
}
