<?php
require 'config.php';
try {
    
    
    $imagesDir = __DIR__ . '/images/';
    $referencedImages = [];
    
    
    $missingImages = [];
    
    for ($i = 21; $i <= 60; $i++) {
        $filename = "eq{$i}.jpg";
        if (!file_exists($imagesDir . $filename)) {
            $missingImages[] = $filename;
        }
    }
    
    for ($i = 21; $i <= 70; $i++) {
        $filename = "sp{$i}.jpg";
        if (!file_exists($imagesDir . $filename)) {
            $missingImages[] = $filename;
        }
    }
    
    for ($i = 11; $i <= 40; $i++) {
        $filename = "sup{$i}.jpg";
        if (!file_exists($imagesDir . $filename)) {
            $missingImages[] = $filename;
        }
    }
    
    if (empty($missingImages)) {
        echo 'All referenced PNG images exist!' . PHP_EOL;
    } else {
        echo 'Missing PNG images:' . PHP_EOL;
        foreach ($missingImages as $img) {
            echo $img . PHP_EOL;
        }
    }
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
}
?>