<?php
define('CLI_MODE', true);
require_once 'config.php';

echo "Testing upload_image.php endpoint..." . PHP_EOL;


$_SERVER['REQUEST_METHOD'] = 'POST';
$_FILES['image'] = [
    'name' => 'test.jpg',
    'type' => 'image/jpeg',
    'tmp_name' => __FILE__, 
    'error' => UPLOAD_ERR_OK,
    'size' => 1024
];


$_SESSION['user'] = [
    'id' => 1,
    'email' => 'santocincs@gmail.com',
    'name' => 'Admin User',
    'role' => 'admin'
];

include 'upload_image.php';
?>