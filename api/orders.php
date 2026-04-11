<?php
require_once 'config.php';

$user = requireAuth();
$userId = $user['id'];
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['address']) || empty($input['payment_method'])) {
        sendResponse(['error' => 'Address and payment method required'], 400);
    }
    
    $stmt = $pdo->prepare("
        SELECT c.product_id, c.variant_name, c.quantity, p.base_price, p.name
        FROM cart_items c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?
    ");
    $stmt->execute([$userId]);
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($cartItems)) {
        sendResponse(['error' => 'Cart is empty'], 400);
    }
    
    $subtotal = 0;
    foreach ($cartItems as $item) {
        $subtotal += (float)$item['base_price'] * (int)$item['quantity'];
    }
    
    $shipping = ($subtotal >= 5000) ? 0 : 299;
    $total = $subtotal + $shipping;
    $orderId = 'ORD-' . time() . rand(100, 999);
    $contactEmail = filter_var($input['email'] ?? $user['email'], FILTER_SANITIZE_EMAIL);
    
    $pdo->beginTransaction();
    try {
        $stmt = $pdo->prepare("
            INSERT INTO orders (id, user_id, customer_name, customer_email, phone, shipping_address, payment_method, subtotal, shipping_fee, total, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
        ");
        $stmt->execute([
            $orderId, 
            $userId, 
            $user['name'], 
            $contactEmail,
            $input['phone'] ?? '', 
            $input['address'], 
            $input['payment_method'],
            $subtotal, 
            $shipping, 
            $total
        ]);
        
        $stmtItem = $pdo->prepare("
            INSERT INTO order_items (order_id, product_id, variant_name, quantity, unit_price)
            VALUES (?, ?, ?, ?, ?)
        ");
        foreach ($cartItems as $item) {
            $stmtItem->execute([
                $orderId, 
                $item['product_id'], 
                $item['variant_name'],
                (int)$item['quantity'], 
                (float)$item['base_price']
            ]);
        }
        
        $stmtClear = $pdo->prepare("DELETE FROM cart_items WHERE user_id = ?");
        $stmtClear->execute([$userId]);
        
        $pdo->commit();
        sendResponse(['order_id' => $orderId, 'total' => $total]);
    } catch (Exception $e) {
        $pdo->rollBack();
        sendResponse(['error' => 'Order processing failed: ' . $e->getMessage()], 500);
    }
}

if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $orderId = $input['id'] ?? null;
    $status = $input['status'] ?? null;

    if (!$orderId || !$status) {
        sendResponse(['error' => 'Order ID and status are required'], 400);
    }

    if ($user['role'] === 'admin') {
        $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE id = ?");
        $stmt->execute([$status, $orderId]);
        sendResponse(['message' => 'Order status updated']);
        exit;
    }

    if ($status === 'Cancellation Requested') {
        $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE id = ? AND user_id = ? AND status = 'Pending'");
        $stmt->execute([$status, $orderId, $userId]);
        if ($stmt->rowCount() > 0) {
            sendResponse(['message' => 'Cancellation requested']);
        }
        sendResponse(['error' => 'Cancellation request not valid'], 400);
    }

    sendResponse(['error' => 'Admin access required'], 403);
}

if ($method === 'GET') {
    $isAdmin = ($user['role'] === 'admin');
    if ($isAdmin && isset($_GET['all'])) {
        $stmt = $pdo->prepare("SELECT * FROM orders ORDER BY created_at DESC");
        $stmt->execute();
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } else {
        $stmt = $pdo->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    foreach ($orders as &$order) {
        $stmtItem = $pdo->prepare("
            SELECT oi.*, p.name, p.image_url 
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        ");
        $stmtItem->execute([$order['id']]);
        $order['items'] = $stmtItem->fetchAll(PDO::FETCH_ASSOC);
        $order['date'] = $order['created_at'];
        $order['customer_name'] = $order['customer_name'] ?? 'Unknown';
        $order['shipping_address'] = $order['shipping_address'] ?? 'No address';
    }
    sendResponse($orders);
}
?>