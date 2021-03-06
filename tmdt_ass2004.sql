-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 20, 2021 lúc 06:48 AM
-- Phiên bản máy phục vụ: 10.4.17-MariaDB
-- Phiên bản PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `tmdt_ass0704`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `quantity` int(11) NOT NULL,
  `ProductId` int(12) NOT NULL,
  `CustomerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderdetail`
--

CREATE TABLE `orderdetail` (
  `quantity` int(3) NOT NULL,
  `ProductId` int(12) NOT NULL,
  `OrderId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `ID` int(11) NOT NULL,
  `PaymentMethod` enum('thanh toán khi nhận hàng','ví điện tử') NOT NULL,
  `OrderDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `Address` varchar(100) CHARACTER SET utf32 COLLATE utf32_vietnamese_ci NOT NULL,
  `OrderState` enum('chờ xác nhận','đang vận chuyển','đã giao hàng') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `ID` int(12) NOT NULL,
  `Price` float NOT NULL,
  `Fullname` varchar(100) CHARACTER SET utf32 COLLATE utf32_vietnamese_ci NOT NULL,
  `Detail` text CHARACTER SET utf32 COLLATE utf32_vietnamese_ci NOT NULL,
  `PostingDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `State` enum('còn hàng','hết hàng') NOT NULL,
  `Image` varchar(200) CHARACTER SET utf32 NOT NULL,
  `RatingPoint` float DEFAULT NULL,
  `SellerId` int(12) NOT NULL,
  `Category` text NOT NULL,
  `KindOfRoom` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`ID`, `Price`, `Fullname`, `Detail`, `PostingDate`, `State`, `Image`, `RatingPoint`, `SellerId`, `Category`, `KindOfRoom`) VALUES
(2, 749000, 'TT001 - BÀN TRÀ GỖ CAO SU KIỂU NHẬT', 'Là sản phẩm bàn trà sofa hiện đại của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu bàn ghế trang điểm nội thất phòng khách, phòng ăn giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.', '2021-04-02 17:26:41', 'còn hàng', 'https://product.hstatic.net/1000360516/product/tt002_3_60f52d1fc120475788c060538c6bbc26_4736ccc3c330', 5, 2, 'bàn', 1),
(3, 490000, 'DP001 - GỐI ÔM CHỮ U BODY PILLOW', 'Là sản phẩm gối ngủ của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu bàn ghế trang điểm nội thất phòng ngủ, phòng ăn giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.\r\n\r\n- Hỗ trợ trả góp 0%.\r\n\r\n- Miễn phí Ship tại khu vực Tp. Hồ Chí Minh và Bình Dương.\r\n\r\n- Chương trình khuyến mãi nội thất hấp dẫn giảm giá lên đến 50%.\r\n\r\n- Showroom Dongsuh Furniture sang trọng hiện đại và đẳng cấp.', '2021-04-02 17:42:44', 'còn hàng', 'https://product.hstatic.net/1000360516/product/4_f72ee0c78cd04785a49101bb01ad5c10_master.jpg', 5, 3, 'gối', 2),
(4, 7264000, 'LS026 - TỦ TRANG TRÍ SUNNY 1000', 'Là sản phẩm tủ trang trí của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu bàn ghế trang điểm nội thất phòng ngủ, phòng ăn giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.\r\n\r\n- Hỗ trợ trả góp 0%.\r\n\r\n- Miễn phí Ship tại khu vực Tp. Hồ Chí Minh và Bình Dương.\r\n\r\n- Chương trình khuyến mãi nội thất hấp dẫn giảm giá lên đến 50%.\r\n\r\n- Showroom Dongsuh Furniture sang trọng hiện đại và đẳng cấp.', '2021-04-02 17:46:08', 'còn hàng', 'https://product.hstatic.net/1000360516/product/3_6af68c1787fe43d5af687508793262f0_master.jpg', 4, 3, 'Tủ', 1),
(5, 2386000, 'TS010 - KỆ TIVI GỖ MDF SCANDINAVIAN', 'Là sản phẩm kệ tivi gỗ (TV gỗ) MDF sang trọng của thương hiệu nội thất phòng khách Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu kệ trang trí phòng khách hiện đại, bàn ăn giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.', '2021-04-03 07:41:58', 'còn hàng', 'https://product.hstatic.net/1000360516/product/3__copy__d87af52ba1844cfbad6152733e0a9468_master.jpg', 3, 2, 'kệ', 1),
(6, 3162000, 'LS009 - TỦ TRANG TRÍ NGĂN KÉO', 'Là sản phẩm tủ trang trí của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu bàn ghế trang điểm nội thất phòng ngủ, phòng ăn giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.\r\n\r\n- Hỗ trợ trả góp 0%.\r\n\r\n- Miễn phí Ship tại khu vực Tp. Hồ Chí Minh và Bình Dương.\r\n\r\n- Chương trình khuyến mãi nội thất hấp dẫn giảm giá lên đến 50%.\r\n\r\n- Showroom Dongsuh Furniture sang trọng hiện đại và đẳng cấp.', '2021-04-03 07:44:35', 'còn hàng', 'https://product.hstatic.net/1000360516/product/07_647315007ca640eea026be7363a39f1e_master.jpg', 5, 3, 'Tủ ', 1),
(7, 14348000, 'DB027 - GIƯỜNG NGỦ ĐÈN LED CÓ NGĂN KÉO MAY', 'Là sản phẩm giường ngủ của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu bàn ghế trang điểm nội thất phòng ngủ, phòng ăn giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.\r\n\r\n- Hỗ trợ trả góp 0%.\r\n\r\n- Miễn phí Ship tại khu vực Tp. Hồ Chí Minh và Bình Dương.\r\n\r\n- Chương trình khuyến mãi nội thất hấp dẫn giảm giá lên đến 50%.\r\n\r\n- Showroom Dongsuh Furniture sang trọng hiện đại và đẳng cấp.', '2021-04-03 07:46:41', 'còn hàng', 'https://product.hstatic.net/1000360516/product/1_c5a25d7bab4340bd8ffa86ec10bd11db_master_a63f1353fc4c444eb650bfef11659835_master.jpg', 5, 3, 'giường', 2),
(8, 8922000, 'DT014 - BÀN TRANG ĐIỂM SCANDINAVIAN KÈM GƯƠNG L1150', 'Là mẫu bàn trang điểm gỗ đẹp hiện đại phong cách Bắc Âu (Scandinavian). Chuyên cung cấp những mẫu bàn ghế trang điểm nội thất phòng ngủ, phòng ăn giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.', '2021-04-03 07:48:30', 'còn hàng', 'https://product.hstatic.net/1000360516/product/03_565671b0df634a0494691e0867cbae0f_master.jpg', 4, 4, 'Bàn', 2),
(9, 21372000, 'BW004 - TỦ QUẦN ÁO DIAMANG', 'Là sản phẩm tủ quần áo của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu bàn ghế trang điểm nội thất phòng ngủ, phòng ăn giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.\r\n\r\n- Hỗ trợ trả góp 0%.\r\n\r\n- Miễn phí Ship tại khu vực Tp. Hồ Chí Minh và Bình Dương.\r\n\r\n- Chương trình khuyến mãi nội thất hấp dẫn giảm giá lên đến 50%.\r\n\r\n- Showroom Dongsuh Furniture sang trọng hiện đại và đẳng cấp.', '2021-04-03 07:50:05', 'còn hàng', 'https://product.hstatic.net/1000360516/product/01_list_img_ee3d39e2c6d244bbaefbd7c30b2b6c80_master.jpg', 3, 4, 'tủ', 2),
(10, 3380000, 'LS020 - TỦ TRANG TRÍ MDF ĐA NĂNG 600', 'Là sản phẩm tủ trang trí của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu bàn ghế trang điểm nội thất phòng ngủ, phòng ăn giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.\r\n\r\n- Hỗ trợ trả góp 0%.\r\n\r\n- Miễn phí Ship tại khu vực Tp. Hồ Chí Minh và Bình Dương.\r\n\r\n- Chương trình khuyến mãi nội thất hấp dẫn giảm giá lên đến 50%.\r\n\r\n- Showroom Dongsuh Furniture sang trọng hiện đại và đẳng cấp.', '2021-04-03 08:05:09', 'còn hàng', 'https://product.hstatic.net/1000360516/product/02_b368afc8f6644ec9a820389b7ead6331_master.jpg', 4, 4, 'tủ', 1),
(11, 2850000, 'CB001- BỘ BÀN ĂN CABIN 4 GHẾ XUẤT KHẨU', 'Là bộ bàn ăn 4 người bằng gỗ tự nhiên của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu nội thất phòng ăn hiện đại, sofa giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.', '2021-04-03 08:06:21', 'còn hàng', 'https://product.hstatic.net/1000360516/product/7_a484fc6a967b4ffb83b65a51046c2bb4_master.jpg', 4, 4, 'bàn', 3),
(13, 796000, 'SH001 - GIÁ TREO QUẦN ÁO GỖ NGUYÊN KHỐI', 'Là giá treo quần áo bằng gỗ trong chuỗi nội thất trang trí của thương hiệu nội thất Top 3 tại Hàn Quốc. Chuyên cung cấp những mẫu nội thất khuyến mãi, sofa giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.', '2021-04-03 08:08:08', 'còn hàng', 'https://product.hstatic.net/1000360516/product/01_5d0a616173784367911879966deb8870_master.jpg', 3, 3, 'giá ', 1),
(14, 5064000, 'TT004 - BÀN TRÀ SOFA GỖ SỒI MẶT KÍNH', 'Là sản phẩm bàn trà sofa hiện đại của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu bàn ghế trang điểm nội thất phòng khách, phòng ăn giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn', '2021-04-20 04:05:11', 'còn hàng', 'https://product.hstatic.net/1000360516/product/tt004__copy__49e496d133cf4811a590644483c577ed_b9c4fcfd3bf148298a9c054382bed260_master.jpg', 5, 4, 'bàn', 1),
(15, 14799000, 'CC004 - BỘ BÀN ĂN CHOICE 6 NGƯỜI', 'Là bộ bàn ăn 6 người bằng gỗ tự nhiên của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu nội thất phòng ăn hiện đại, sofa giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.\r\n\r\n', '2021-04-20 04:20:51', 'còn hàng', 'https://product.hstatic.net/1000360516/product/3_9d994b954cb941cdb87a33d76c71ac55_master.jpg', 5, 11, 'bàn', 3),
(16, 12868000, 'MC001 - BỘ BÀN ĂN MARCEL 4 GHẾ ĐƠN', 'Là bộ bàn ăn 4 người bằng gỗ tự nhiên của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu nội thất phòng ăn hiện đại, sofa giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.\r\n\r\n', '2021-04-20 04:24:06', 'còn hàng', 'https://product.hstatic.net/1000360516/product/01_5161b41190d3458d8977113936c81378_master.jpg', 5, 6, 'bàn', 3),
(17, 2679000, 'CB002 - BỘ BÀN ĂN CABIN 2 GHẾ ĐƠN KÈM GHẾ DÀI', 'Là bộ bàn ăn 2 ghế đơn và 1 ghế dài dành cho 4 người bằng gỗ tự nhiên của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu nội thất phòng ăn hiện đại, sofa giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.', '2021-04-20 04:26:16', 'còn hàng', 'https://product.hstatic.net/1000360516/product/2_865b8b306a0649fc84734e3e484544ab_47e0478223354f9d9dde55dfa4d8f4e6_master.jpg', 4, 16, 'bàn', 3),
(18, 4996000, 'LS018 - TỦ TRANG TRÍ MDF ĐA NĂNG 800', 'Là sản phẩm tủ trang trí của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu bàn ghế trang điểm nội thất phòng ngủ, phòng ăn giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.\r\n\r\n- Hỗ trợ trả góp 0%.\r\n\r\n- Miễn phí Ship tại khu vực Tp. Hồ Chí Minh và Bình Dương.\r\n\r\n- Chương trình khuyến mãi nội thất hấp dẫn giảm giá lên đến 50%.\r\n\r\n- Showroom Dongsuh Furniture sang trọng hiện đại và đẳng cấp.', '2021-04-20 04:30:33', 'còn hàng', 'https://product.hstatic.net/1000360516/product/04_2ff629cc4d5c46c5b9da81092d78bbf5_master.jpg', 4, 7, 'tủ', 4),
(19, 9890000, 'TA003 - BỘ BÀN HỌC GỖ ÓC CHÓ', 'Là bộ bàn học bằng gỗ tự nhiên của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu nội thất phòng ăn hiện đại, sofa giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.', '2021-04-20 04:34:08', 'còn hàng', 'https://product.hstatic.net/1000360516/product/cover_2_d2018bf790854d3da81f5b3575ad1dc5_master.jpg', 4, 19, 'bàn', 4),
(20, 2600000, 'BS017 - KỆ TRANG TRÍ ĐA NĂNG 3 TẦNG', 'Là sản phẩm kệ tủ trang trí của thương hiệu nội thất Top 3 tại Hàn Quốc - Dongsuh Furniture. Chuyên cung cấp những mẫu bàn ghế trang điểm nội thất phòng khách, phòng ăn giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.', '2021-04-20 04:39:39', 'còn hàng', 'https://product.hstatic.net/1000360516/product/cover_ke-da-nang_600-_01__2a141d8a90804058930083a7a4c8646b_master.jpg', 4, 13, 'kệ', 4),
(21, 5200000, 'DT020 - BÀN HỌC GỖ SỒI TRẮNG', 'Là mẫu bàn trang điểm mini nhỏ gọn bằng gỗ MDF. Chuyên cung cấp những mẫu bàn ghế trang điểm nội thất phòng ngủ, phòng ăn giá rẻ, giường ngủ tinh tế, tủ kệ sang trọng với kiểu dáng, kích cỡ phù hợp thị hiếu, Dongsuh Furniture giúp thiết kế ngôi nhà mơ ước cho gia đình bạn.', '2021-04-20 04:46:01', 'còn hàng', 'https://product.hstatic.net/1000360516/product/cover-3__copy__ff42011b15354979afc5fda973163a74_master.jpg', 4, 8, 'bàn', 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room`
--

CREATE TABLE `room` (
  `RoomNumber` int(2) NOT NULL,
  `RoomName` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `room`
--

INSERT INTO `room` (`RoomNumber`, `RoomName`) VALUES
(1, 'Phòng khách'),
(2, 'Phòng ngủ'),
(3, 'phòng ăn'),
(4, 'phòng học/làm việc');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `Password` varchar(20) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Address` varchar(100) CHARACTER SET utf32 COLLATE utf32_vietnamese_ci NOT NULL,
  `Fullname` varchar(30) CHARACTER SET utf32 COLLATE utf32_vietnamese_ci NOT NULL,
  `PhoneNum` varchar(20) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Email` varchar(50) CHARACTER SET armscii8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`ID`, `Password`, `Address`, `Fullname`, `PhoneNum`, `Email`) VALUES
(2, '123456', 'ký túc xá khu A', 'Đặng Tuấn Anh', '0353323643', 'anh.dangleo1601@hcmut.edu.vn'),
(3, '123456', 'ký túc xá khu B đại học quốc gia', 'Huỳnh Thanh Sang', '0234567891', 'sang.huynh2000@gmail.com'),
(4, '123456', '268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh', 'Mai Đình Phúc', '0313211458', 'phuc.maidinh@gmail.com'),
(5, '123456', '226 Trần Hưng Đạo , thành phố Phan Thiết\r\n', 'Đặng Nhật Quân', '0846392841', 'dangnhatquan@gmail.com'),
(6, '123456', '572/4 Lê Quang Định, phường 12, quận 1, thành phố Hồ Chí Minh', 'Nguyễn Duy Sơn', '0839858233', 'nguyenduyson@gmail,com'),
(7, '123456', '38/21 khu phố 2, thị trấn Tân Biên, huyện Tân Biên, tỉnh Tây Ninh', 'Lê Kha', '0663745666', 'lekha@gmail.com'),
(8, '123456', '43 Nguyễn Chí Thanh, Ba Đình, Hà Nội', 'Hoàng Vương', '0846297233', 'hoangvuong@gmail.com'),
(9, '123456', '59 Phó Đức Chánh, Ba Đình, Hà Nội', 'Lê Đình Duy', '0843229842', 'leddinhduy@gmail.com'),
(10, '123456', '58/3 Phạm Ngọc Thạch, quận 3, thành phố Hồ Chí Minh', 'Nguyễn Văn Hoàn', '079234987', 'nguyenvanhoan@gmail.com'),
(11, '123456', '70 Thanh Long, quận Hải Châu, thành phố Đà Nẵng', 'Võ Quốc Bảo', '0513591224', 'voquocbao@gmail.com'),
(12, '123456', '114 Nguyễn Tất Thành, Lê Hồng Phong, thành phố Qui Nhơn, tỉnh Bình Định', 'Trần Quang Khải', '0978234876', 'tranquangkhai@gmail.com'),
(13, '123456', '146 Võ Trứ, Tân Lập, thành phố Nha Trang, tỉnh Khánh Hòa', 'Lê Minh Khánh', '0324298423', 'leminhkhanh@gmail.com'),
(14, '123456', '3 Huỳnh Thúc Kháng, phường 4, Thành phố Đà Lạt, tỉnh Lâm Đồng', 'Sỳ Tùng An', '0236382298', 'sytungan@gmail.com'),
(15, '123456', '1a Trần Phú, phường 1, thành phố Vũng Tàu, tỉnh BRVT', 'Lưu Minh Trí', '0908728976', 'luuminhtri@gmail.com'),
(16, '123456', '630 Ấp Bắc, phường 10, thành phố Mỹ Tho, tỉnh Tiền Giang', 'Nguyễn Trần Quang Minh', '0345987234', 'nguyentranquangminh@gmail.com'),
(17, '123456', '24 Trần Hưng Đạo, khu 1, thành phố Phú Quốc, tỉnh Kiên Giang', 'Lê Quang Trân', '0576398278', 'lequangtran@gmail.com'),
(18, '123456', '16 Lê Lợi, phường Vĩnh Ninh, thành phố Huế, tỉnh Thừa Thiên Huế', 'Trần Hùng', '0187398248', 'tranhung@gmail.com'),
(19, '123456', '200 Văn Cao, Đằng Giang, Ngố Quyền, Hải Phòng', 'Nguyễn Công Hòa', '0797223982', 'nguyenconghoa@gmail.com'),
(20, '123456', '48 Nguyễn Sỹ Sách, Hưng Bình, thành phố Vinh, tỉnh Nghệ An', 'Lâm Quang Tùng', '0936832932', 'lamquangtung@gmail.com');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD KEY `ProductId` (`ProductId`),
  ADD KEY `CustomerId` (`CustomerId`);

--
-- Chỉ mục cho bảng `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD KEY `OrderId` (`OrderId`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `SellerId` (`SellerId`),
  ADD KEY `KindOfRoom` (`KindOfRoom`);

--
-- Chỉ mục cho bảng `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`RoomNumber`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `ID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `room`
--
ALTER TABLE `room`
  MODIFY `RoomNumber` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`CustomerId`) REFERENCES `user` (`ID`);

--
-- Các ràng buộc cho bảng `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`ID`),
  ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ID`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`SellerId`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`KindOfRoom`) REFERENCES `room` (`RoomNumber`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
