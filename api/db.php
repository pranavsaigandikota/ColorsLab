<?php
$config = require __DIR__ . '/config.php';
$conn = new mysqli($config['host'], $config['username'], $config['password'], $config['database']);
return $conn;
?>
