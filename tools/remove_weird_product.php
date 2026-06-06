<?php
require 'config.php';
try {
    
    $stmt = $pdo->prepare('DELETE FROM products WHERE id = ?');
    $stmt->execute(['prod_6a020dd9b1ddd']);
    
    echo 'Deleted product with ID: prod_6a020dd9b1ddd' . PHP_EOL;
    
    
    $stmt = $pdo->query('SELECT COUNT(*) as total FROM products');
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo 'Total products remaining: ' . $result['total'] . PHP_EOL;
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
}
?>