<?php
require_once 'config.php';

$hash = password_hash('admin123', PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT IGNORE INTO users (email, password_hash, full_name, role) VALUES (?, ?, ?, ?)');
$stmt->execute(['admin@gainsgrains.com', $hash, 'Admin User', 'admin']);
echo 'Admin user created or already exists.';
?>