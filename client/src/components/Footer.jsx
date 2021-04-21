import React from "react";
import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebookF,
	faTwitter,
	faYoutube,
	faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

function FooterRight() {
	return (
		<div className="FooterRight">
			<FontAwesomeIcon icon={faCopyright} /> Castle Furniture since 2021.
			Website by <b>Team6</b>
		</div>
	);
}

function FooterSubcribe() {
	return (
		<div className="FooterSubcribe">
			<div className="Social">
				<div className="Social-block">
					<a href="/">
						<FontAwesomeIcon
							icon={faFacebookF}
							size="2x"
							className="Social-icon"
						/>
					</a>
				</div>
				<div className="Social-block">
					<a href="/">
						<FontAwesomeIcon
							icon={faYoutube}
							size="2x"
							className="Social-icon"
						/>
					</a>
				</div>
				<div className="Social-block">
					<a href="/">
						<FontAwesomeIcon
							icon={faTwitter}
							size="2x"
							className="Social-icon"
						/>
					</a>
				</div>
				<div className="Social-block">
					<a href="/">
						<FontAwesomeIcon
							icon={faInstagramSquare}
							size="2x"
							className="Social-icon"
						/>
					</a>
				</div>
			</div>

			<div className="EmailInput">
				<input placeholder="Nhập email của bạn" className="Input" />
				<input type="submit" value="Đăng ký" className="InputButton" />
			</div>
		</div>
	);
}

function FooterContent() {
	return (
		<div className="FooterContent">
			<div className="Content">
				<div className="Contact">
					<img
						src="https://theme.hstatic.net/1000360516/1000609234/14/logo.png?v=1451"
						alt="logo"
						className="Logo"
					/>
					<p>DONGSUH FURNITURE - Nội Thất Hàn Quốc Online Số 1 Tại Việt Nam</p>
					<p>94-96 Nguyễn Văn Trỗi, P.8, Q.Phú Nhuận, TP.HCM</p>
					<a>(+84)938.38.15.13</a>
					<a>support@dongsuh.com.vn</a>
				</div>
				<div className="Nav">
					<h3>thông tin</h3>
					<ul>
						<li>
							<a href="">về chúng tôi</a>
						</li>
						<li>
							<a href="">thông tin liên hệ</a>
						</li>
						<li>
							<a href="">hướng dẫn mua hàng</a>
						</li>
						<li>
							<a href="">sản phẩm khuyến mãi</a>
						</li>
						<li>
							<a href="">thông tin tuyển dụng</a>
						</li>
					</ul>
				</div>
				<div className="Nav">
					<h3>chính sách</h3>
					<ul>
						<li>
							<a href="">chính sách thanh toán</a>
						</li>
						<li>
							<a href="">chích sách bảo hành</a>
						</li>
						<li>
							<a href="">chính sách đổi trả</a>
						</li>
						<li>
							<a href="">chính sách vận chuyển</a>
						</li>
						<li>
							<a href="">chính sách bảo mật</a>
						</li>
					</ul>
				</div>
				<div className="Method">
					<h3>Phương thức thanh toán</h3>
					<ul></ul>
				</div>
			</div>
		</div>
	);
}

export default function Footer() {
	return (
		<div className="Footer">
			<FooterContent />
			<FooterSubcribe />
			<FooterRight />
		</div>
	);
}
