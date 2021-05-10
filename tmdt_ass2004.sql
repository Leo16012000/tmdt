-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 10, 2021 lúc 06:04 AM
-- Phiên bản máy phục vụ: 10.4.18-MariaDB
-- Phiên bản PHP: 8.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `tmdt_ass2004`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `ID` varchar(11) NOT NULL,
  `PaymentMethod` varchar(50) CHARACTER SET utf32 COLLATE utf32_vietnamese_ci NOT NULL,
  `DeliveryExpectedTime` datetime NOT NULL,
  `Address` varchar(100) CHARACTER SET utf32 COLLATE utf32_vietnamese_ci NOT NULL,
  `OrderState` varchar(50) NOT NULL,
  `UserEmail` varchar(50) NOT NULL,
  `GHNServicePrice` int(11) NOT NULL,
  `Content` varchar(200) NOT NULL,
  `Price` int(11) NOT NULL,
  `Receiver` varchar(50) CHARACTER SET utf32 COLLATE utf32_vietnamese_ci NOT NULL,
  `TotalPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`ID`, `PaymentMethod`, `DeliveryExpectedTime`, `Address`, `OrderState`, `UserEmail`, `GHNServicePrice`, `Content`, `Price`, `Receiver`, `TotalPrice`) VALUES
('ZGJRG', 'chưa thanh toán', '2021-05-10 16:00:00', 'Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'TỦ TRANG TRÍ SUNNY 1000 [3] [2 cái], LS020 - TỦ TRANG TRÍ MDF ĐA NĂNG 600 [10] [3 cái]', 24668000, 'Đặng Tuấn Anh', 26055600),
('ZGRQ3', 'chưa thanh toán', '2021-05-10 16:00:00', 'Xã Tân Thông Hội, Huyện Củ Chi, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'TỦ TRANG TRÍ SUNNY 1000 [3] [1 cái], LS020 - TỦ TRANG TRÍ MDF ĐA NĂNG 600 [10] [1 cái]', 10644000, 'Đặng Tuấn Anh', 12031600);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserEmail`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
