<?php
require_once 'config.php';
header('Content-Type: application/json');
try {
    $stmt = $pdo->query('SHOW COLUMNS FROM employees');
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['columns' => $columns]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
