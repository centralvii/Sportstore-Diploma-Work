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

    $sql = "SELECT * FROM orders";
    $result = $conn->query($sql);

    $orders = array();

    if ($result->num_rows > 0) {
      // Вывести данные каждой строки
      while($row = $result->fetch_assoc()) {
        $orders[] = $row;
      }
    } else {
      echo "0 results";
    }

    echo json_encode($orders);

    $conn->close();
?>
