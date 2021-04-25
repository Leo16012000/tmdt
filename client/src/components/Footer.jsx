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
import logo from "../images/logo.png";

function FooterRight() {
  return (
    <div className="FooterRight">
      Website by <b>BKTeam</b>
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
          <img src={logo} alt="logo" />
          <p>HOME FUNISHINGS - Nội Thất Sang Trọng Dành Cho Căn Nhà Của Bạn</p>
          <p>94-96 Nguyễn Văn Trỗi, P.8, Q.Phú Nhuận, TP.HCM</p>
          <a href="/">(+84)938.38.15.13</a>
          <a href="/">support@dongsuh.com.vn</a>
        </div>
        <div className="Nav">
          <h3>Thông tin</h3>
          <ul>
            <li>
              <a href="/">Về chúng tôi</a>
            </li>
            <li>
              <a href="/">Thông tin liên hệ</a>
            </li>
            <li>
              <a href="/">Hướng dẫn mua hàng</a>
            </li>
            <li>
              <a href="/">Sản phẩm khuyến mãi</a>
            </li>
            <li>
              <a href="/">Thông tin tuyển dụng</a>
            </li>
          </ul>
        </div>
        <div className="Nav">
          <h3>Chính sách</h3>
          <ul>
            <li>
              <a href="/">Chính sách thanh toán</a>
            </li>
            <li>
              <a href="/">Chính sách bảo hành</a>
            </li>
            <li>
              <a href="/">Chính sách đổi trả</a>
            </li>
            <li>
              <a href="/">Chính sách vận chuyển</a>
            </li>
            <li>
              <a href="/">Chính sách bảo mật</a>
            </li>
          </ul>
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
