<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
require 'db_connect.php';

$username = $_POST['username'];
$password = $_POST['password'];

// Запрос на поиск пользователя с указанными именем пользователя и паролем
$query = "SELECT * FROM users WHERE username = ? AND password = ? AND is_admin = 1";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

header('Content-Type: text/plain');

if ($result->num_rows > 0) {
    // Пользователь найден, успешная авторизация
    $_SESSION['username'] = $username;
    echo "success";
} else {
    // Пользователь не найден или неверные данные авторизации
    echo "error";
}

$stmt->close();
$conn->close();
?>
