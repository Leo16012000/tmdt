-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 11, 2021 lúc 09:29 AM
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
('ZGR52', 'chưa thanh toán', '2021-05-12 04:00:00', 'Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'CB001- BỘ BÀN ĂN CABIN 4 GHẾ XUẤT KHẨU [11] [1 cái]', 2850000, 'Đặng Tuấn Anh', 4237600),
('ZGR57', 'chưa thanh toán', '2021-05-12 04:00:00', 'Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'CB001- BỘ BÀN ĂN CABIN 4 GHẾ XUẤT KHẨU [11] [1 cái]', 2850000, 'Đặng Tuấn Anh', 4237600),
('ZGR58', 'đã thanh toán', '2021-05-12 04:00:00', 'Xã Hoà Long, Thị Xã Bà Rịa, Tỉnh Bà Rịa - Vũng Tàu', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DB027 - GIƯỜNG NGỦ ĐÈN LED CÓ NGĂN KÉO MAY [7] [1 cái], DT014 - BÀN TRANG ĐIỂM SCANDINAVIAN KÈM GƯƠNG L1150 [8] [1 cái]', 23270000, 'Đặng Tuấn Anh', 24657600),
('ZGR65', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã Xuân Thới Đông, Huyện Hóc Môn, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DT014 - BÀN TRANG ĐIỂM SCANDINAVIAN KÈM GƯƠNG L1150 [8] [2 cái]', 17844000, 'Đặng Tuấn Anh', 19231600),
('ZGR6N', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã Bà Điểm, Huyện Hóc Môn, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DP001 - GỐI ÔM CHỮ U BODY PILLOW [3] [1 cái]', 490000, 'Đặng Tuấn Anh', 1877600),
('ZGR6P', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã Hiệp Phước, Huyện Nhà Bè, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DP001 - GỐI ÔM CHỮ U BODY PILLOW [3] [1 cái]', 490000, 'Đặng Tuấn Anh', 1877600),
('ZGR9E', 'chưa thanh toán', '2021-05-12 04:00:00', 'Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'CB001- BỘ BÀN ĂN CABIN 4 GHẾ XUẤT KHẨU [11] [1 cái]', 2850000, 'Mai Đình Phúc', 4237600),
('ZGR9M', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã Thanh Trù, Thành Phố Vĩnh Yên, Tỉnh Vĩnh Phúc', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'CB002 - BỘ BÀN ĂN CABIN 2 GHẾ ĐƠN KÈM GHẾ DÀI [17] [1 cái], CC004 - BỘ BÀN ĂN CHOICE 6 NGƯỜI [15] [1 cái]', 17478000, 'Đặng Tuấn Anh', 18865600),
('ZGR9R', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã Thanh Trù, Thành Phố Vĩnh Yên, Tỉnh Vĩnh Phúc', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'CB002 - BỘ BÀN ĂN CABIN 2 GHẾ ĐƠN KÈM GHẾ DÀI [17] [1 cái], CC004 - BỘ BÀN ĂN CHOICE 6 NGƯỜI [15] [1 cái]', 17478000, 'Đặng Tuấn Anh', 18865600),
('ZGRCB', 'chưa thanh toán', '2021-05-12 04:00:00', 'Phường Bình Hưng, Thành Phố Phan Thiết, Tỉnh Bình Thuận', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'CB002 - BỘ BÀN ĂN CABIN 2 GHẾ ĐƠN KÈM GHẾ DÀI [17] [1 cái]', 2679000, 'Đặng Tuấn Anh', 4066600),
('ZGRCN', 'đã thanh toán', '2021-05-12 04:00:00', 'Xã Hoà Long, Thị Xã Bà Rịa, Tỉnh Bà Rịa - Vũng Tàu', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DB027 - GIƯỜNG NGỦ ĐÈN LED CÓ NGĂN KÉO MAY [7] [1 cái], DT014 - BÀN TRANG ĐIỂM SCANDINAVIAN KÈM GƯƠNG L1150 [8] [1 cái]', 23270000, 'Đặng Tuấn Anh', 24657600),
('ZGRCP', 'đã thanh toán', '2021-05-12 04:00:00', 'Xã Bành Trạch, Huyện Ba Bể, Tỉnh Bắc Kạn', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'CB001- BỘ BÀN ĂN CABIN 4 GHẾ XUẤT KHẨU [11] [1 cái]', 2850000, 'Đặng Tuấn Anh', 4237600),
('ZGRCT', 'đã thanh toán', '2021-05-12 04:00:00', 'Xã Hoà Long, Thị Xã Bà Rịa, Tỉnh Bà Rịa - Vũng Tàu', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DB027 - GIƯỜNG NGỦ ĐÈN LED CÓ NGĂN KÉO MAY [7] [1 cái], DT014 - BÀN TRANG ĐIỂM SCANDINAVIAN KÈM GƯƠNG L1150 [8] [1 cái]', 23270000, 'Đặng Tuấn Anh', 24657600),
('ZGRDE', 'chưa thanh toán', '2021-05-11 04:00:00', 'Phường 12, Thành Phố Vũng Tầu, Tỉnh Bà Rịa - Vũng Tàu', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'LS026 - TỦ TRANG TRÍ SUNNY 1000 [4] [1 cái], CB001- BỘ BÀN ĂN CABIN 4 GHẾ XUẤT KHẨU [11] [1 cái]', 10114000, 'Đặng Tuấn Anh', 11501600),
('ZGRDM', 'chưa thanh toán', '2021-05-11 04:00:00', 'Phường An Phú Đông, Quận 12, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'TS010 - KỆ TIVI GỖ MDF SCANDINAVIAN [5] [1 cái], LS026 - TỦ TRANG TRÍ SUNNY 1000 [4] [1 cái]', 9650000, 'Đặng Tuấn Anh', 11037600),
('ZGRL6', 'chưa thanh toán', '2021-05-11 04:00:00', 'Phường 02, Quận 3, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'CB001- BỘ BÀN ĂN CABIN 4 GHẾ XUẤT KHẨU [11] [1 cái], CC004 - BỘ BÀN ĂN CHOICE 6 NGƯỜI [15] [1 cái]', 17649000, 'Đặng Tuấn Anh', 19036600),
('ZGRLN', 'chưa thanh toán', '2021-05-11 04:00:00', 'Phường 03, Quận 3, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'CB001- BỘ BÀN ĂN CABIN 4 GHẾ XUẤT KHẨU [11] [1 cái], CC004 - BỘ BÀN ĂN CHOICE 6 NGƯỜI [15] [1 cái], DP001 - GỐI ÔM CHỮ U BODY PILLOW [3] [1 cái], DB027 - GIƯỜNG NGỦ ĐÈN LED CÓ NGĂN KÉO MAY [7] [1 cái]', 62781000, 'Đặng Tuấn Anh', 64168600),
('ZGRNJ', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã Bá Hiến, Huyện Bình Xuyên, Tỉnh Vĩnh Phúc', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DP001 - GỐI ÔM CHỮ U BODY PILLOW [3] [1 cái]', 490000, 'Đặng Tuấn Anh', 1877600),
('ZGRNM', 'chưa thanh toán', '2021-05-12 04:00:00', 'Thị Trấn An Phú, Huyện An Phú, Tỉnh An Giang', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DP001 - GỐI ÔM CHỮ U BODY PILLOW [3] [2 cái]', 980000, 'Đặng Tuấn Anh', 2367600),
('ZGRNR', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã Bá Hiến, Huyện Bình Xuyên, Tỉnh Vĩnh Phúc', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DP001 - GỐI ÔM CHỮ U BODY PILLOW [3] [1 cái]', 490000, 'Đặng Tuấn Anh', 1877600),
('ZGRQ3', 'chưa thanh toán', '2021-05-10 16:00:00', 'Xã Tân Thông Hội, Huyện Củ Chi, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'TỦ TRANG TRÍ SUNNY 1000 [3] [1 cái], LS020 - TỦ TRANG TRÍ MDF ĐA NĂNG 600 [10] [1 cái]', 10644000, 'Đặng Tuấn Anh', 12031600),
('ZGRT2', 'đã thanh toán', '2021-05-12 04:00:00', 'Xã Tân An, Huyện Càng Long, Tỉnh Trà Vinh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DP001 - GỐI ÔM CHỮ U BODY PILLOW [3] [1 cái], CC004 - BỘ BÀN ĂN CHOICE 6 NGƯỜI [15] [1 cái]', 15289000, 'Đặng Tuấn Anh', 16676600),
('ZGRT7', 'chưa thanh toán', '2021-05-12 04:00:00', 'Phường An Lộc, Thị Xã Bình Long, Tỉnh Bình Phước', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DP001 - GỐI ÔM CHỮ U BODY PILLOW [3] [1 cái], CC004 - BỘ BÀN ĂN CHOICE 6 NGƯỜI [15] [1 cái]', 15289000, 'Đặng Tuấn Anh', 16676600),
('ZGRTF', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã An Thới Đông, Huyện Cần Giờ, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DP001 - GỐI ÔM CHỮ U BODY PILLOW [3] [2 cái]', 980000, 'Đặng Tuấn Anh', 2367600),
('ZGRTU', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã Bắc Phong, Huyện Cao Phong, Tỉnh Hòa Bình', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DP001 - GỐI ÔM CHỮ U BODY PILLOW [3] [1 cái], CC004 - BỘ BÀN ĂN CHOICE 6 NGƯỜI [15] [1 cái]', 15289000, 'Đặng Tuấn Anh', 16676600),
('ZGRUF', 'chưa thanh toán', '2021-05-11 16:00:00', 'Phường An Phú Đông, Quận 12, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'LS026 - TỦ TRANG TRÍ SUNNY 1000 [4] [1 cái], CB001- BỘ BÀN ĂN CABIN 4 GHẾ XUẤT KHẨU [11] [1 cái], DT014 - BÀN TRANG ĐIỂM SCANDINAVIAN KÈM GƯƠNG L1150 [8] [2 cái]', 27958000, 'Đặng Tuấn Anh', 29345600),
('ZGRUL', 'chưa thanh toán', '2021-05-11 04:00:00', 'Phường 12, Thành Phố Vũng Tầu, Tỉnh Bà Rịa - Vũng Tàu', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'LS026 - TỦ TRANG TRÍ SUNNY 1000 [4] [1 cái], CB001- BỘ BÀN ĂN CABIN 4 GHẾ XUẤT KHẨU [11] [1 cái]', 10114000, 'Đặng Tuấn Anh', 11501600),
('ZGRV0', 'chưa thanh toán', '2021-05-12 04:00:00', 'Phường 24, Quận Bình Thạnh, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DT014 - BÀN TRANG ĐIỂM SCANDINAVIAN KÈM GƯƠNG L1150 [8] [2 cái]', 17844000, 'Đặng Tuấn Anh', 19231600),
('ZGRV2', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã A Đớt, Huyện A Lưới, Tỉnh Thừa Thiên Huế', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'TA003 - BỘ BÀN HỌC GỖ ÓC CHÓ [19] [1 cái]', 9890000, 'Huỳnh Thanh Sang', 11277600),
('ZGRVA', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã Đông Hà, Huyện Đức Linh, Tỉnh Bình Thuận', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DT014 - BÀN TRANG ĐIỂM SCANDINAVIAN KÈM GƯƠNG L1150 [8] [2 cái]', 17844000, 'Đặng Tuấn Anh', 19231600),
('ZGRVC', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã Đông Phú, Huyện Châu Thành, Tỉnh Hậu Giang', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DP001 - GỐI ÔM CHỮ U BODY PILLOW [3] [1 cái]', 490000, 'Đặng Tuấn Anh', 1877600),
('ZGRVG', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã Bắc Sơn, Huyện Thạch Hà, Tỉnh Hà Tĩnh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, '', 0, 'Đặng Tuấn Anh', 1387600),
('ZGRVH', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã Thái Hưng, Huyện Hưng Hà, Tỉnh Thái Bình', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DT014 - BÀN TRANG ĐIỂM SCANDINAVIAN KÈM GƯƠNG L1150 [8] [2 cái]', 17844000, 'Đặng Tuấn Anh', 19231600),
('ZGRVI', 'chưa thanh toán', '2021-05-12 04:00:00', 'Phường 17, Quận Gò Vấp, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'CB001- BỘ BÀN ĂN CABIN 4 GHẾ XUẤT KHẨU [11] [2 cái]', 5700000, 'Đặng Tuấn Anh', 7087600),
('ZGRVQ', 'chưa thanh toán', '2021-05-12 04:00:00', 'Phường 17, Quận Gò Vấp, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'CB001- BỘ BÀN ĂN CABIN 4 GHẾ XUẤT KHẨU [11] [2 cái]', 5700000, 'Đặng Tuấn Anh', 7087600),
('ZGRVS', 'chưa thanh toán', '2021-05-12 04:00:00', 'Phường 1, Thành Phố Bến Tre, Tỉnh Bến Tre', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'CC004 - BỘ BÀN ĂN CHOICE 6 NGƯỜI [15] [1 cái]', 14799000, 'Đặng Tuấn Anh', 16186600),
('ZGRVT', 'chưa thanh toán', '2021-05-12 04:00:00', 'Phường 17, Quận Gò Vấp, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DB027 - GIƯỜNG NGỦ ĐÈN LED CÓ NGĂN KÉO MAY [7] [1 cái]', 14348000, 'Đặng Tuấn Anh', 15735600),
('ZGRVW', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã Bắc Sơn, Huyện Thạch Hà, Tỉnh Hà Tĩnh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'TS010 - KỆ TIVI GỖ MDF SCANDINAVIAN [5] [1 cái]', 2386000, 'Đặng Tuấn Anh', 3773600),
('ZGRVX', 'chưa thanh toán', '2021-05-12 04:00:00', 'Xã Thái Hưng, Huyện Hưng Hà, Tỉnh Thái Bình', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'DT014 - BÀN TRANG ĐIỂM SCANDINAVIAN KÈM GƯƠNG L1150 [8] [2 cái]', 17844000, 'Đặng Tuấn Anh', 19231600),
('ZGRZZ', 'chưa thanh toán', '2021-05-11 16:00:00', 'Phường 14, Quận Tân Bình, Thành Phố Hồ Chí Minh', 'ready_to_pick', 'dangtuananh1601@gmail.com', 1387600, 'CC004 - BỘ BÀN ĂN CHOICE 6 NGƯỜI [15] [1 cái], MC001 - BỘ BÀN ĂN MARCEL 4 GHẾ ĐƠN [16] [1 cái]', 27667000, 'Đặng Tuấn Anh', 29054600);

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
