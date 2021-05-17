<?php // Show errors
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
?>

<?php
require('database/DatabaseManager.php');

// Describe which method for each route
$routes = [
    "/maps" => "GET",
    "/mapById" => "GET",
    "/newMap" => "POST"
];

// Get all of saved maps
function maps($body){
    
}

// Get a map by its ID
function mapById($body){
    
}

// Upload a new map
function newMap($body){
    
}

function sendResponse($data){
    http_response_code(200);
    header('Content-Type: application/json');
    echo $data;
}

try {
    // Get request data
    $method = $_SERVER['REQUEST_METHOD'];
    $body = json_decode(file_get_contents('php://input'), true);
    // $db = DatabaseManager::dbConnect();
    $path = $_SERVER['PATH_INFO'];

    foreach ($routes as $current_route => $current_method) {
        if($current_route == $path && $current_method == $method){
            substr($path, 1)($body); // Execute the route method
        }
    }
} catch (Exception $e) {
    http_response_code($e->getCode());
    echo '{"error": "' . $e->getMessage() . '"}';
    header('Content-Type: application/json');
}
