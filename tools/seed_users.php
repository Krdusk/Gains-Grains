<?php

try {
    $pdo = new PDO('mysql:host=localhost;dbname=gains_grains_db', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute(['santocincs@gmail.com']);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        
        $hash = password_hash('AdminPass123', PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, full_name, role) VALUES (?, ?, ?, ?)");
        $stmt->execute(['santocincs@gmail.com', $hash, 'Admin User', 'admin']);
        echo "Admin user created.\n";
    } else {
        echo "Admin user already exists.\n";
    }
    
    
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute(['santossam@gmail.com']);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        
        $hash = password_hash('CustomerPass123', PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, full_name, role) VALUES (?, ?, ?, ?)");
        $stmt->execute(['santossam@gmail.com', $hash, 'Sam Santos', 'customer']);
        echo "Customer user created.\n";
    } else {
        echo "Customer user already exists.\n";
    }
    
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
}
?>