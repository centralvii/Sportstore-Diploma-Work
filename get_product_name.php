<?php
include 'db_connect.php';

// Проверяем, передан ли ID продукта
if(isset($_GET['productId'])) {
    $productId = $_GET['productId'];

    // Создаем подключение к базе данных
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Подготавливаем SQL запрос для получения имени продукта
    $sql = "SELECT name FROM products WHERE id = ?";

    // Подготавливаем выражение
    if($stmt = $conn->prepare($sql)) {
        // Привязываем переменные к подготовленному выражению в качестве параметров
        $stmt->bind_param("i", $param_id);

        // Устанавливаем параметры
        $param_id = $productId;

        // Пытаемся выполнить подготовленное выражение
        if($stmt->execute()) {
            // Сохраняем результат
            $stmt->bind_result($name);

            if($stmt->fetch()) {
                // Если продукт найден, возвращаем его имя
                echo $name;
            } else {
                // Если продукт не найден, возвращаем сообщение об ошибке
                echo "No product found with ID: $productId";
            }
        } else {
            echo "Oops! Something went wrong. Please try again later.";
        }
    }

    // Закрываем подготовленное выражение
    $stmt->close();

} else {
    echo "No product ID provided.";
}
?>
