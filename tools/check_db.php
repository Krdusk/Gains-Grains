<?php
try {
    $pdo = new PDO('mysql:host=localhost', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    
    $stmt = $pdo->query("SHOW DATABASES LIKE 'gains_grains_db'");
    $exists = $stmt->fetch();
    
    if (!$exists) {
        echo "Database doesn't exist, creating...\n";
        $pdo->exec("CREATE DATABASE `gains_grains_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        echo "Database created.\n";
    } else {
        echo "Database exists.\n";
    }
    
    
    $pdo->exec("USE `gains_grains_db`");
    
    
    $tables = ['users', 'products', 'product_variants', 'cart_items', 'orders', 'order_items'];
    foreach ($tables as $table) {
        $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
        if ($stmt->fetch()) {
            echo "Table $table exists.\n";
        } else {
            echo "Table $table missing.\n";
        }
    }
    
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
}
?>