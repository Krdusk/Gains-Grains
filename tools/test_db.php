<?php
define('CLI_MODE', true);
require_once 'config.php';

$host = 'localhost';
$dbname = 'gains_grains_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo 'Database connection successful' . PHP_EOL;

    $stmt = $pdo->query('SELECT COUNT(*) as count FROM products');
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo 'Products table exists with ' . $result['count'] . ' records' . PHP_EOL;

} catch (PDOException $e) {
    echo 'Database error: ' . $e->getMessage() . PHP_EOL;
}
?>