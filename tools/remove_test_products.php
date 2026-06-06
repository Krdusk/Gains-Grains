<?php
require_once 'config.php';

try {
    
    $stmt = $pdo->prepare("DELETE FROM products WHERE name LIKE 'Test%'");
    $stmt->execute();
    $deleted = $stmt->rowCount();
    echo "Deleted $deleted test products.\n";

    
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM products");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "Remaining products: " . $result['count'] . "\n";

} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
}
?>