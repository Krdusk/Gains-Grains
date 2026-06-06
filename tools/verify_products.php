<?php
$config = require 'config.php';
try {
    $stmt = $config['pdo']->query('SELECT COUNT(*) as total FROM products');
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo 'Total products in database: ' . $result['total'] . PHP_EOL;

    $stmt = $config['pdo']->query('SELECT id, name, category FROM products ORDER BY id LIMIT 5');
    echo 'First 5 products:' . PHP_EOL;
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo $row['id'] . ' - ' . $row['name'] . ' (' . $row['category'] . ')' . PHP_EOL;
    }
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
}
?>