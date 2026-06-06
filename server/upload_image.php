<?php
require_once 'config.php';


$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    sendResponse(['error' => 'Method not allowed'], 405);
}







if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    $error = 'No file uploaded or upload error';
    if (isset($_FILES['image'])) {
        $error .= ' - Error code: ' . $_FILES['image']['error'];
    }
    sendResponse(['error' => $error], 400);
}

$uploadDir = 'images/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$file = $_FILES['image'];
$fileName = basename($file['name']);
$fileExt = pathinfo($fileName, PATHINFO_EXTENSION);
$validExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

if (!in_array(strtolower($fileExt), $validExts)) {
    sendResponse(['error' => 'Invalid file type'], 400);
}

if ($file['size'] > 5 * 1024 * 1024) {
    sendResponse(['error' => 'File size exceeds 5MB'], 400);
}

$newFileName = 'prod_' . uniqid() . '.' . $fileExt;
$filePath = $uploadDir . $newFileName;

if (move_uploaded_file($file['tmp_name'], $filePath)) {
    sendResponse(['success' => true, 'image_url' => $filePath], 200);
} else {
    sendResponse(['error' => 'Failed to save file'], 500);
}
?>