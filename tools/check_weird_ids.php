<?php
require 'config.php';
try {
    
    $stmt = $pdo->query('SELECT id, name, category FROM products WHERE id NOT LIKE "eq%" AND id NOT LIKE "sp%" AND id NOT LIKE "sup%" ORDER BY id');
    echo 'Products with IDs not starting with eq/sp/sup:' . PHP_EOL;
    $count = 0;
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo $row['id'] . ' - ' . $row['name'] . ' (' . $row['category'] . ')' . PHP_EOL;
        $count++;
    }
    echo 'Total non-standard products: ' . $count . PHP_EOL;
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
}
?>