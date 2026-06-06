<?php
if (!defined('CLI_MODE')) {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

session_start();

$host = 'localhost';
$dbname = 'gains_grains_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    
    if (defined('CLI_MODE')) {
        echo 'Database connection failed: ' . $e->getMessage() . PHP_EOL;
        echo 'Trying mysqli fallback...' . PHP_EOL;
        $mysqli = new mysqli($host, $username, $password, $dbname);
        if ($mysqli->connect_error) {
            echo 'Mysqli connection also failed: ' . $mysqli->connect_error . PHP_EOL;
            exit(1);
        } else {
            echo 'Mysqli connection successful' . PHP_EOL;
            
        }
    } else {
        
        $mysqli = new mysqli($host, $username, $password, $dbname);
        if ($mysqli->connect_error) {
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed']);
            exit;
        } else {
            
            class MysqliPDO {
                private $mysqli;
                public function __construct($mysqli) { $this->mysqli = $mysqli; }
                public function prepare($sql) { return new MysqliStmt($this->mysqli, $sql); }
                public function query($sql) { return $this->mysqli->query($sql); }
                public function exec($sql) { return $this->mysqli->query($sql); }
                public function lastInsertId() { return $this->mysqli->insert_id; }
            }
            class MysqliStmt {
                private $mysqli;
                private $stmt;
                public function __construct($mysqli, $sql) { $this->mysqli = $mysqli; $this->stmt = $mysqli->prepare($sql); }
                public function execute($params = []) { 
                    if (!empty($params)) $this->stmt->bind_param(str_repeat('s', count($params)), ...$params);
                    $this->stmt->execute();
                    return $this->stmt;
                }
                public function fetch($mode = PDO::FETCH_ASSOC) { 
                    $result = $this->stmt->get_result();
                    return $result ? $result->fetch_assoc() : false;
                }
                public function fetchAll($mode = PDO::FETCH_ASSOC) {
                    $result = $this->stmt->get_result();
                    return $result ? $result->fetch_all(MYSQLI_ASSOC) : [];
                }
            }
            $pdo = new MysqliPDO($mysqli);
        }
    }
}

function sendResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

function getCurrentUser() {
    return $_SESSION['user'] ?? null;
}

function requireAuth() {
    $user = getCurrentUser();
    if (!$user) {
        sendResponse(['error' => 'Login required'], 401);
    }
    return $user;
}

function requireAdmin() {
    $user = requireAuth();
    if ($user['role'] !== 'admin') {
        sendResponse(['error' => 'Admin access required'], 403);
    }
    return $user;
}
?>