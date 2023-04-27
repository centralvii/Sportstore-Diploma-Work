<?php
require 'db_connect.php';

$product_id = $_GET['product_id'];

$query = "SELECT * FROM products WHERE id = $product_id";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $product = $result->fetch_assoc();
    echo json_encode($product);
}

$conn->close();
?>
