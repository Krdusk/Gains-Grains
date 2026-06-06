<?php
require_once 'config.php';

$email = 'admin@gainsgrains.com';
$password = 'admin123';

$stmt = $pdo->prepare("SELECT id, email, full_name, role, password_hash FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password_hash'])) {
    echo 'Login successful: ' . json_encode($user);
} else {
    echo 'Login failed';
}
?>