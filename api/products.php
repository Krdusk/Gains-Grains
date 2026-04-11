<?php
require_once 'config.php';
session_start();

$method = $_SERVER['REQUEST_METHOD'];

function getProductVariants($pdo) {
    $stmt = $pdo->prepare('SELECT product_id, variant_name FROM product_variants ORDER BY id ASC');
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function sendProductsResponse($pdo) {
    $stmt = $pdo->prepare('SELECT * FROM products ORDER BY created_at DESC');
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $variants = getProductVariants($pdo);
    $variantMap = [];
    foreach ($variants as $variant) {
        $variantMap[$variant['product_id']][] = $variant['variant_name'];
    }
    foreach ($products as &$product) {
        $product['variants'] = isset($variantMap[$product['id']]) ? $variantMap[$product['id']] : [];
        $product['in_stock'] = (int)$product['in_stock'];
        $product['base_price'] = (float)$product['base_price'];
        $product['rating'] = (float)$product['rating'];
    }
    sendResponse($products);
}

if ($method === 'GET') {
    sendProductsResponse($pdo);
}

if ($method === 'POST') {
    requireAdmin();
    $input = json_decode(file_get_contents('php://input'), true);

    $id = trim($input['id'] ?? '');
    if ($id === '') {
        $id = 'prod_' . uniqid();
    }
    $name = trim($input['name'] ?? '');
    $category = trim($input['category'] ?? 'gym');
    $description = trim($input['description'] ?? '');
    $base_price = is_numeric($input['base_price'] ?? null) ? (float)$input['base_price'] : 0.0;
    $rating = is_numeric($input['rating'] ?? null) ? (float)$input['rating'] : 4.5;
    $in_stock = isset($input['in_stock']) ? (int)(bool)$input['in_stock'] : 1;
    $image_url = trim($input['image_url'] ?? '');
    $specs = trim($input['specs'] ?? '');

    if ($name === '' || $description === '') {
        sendResponse(['error' => 'Product name and description are required'], 400);
    }

    $stmt = $pdo->prepare('INSERT INTO products (id, name, category, description, base_price, rating, in_stock, image_url, specs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$id, $name, $category, $description, $base_price, $rating, $in_stock, $image_url, $specs]);

    if (!empty($input['variants']) && is_array($input['variants'])) {
        $stmtVar = $pdo->prepare('INSERT INTO product_variants (product_id, variant_name) VALUES (?, ?)');
        foreach ($input['variants'] as $variantName) {
            $variantName = trim($variantName);
            if ($variantName !== '') {
                $stmtVar->execute([$id, $variantName]);
            }
        }
    }

    sendProductsResponse($pdo);
}

if ($method === 'PUT') {
    requireAdmin();
    $input = json_decode(file_get_contents('php://input'), true);
    $id = trim($input['id'] ?? '');
    if ($id === '') {
        sendResponse(['error' => 'Product ID is required'], 400);
    }

    $fields = [];
    $values = [];
    $updatable = ['name', 'category', 'description', 'base_price', 'rating', 'in_stock', 'image_url', 'specs'];
    foreach ($updatable as $field) {
        if (array_key_exists($field, $input)) {
            $fields[] = "$field = ?";
            if ($field === 'base_price' || $field === 'rating') {
                $values[] = is_numeric($input[$field]) ? (float)$input[$field] : 0.0;
            } elseif ($field === 'in_stock') {
                $values[] = (int)(bool)$input[$field];
            } else {
                $values[] = trim($input[$field]);
            }
        }
    }

    if (!empty($fields)) {
        $values[] = $id;
        $stmt = $pdo->prepare('UPDATE products SET ' . implode(', ', $fields) . ' WHERE id = ?');
        $stmt->execute($values);
    }

    if (isset($input['variants']) && is_array($input['variants'])) {
        $stmtClear = $pdo->prepare('DELETE FROM product_variants WHERE product_id = ?');
        $stmtClear->execute([$id]);
        $stmtVar = $pdo->prepare('INSERT INTO product_variants (product_id, variant_name) VALUES (?, ?)');
        foreach ($input['variants'] as $variantName) {
            $variantName = trim($variantName);
            if ($variantName !== '') {
                $stmtVar->execute([$id, $variantName]);
            }
        }
    }

    sendProductsResponse($pdo);
}

if ($method === 'DELETE') {
    requireAdmin();
    $id = trim($_GET['id'] ?? '');
    if ($id === '') {
        sendResponse(['error' => 'Product ID is required'], 400);
    }

    $stmt = $pdo->prepare('DELETE FROM products WHERE id = ?');
    $stmt->execute([$id]);
    sendProductsResponse($pdo);
}

sendResponse(['error' => 'Method not allowed'], 405);
?>