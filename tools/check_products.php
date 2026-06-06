<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=gains_grains', 'root', '');
    $stmt = $pdo->query('SELECT * FROM products ORDER BY id DESC LIMIT 5');
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo 'Recent products:' . PHP_EOL;
    foreach ($products as $product) {
        echo 'ID: ' . $product['id'] . ', Name: ' . $product['name'] . ', Price: ' . $product['price'] . PHP_EOL;
    }
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
}
?>