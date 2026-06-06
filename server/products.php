<?php
require_once 'config.php';


$method = $_SERVER['REQUEST_METHOD'];

function getProductVariants($pdo) {
    try {
        $stmt = $pdo->prepare('SELECT product_id, variant_name FROM product_variants ORDER BY id ASC');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        
        return [];
    }
}

function normalizeProductImageUrl($product) {
    $id = trim($product['id'] ?? '');
    if (preg_match('/^(eq|sp|sup)\d+$/i', $id)) {
        return "images/{$id}.jpg";
    }

    $imageUrl = trim($product['image_url'] ?? '');
    $imageUrl = preg_replace('/\.png$/i', '.jpg', $imageUrl);

    if ($imageUrl === '' || stripos($imageUrl, 'placeholder.com') !== false) {
        return 'images/placeholder.jpg';
    }

    return preg_replace('/^images\/(sports|supplements|gym)\//i', 'images/', $imageUrl);
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
        $product['stock_count'] = (int)$product['in_stock'];
        $product['in_stock'] = (int)$product['in_stock'];
        $product['base_price'] = (float)$product['base_price'];
        $product['rating'] = (float)$product['rating'];
        $product['image_url'] = normalizeProductImageUrl($product);
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
    $name = trim($input['name'] ?? '');
    $category = trim($input['category'] ?? 'gym');
    $description = trim($input['description'] ?? '');
    $base_price = is_numeric($input['base_price'] ?? null) ? (float)$input['base_price'] : 0.0;
    $rating = is_numeric($input['rating'] ?? null) ? (float)$input['rating'] : 4.5;
    $stock_count = is_numeric($input['stock_count'] ?? null) ? (int)$input['stock_count'] : 0;
    $image_url = trim($input['image_url'] ?? '');
    $specs = trim($input['specs'] ?? '');

    if ($id === '') {
        $prefix = 'EQ';
        if (strtolower($category) === 'sports') {
            $prefix = 'SP';
        } elseif (strtolower($category) === 'supplements') {
            $prefix = 'SUP';
        }
        $regex = '^' . strtolower($prefix) . '[0-9]+$';
        $stmt = $pdo->prepare('SELECT id FROM products WHERE LOWER(id) REGEXP ? ORDER BY CAST(SUBSTRING(id, LENGTH(?) + 1) AS UNSIGNED) DESC LIMIT 1');
        $stmt->execute([$regex, strtolower($prefix)]);
        $lastId = $stmt->fetchColumn();
        $lastNumber = 0;
        if ($lastId !== false && preg_match('/(\d+)$/', $lastId, $matches)) {
            $lastNumber = (int)$matches[1];
        }
        $id = $prefix . ($lastNumber + 1);
    }

    if ($name === '' || $description === '') {
        sendResponse(['error' => 'Product name and description are required'], 400);
    }

    $stmt = $pdo->prepare('INSERT INTO products (id, name, category, description, base_price, rating, in_stock, image_url, specs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$id, $name, $category, $description, $base_price, $rating, $stock_count, $image_url, $specs]);

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
    $updatable = ['name', 'category', 'description', 'base_price', 'rating', 'stock_count', 'in_stock', 'image_url', 'specs'];
    foreach ($updatable as $field) {
        if (array_key_exists($field, $input)) {
            if ($field === 'stock_count') {
                $fields[] = 'in_stock = ?';
                $values[] = is_numeric($input[$field]) ? (int)$input[$field] : 0;
            } elseif ($field === 'in_stock') {
                $fields[] = 'in_stock = ?';
                $values[] = is_numeric($input[$field]) ? (int)$input[$field] : 0;
            } else {
                $fields[] = "$field = ?";
                if ($field === 'base_price' || $field === 'rating') {
                    $values[] = is_numeric($input[$field]) ? (float)$input[$field] : 0.0;
                } else {
                    $values[] = trim($input[$field]);
                }
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