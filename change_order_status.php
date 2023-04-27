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
      die(json_encode("Connection failed: " . $conn->connect_error));
    }

    // Убедитесь, что ID заказа был передан в POST-запросе
    if (!isset($_POST['order_id'])) {
        echo json_encode("error: order_id not set in POST");
        exit;
    }

    $orderId = $_POST['order_id'];

    // Запрос SQL для обновления статуса заказа
    $sql = "UPDATE orders SET status = 'Выполнен' WHERE id = ?";

    // Подготавливаем выражение
    if ($stmt = $conn->prepare($sql)) {
        // Привязываем переменные к подготовленному выражению в качестве параметров
        $stmt->bind_param("i", $orderId);
        
        // Выполняем подготовленное выражение
        if ($stmt->execute()) {
            echo json_encode("success");
        } else {
            echo json_encode("error: " . $stmt->error);
        }
        
        // Закрываем подготовленное выражение
        $stmt->close();
    } else {
        echo json_encode("error: " . $conn->error);
    }

    $conn->close();
?>
