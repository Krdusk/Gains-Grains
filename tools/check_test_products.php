<?php
require 'config.php';
try {
    $stmt = $pdo->query('SELECT id, name, category FROM products WHERE name LIKE "%Test%" OR name LIKE "%test%" ORDER BY id');
    echo 'Test products found in database:' . PHP_EOL;
    $count = 0;
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo $row['id'] . ' - ' . $row['name'] . ' (' . $row['category'] . ')' . PHP_EOL;
        $count++;
    }
    echo 'Total test products: ' . $count . PHP_EOL;

    $stmt = $pdo->query('SELECT COUNT(*) as total FROM products');
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo 'Total products in database: ' . $result['total'] . PHP_EOL;
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
}
?>