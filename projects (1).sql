-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2025 at 08:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hezel_portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `project_title` varchar(255) NOT NULL,
  `project_description` text DEFAULT NULL,
  `file` varchar(500) DEFAULT NULL,
  `project_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `project_title`, `project_description`, `file`, `project_link`, `created_at`, `updated_at`) VALUES
(21, 'project', 'whatever you do', 'uploads/thumb0-04-06-6894b8037546240f2f98f8a593036c9bad7effc6b2a49e651163d3e1742fe2c8_396749f7646878af.jpg', '#', '2025-11-13 01:22:07', '2025-11-13 07:26:29'),
(34, 'lelellellele', 'asdfsftgffwtygh', 'uploads/embedded-10067_d319e5f705f745af.jpg', 'asdfsdfgheryutegsam', '2025-11-13 07:12:17', '2025-11-14 04:27:43'),
(36, 'lolololololo', 'jdwrduywhdgtafshqwyrdfjhsx', 'uploads/0-02-02-60ac686fc96b2366790664bdf1aa8cd84aa8a824df2df43bd673053199d47428_59b51fe0b2b60f58.png', '', '2025-11-14 04:28:05', '2025-11-14 04:28:05'),
(37, '3213213213', 'teryrgdgrtuythngfht', 'uploads/thumb0-04-01-2a4e083a61036af15110dbd4f09f0eeced9e7107f28aa3817e1f6205646e5518_47c2ece67d6abf49.jpg', '', '2025-11-14 06:47:03', '2025-11-14 06:47:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
