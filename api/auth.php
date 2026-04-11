<?php
require_once 'config.php';

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($action === 'register') {
        $email = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
        $password = $input['password'] ?? '';
        $name = trim($input['name'] ?? '');
        
        if (strlen($password) < 6) {
            sendResponse(['error' => 'Password must be at least 6 characters'], 400);
        }
        
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            sendResponse(['error' => 'Email already registered'], 400);
        }
        
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, full_name, role) VALUES (?, ?, ?, 'customer')");
        $stmt->execute([$email, $hash, $name]);
        
        sendResponse(['message' => 'Registration successful']);
    }
    
    if ($action === 'login') {
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        
        $stmt = $pdo->prepare("SELECT id, email, full_name, role, password_hash FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && password_verify($password, $user['password_hash'])) {
            $_SESSION['user'] = [
                'id' => $user['id'],
                'email' => $user['email'],
                'name' => $user['full_name'],
                'role' => $user['role']
            ];
            sendResponse(['user' => $_SESSION['user']]);
        } else {
            sendResponse(['error' => 'Invalid email or password'], 401);
        }
    }
}

if ($action === 'logout') {
    session_destroy();
    sendResponse(['message' => 'Logged out']);
}

if ($action === 'me') {
    $user = getCurrentUser();
    sendResponse(['user' => $user]);
}
?>