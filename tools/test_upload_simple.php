<?php
define('CLI_MODE', true);


$_SERVER['REQUEST_METHOD'] = 'POST';
$_FILES['image'] = [
    'name' => 'test.jpg',
    'type' => 'image/jpeg',
    'tmp_name' => tempnam(sys_get_temp_dir(), 'test'),
    'error' => UPLOAD_ERR_OK,
    'size' => 1024
];


file_put_contents($_FILES['image']['tmp_name'], 'fake image content');

$uploadDir = 'images/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$file = $_FILES['image'];
$fileName = basename($file['name']);
$fileExt = pathinfo($fileName, PATHINFO_EXTENSION);
$validExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

if (!in_array(strtolower($fileExt), $validExts)) {
    echo 'Invalid file type' . PHP_EOL;
    exit;
}

if ($file['size'] > 5 * 1024 * 1024) {
    echo 'File size exceeds 5MB' . PHP_EOL;
    exit;
}

$newFileName = 'prod_' . uniqid() . '.' . $fileExt;
$filePath = $uploadDir . $newFileName;

if (move_uploaded_file($file['tmp_name'], $filePath)) {
    echo 'File uploaded successfully: ' . $filePath . PHP_EOL;
} else {
    echo 'Failed to save file' . PHP_EOL;
}
?>