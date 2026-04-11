<?php
require_once 'config.php';

$user = requireAuth();
$userId = $user['id'];
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->prepare("
        SELECT c.id, c.product_id, c.variant_name, c.quantity, 
               p.name, p.base_price, p.image_url
        FROM cart_items c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?
    ");
    $stmt->execute([$userId]);
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($items as &$item) {
        $item['price'] = (float)$item['base_price'];
        $item['id'] = (string)$item['id'];
    }
    sendResponse($items);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!is_array($input)) {
        sendResponse(['error' => 'Invalid JSON body'], 400);
    }

    $productId = trim($input['product_id'] ?? '');
    $variant = $input['variant'] ?? null;
    $quantity = isset($input['quantity']) && is_numeric($input['quantity']) ? (int)$input['quantity'] : 1;

    if ($productId === '') {
        sendResponse(['error' => 'Product ID is required'], 400);
    }

    $stmt = $pdo->prepare("SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ? AND (variant_name = ? OR (variant_name IS NULL AND ? IS NULL))");
    $stmt->execute([$userId, $productId, $variant, $variant]);
    $existing = $stmt->fetch();

    if ($existing) {
        $stmt = $pdo->prepare("UPDATE cart_items SET quantity = quantity + ? WHERE id = ?");
        $stmt->execute([$quantity, $existing['id']]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO cart_items (user_id, product_id, variant_name, quantity) VALUES (?, ?, ?, ?)");
        $stmt->execute([$userId, $productId, $variant, $quantity]);
    }
    sendResponse(['message' => 'Item added to cart']);
}

if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $itemId = $input['id'];
    $quantity = $input['quantity'];
    $stmt = $pdo->prepare("UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?");
    $stmt->execute([$quantity, $itemId, $userId]);
    sendResponse(['message' => 'Cart updated']);
}

if ($method === 'DELETE') {
    $itemId = $_GET['id'] ?? null;
    if ($itemId) {
        $stmt = $pdo->prepare("DELETE FROM cart_items WHERE id = ? AND user_id = ?");
        $stmt->execute([$itemId, $userId]);
    } else {
        $stmt = $pdo->prepare("DELETE FROM cart_items WHERE user_id = ?");
        $stmt->execute([$userId]);
    }
    sendResponse(['message' => 'Cart cleared']);
}
?>