<?php
    header("Content-Type: application/json");

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "sportswear_store";

    // Создать соединение
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Проверить соединение
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Убедитесь, что ID заказа был передан в POST-запросе
    if (!isset($_POST['order_id'])) {
        echo json_encode("error");
        exit;
    }

    $orderId = $_POST['order_id'];

    // Запрос SQL для удаления заказа
    $sql = "DELETE FROM orders WHERE id = $orderId";

    // Выполнить запрос и проверить, был ли он успешным
    if ($conn->query($sql) === TRUE) {
        echo json_encode("success");
    } else {
        echo json_encode("error: " . $sql . "<br>" . $conn->error);
    }

    $conn->close();
?>
