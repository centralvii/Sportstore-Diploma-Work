-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 27 2023 г., 19:12
-- Версия сервера: 10.4.24-MariaDB
-- Версия PHP: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `sportswear_store`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Одежда'),
(2, 'Кроссовки');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cart` text NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'В процессе',
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `name`, `phone`, `email`, `cart`, `status`, `order_date`) VALUES
(8, 'Владимир', '79523389193', 'iazl1337666@gmail.com', '[{\"productId\":\"20\",\"size\":\"42\",\"count\":1}]', 'Выполнен', '2023-04-27 16:51:48');

-- --------------------------------------------------------

--
-- Структура таблицы `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image_url`, `category_id`) VALUES
(13, 'Air Force 1', 'Сияние продолжает жить в Nike Air Force 1 \'07, OG для бейсбола, которые привносят свежие нотки в то, что вы знаете лучше всего: прочные накладки, чистая отделка и идеальное количество вспышек, чтобы вы сияли.', '12000.00', 'img/af1.png', 2),
(18, 'Nike Dunk Low Retro', 'Созданные для игры на твердом покрытии, но перенесенные на улицы, баскетбольная икона возвращается с классическими деталями и броским стилем игры. ', '11500.00', 'img/dnk1.png', 2),
(19, 'Nike Dunk High Retro', 'Созданные для игры на твердом покрытии, но перенесенные на улицы, икона бейсбола 80-х годов возвращается с идеальными накладками и оригинальными университетскими цветами. Благодаря своему классическому дизайну Nike Dunk High Retro возвращает винтаж 80-х на улицы, а мягкий воротник на высокой подошве придает олдскульный вид, основанный на комфорте.', '12000.00', 'img/dnkh1.png', 2),
(20, 'Air Jordan 4 Thunder', 'Прямо из хранилища, желанная расцветка вернулась в прежнем виде. Здесь те же материалы и яркие акценты Tour Yellow, которые привлекли внимание любителей кроссовок в 2006 году, а также оригинальные элементы отделки, такие как смелый Jumpman на язычке и знаменитые \"крылья\", которые позволяют настроить шнуровку. Это не подделка. Успейте купить их, пока есть возможность.', '21000.00', 'img/jr4yelow.png', 2),
(21, 'Air Max 95 LX', '', '18000.00', 'img/air95.png', 2),
(22, 'Nike Sportswear Tech Fleece', '', '7900.00', 'img/odezhda1.png', 1),
(23, 'Nike Sportswear Tech Fleece', '', '5990.00', 'img/odezhda2.png', 1),
(24, 'Nike Skyring Skate Shorts', '', '3500.00', 'img/odezhda3.png', 1),
(25, 'Nike Dri-FIT NBA Swingman Jersey', '', '7800.00', 'img/odezhda4.png', 1),
(26, 'Nike College Shorts', '', '4500.00', 'img/odezhda5.png', 1),
(27, 'Nike College Long-Sleeve T-Shirt', '', '2500.00', 'img/odezhda6.png', 1),
(28, 'Nike Dri-FIT Primary Versatile Top', '', '2300.00', 'img/odezhda7.png', 1),
(29, 'Nike Therma-FIT Full-Zip Fitness Top', '', '5600.00', 'img/odezhda8.png', 1),
(30, 'Nike SB Logo T-Shirt', '', '2500.00', 'img/odezhda9.png', 1),
(31, 'Nike Sportswear Collection Jacket', '', '6890.00', 'img/odezhda10.png', 1),
(32, 'Nike Air Zoom G.T. Jump', 'Хотите бросить вызов гравитации? Познакомьтесь с одной из самых отзывчивых систем амортизации Nike Basketball, когда-либо разработанной для игровой обуви. Двойная амортизация Zoom Air работает в унисон с внешним прыжковым каркасом из PEBAX®, легким, пружинистым и прочным.', '12000.00', 'img/azoom.png', 2),
(33, 'Nike Blazer Mid \'77 Jumbo', 'Nike Blazer Mid \'77 Jumbo, которые многие хвалят за их неизменный внешний вид и ощущения, стали новым элементом гардероба. Теперь у них эластичная пятка с текстурой, напоминающей вельвет, и большие выступы для удобства надевания и снимания. Негабаритный дизайн Swoosh и шнурки jumbo добавляют забавный поворот.', '11500.00', 'img/blazer.png', 2),
(34, 'Air Jordan 3 Retro', 'Чистые и превосходные, AJ3 возвращаются со всем своим классическим стилем и изяществом. Качественная кожа верха с роскошной текстурой слоновьего принта сочетается с видимым Nike Air в подошве, создавая удобную повседневную икону.', '16000.00', 'img/jr3.png', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `is_admin`) VALUES
(1, 'admin', 'admin', 1),
(3, 'user', 'user', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
