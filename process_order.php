<?php
// получить данные из POST-запроса
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$cart = $_POST['cart'];
$status = "В процессе"; // установить статус по умолчанию

// подключиться к базе данных
$db = new mysqli('localhost', 'root', '', 'sportswear_store');

if ($db->connect_error) {
    die("Ошибка подключения: " . $db->connect_error);
}

// подготовить запрос
$stmt = $db->prepare("INSERT INTO orders (name, phone, email, cart, status) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    die("Ошибка подготовки запроса: " . $db->error);
}

// привязать параметры
$stmt->bind_param("sssss", $name, $phone, $email, $cart, $status);

// выполнить запрос
if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => $stmt->error]);
}

// закрыть подключение
$stmt->close();
$db->close();
?>
