-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 02, 2024 at 11:34 PM
-- Server version: 10.3.39-MariaDB-0ubuntu0.20.04.2
-- PHP Version: 7.4.3-4ubuntu2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `s4007708_fsd_a2`
--

-- --------------------------------------------------------

--
-- Table structure for table `CartItems`
--

CREATE TABLE `CartItems` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL,
  `totalPrice` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `CartItems`
--

INSERT INTO `CartItems` (`id`, `user_id`, `product_id`, `name`, `quantity`, `price`, `totalPrice`, `createdAt`, `updatedAt`) VALUES
(45, 34, 2, 'Banana', 2, 1.29, 2.58, '2024-06-01 14:59:06', '2024-06-01 15:05:27'),
(48, 1, 9, 'Tomato', 6, 2.29, 13.74, '2024-06-02 06:49:22', '2024-06-02 09:35:42'),
(49, 1, 2, 'Banana', 7, 1.29, 9.03, '2024-06-02 06:49:23', '2024-06-02 09:35:42'),
(50, 6, 4, 'Pear', 3, 2.49, 7.47, '2024-06-02 09:35:31', '2024-06-02 09:35:40');

-- --------------------------------------------------------

--
-- Table structure for table `following`
--

CREATE TABLE `following` (
  `id` int(11) NOT NULL,
  `follower_id` int(11) NOT NULL,
  `followed_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `isLoggedIns`
--

CREATE TABLE `isLoggedIns` (
  `user_id` int(11) NOT NULL,
  `is_logged_in` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `specialPrice` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `specialPrice`, `image`) VALUES
(2, 'Banana', '1.19', '0.95', 'banana.png'),
(3, 'Orange', '1.29', '1.03', 'orange.png'),
(4, 'Pear', '2.49', NULL, 'pear.png'),
(5, 'Watermelon', '10.49', NULL, 'watermelon.png'),
(6, 'Box of Cherries', '22.39', '11.20', 'cherries.png'),
(7, 'Box of Blueberries', '7.49', NULL, 'blueberries.png'),
(8, 'Box of Raspberries', '7.49', '5.99', 'raspberries.png'),
(9, 'Tomato', '2.29', NULL, 'tomato.png'),
(10, 'Potato', '1.99', NULL, 'potato.png'),
(11, 'apples', '1.69', '1.35', 'apple.png');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `text` varchar(100) NOT NULL,
  `stars` int(11) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `deleted_message` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `text`, `stars`, `is_deleted`, `deleted_message`) VALUES
(10, 34, 2, 'Very bad', 1, 0, NULL),
(11, 37, 2, 'yummy', 5, 0, NULL),
(12, 37, 8, 'yum', 5, 0, NULL),
(15, 38, 3, 'bad', 1, 0, NULL),
(16, 38, 3, 'good', 4, 0, NULL),
(17, 38, 3, 'nice', 3, 0, NULL),
(18, 38, 4, 'good', 5, 0, NULL),
(19, 38, 4, 'nice', 5, 0, NULL),
(20, 38, 4, 'bad', 5, 0, NULL),
(22, 38, 2, 'good', 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `blocked` tinyint(1) NOT NULL DEFAULT 0,
  `dateJoined` date NOT NULL DEFAULT current_timestamp(),
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `height` decimal(5,2) DEFAULT NULL,
  `activityLevel` enum('low','medium','high') DEFAULT NULL,
  `dietaryPreferences` text DEFAULT NULL,
  `healthGoals` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `blocked`, `dateJoined`, `name`, `email`, `password`, `age`, `weight`, `height`, `activityLevel`, `dietaryPreferences`, `healthGoals`) VALUES
(1, 0, '2024-05-30', 'John Doe', 'john.doe@example.com', '$argon2id$v=19$m=65536,t=3,p=4$bsIIZSwwzzKUGQ9azZVzKQ$qDdfFQt2tRurgOhGoWM+thOg74rRvAlF30DG2JVS/jg', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 0, '2024-05-30', 'Vincent Dao', 'vincent123@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$avx2LwoElrVgr1qP2R3uSw$w6U4IgKBzP3eMcabQQR0w6VSZ11Sx05unhWrczQtueo', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 0, '2024-05-30', 'Vincent Dao', 'VincentDao123@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$q/bhF4/orxv38GEDKvbx2Q$9XPqYkfqKmG1jg/drCO4cbri9PleTNgCRcTzYsgo7lY', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 0, '2024-05-30', 'Vincent', 'V123@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$C+mJk8+O8ytUncs7EyYDkw$IW0kXgHLO0HH24KmutYAr+Q1l390GhOaItXp+EM7zVk', NULL, NULL, NULL, NULL, NULL, NULL),
(32, 0, '2024-05-30', 'marko', 'marko2004c@hotmail.com', '$argon2id$v=19$m=65536,t=3,p=4$W75px+PpYNJMDB/q8QrPfg$I05LCJ+j6vsuuPzgpPX92e91b/ss8JkGEEqeTyjAt4Y', 22, '22.00', '22.00', NULL, '22', '22'),
(34, 0, '2024-05-30', 'marko', 'marko2004c2@hotmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Kk5dA5lwFcnN4rHZ+AeldA$F6FYEq4OOgnF4Q6bKcwmyja9fJX0sJ+/Lr043KVTW2U', 22, '78.00', '199.00', 'high', 'None', 'gain muscle'),
(35, 0, '2024-05-30', 'KleMuPoe ', 'klemupoe.ko@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Saz/kHDutw2GHESfpJRzPg$YQUUhnLX3WZvalDnK+qIAdgvtaFbXdLEgHTsqmSw3CY', 87, '211.00', '123.00', 'medium', 'Humans', 'Kill everyone'),
(36, 0, '2024-06-01', 'Henry Dinh', 'Henryisadog@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Smvlbx6ib/DhBu+SLWpOlg$tb5njtwTR5Vg+0cTX1tYd9OSXjoL+KGsQLSTromQAZg', 36, '61.00', '195.00', NULL, '12', 'gain muscle'),
(37, 0, '2024-06-02', 'bob', 'bob@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$zPe8VXiHBf2faIJMeJO5Mw$QF+uOHefkTEsFEikgy7grlyCZnuRV9C48nhCosx9Sbw', NULL, NULL, NULL, NULL, NULL, NULL),
(38, 1, '2024-06-02', 'Jayden', 'johndoe@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$13UmuhxN7uw2SQluo+7NMQ$3ZnuhLy0cLYotov2DFy5YYDLPMEyP8DZGF/KyDBeALQ', 14, '21.00', '209.00', 'low', 'Nothing', 'Get Big');

-- --------------------------------------------------------

--
-- Table structure for table `WeeklySpecials`
--

CREATE TABLE `WeeklySpecials` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `originalPrice` float NOT NULL,
  `discountedPrice` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `WeeklySpecials`
--

INSERT INTO `WeeklySpecials` (`id`, `productId`, `name`, `image`, `originalPrice`, `discountedPrice`, `createdAt`, `updatedAt`, `product_id`) VALUES
(1, 6, 'Box of Cherries', 'cherries.png', 22.39, 11.2, '2024-06-02 13:07:54', '2024-06-02 13:07:54', NULL),
(2, 8, 'Box of Raspberries', 'raspberries.png', 7.49, 5.99, '2024-06-02 13:07:54', '2024-06-02 13:07:54', NULL),
(3, 11, 'apples', 'apple.png', 1.69, 1.35, '2024-06-02 13:07:54', '2024-06-02 13:07:54', NULL),
(4, 2, 'Banana', 'banana.png', 1.19, 0.95, '2024-06-02 13:07:54', '2024-06-02 13:07:54', NULL),
(5, 3, 'Orange', 'orange.png', 1.29, 1.03, '2024-06-02 13:07:54', '2024-06-02 13:07:54', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CartItems`
--
ALTER TABLE `CartItems`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CartItems_user_id_product_id_unique` (`user_id`,`product_id`),
  ADD KEY `CartItems_ibfk_2` (`product_id`);

--
-- Indexes for table `following`
--
ALTER TABLE `following`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follower_id` (`follower_id`),
  ADD KEY `followed_id` (`followed_id`);

--
-- Indexes for table `isLoggedIns`
--
ALTER TABLE `isLoggedIns`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `WeeklySpecials`
--
ALTER TABLE `WeeklySpecials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `WeeklySpecials_ibfk_1` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CartItems`
--
ALTER TABLE `CartItems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `following`
--
ALTER TABLE `following`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `WeeklySpecials`
--
ALTER TABLE `WeeklySpecials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CartItems`
--
ALTER TABLE `CartItems`
  ADD CONSTRAINT `CartItems_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CartItems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `following`
--
ALTER TABLE `following`
  ADD CONSTRAINT `following_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `following_ibfk_2` FOREIGN KEY (`followed_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `isLoggedIns`
--
ALTER TABLE `isLoggedIns`
  ADD CONSTRAINT `isLoggedIns_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `WeeklySpecials`
--
ALTER TABLE `WeeklySpecials`
  ADD CONSTRAINT `WeeklySpecials_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
