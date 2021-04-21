import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import "../styles/TopNavigation.css";
import Account from "./Account";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { roomFilter } from "../redux/action";

function TopNavigation() {
  const dispatch = useDispatch();
  function handleFilterRoom(roomKind) {
    dispatch(roomFilter(roomKind));
  }
  return (
    <header className="TopNavigation">
      <div className="TopNavigation__container--top">
        <div className="wrapper">
          <img
            src="https://theme.hstatic.net/1000360516/1000609234/14/logo.png?v=1449"
            alt="logo"
          />
          <input placeholder="Tìm kiếm sản phẩm..." />
          <div className="items">
            <p>
              Hotline: <a href="tel:(+84) 938.38.15.13">(+84) 938.38.15.13</a>
            </p>
            <div className="info">
              <p id="account">
                <Link to="/account">Tài khoản</Link>
              </p>
              <p id="shop">
                <Link to="/cart">Giỏ hàng</Link>
              </p>
              <ShoppingCartOutlinedIcon />
              <PersonOutlineOutlinedIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="TopNavigation__container--mainMenu">
        <div className="wrapper">
          <ul className="list">
            <li>
              <Button onClick={() => handleFilterRoom(0)}>
                <Link to="/">Trang chủ</Link>
              </Button>
            </li>
            <li className="dropdown">
              <Button onClick={() => handleFilterRoom(1)}>
                <Link to="/collections">Phòng khách</Link>
                <ExpandMoreIcon />
              </Button>
              <ul>
                <div id="top--black"></div>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  Ghế sofa
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  Bàn trà
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  Kệ trang trí
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  Tủ trang trí
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  Tivi
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  Giá treo quần áo
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <Button onClick={() => handleFilterRoom(2)}>
                Phòng ngủ
                <ExpandMoreIcon />
              </Button>
              <ul>
                <div id="top--black"></div>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  Giường ngủ
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  Bàn trang điểm
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  Tủ quần áo
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  Tủ đầu giường
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  Gối ngủ
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <Button onClick={() => handleFilterRoom(3)}>
                Phòng ăn
                <ExpandMoreIcon />
              </Button>
              <ul>
                <div id="top--black"></div>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  Bàn ăn
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <Button onClick={() => handleFilterRoom(4)}>
                Phòng học / làm việc
                <ExpandMoreIcon />
              </Button>
              <ul>
                <div id="top--black"></div>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  Bộ bàn học/làm việc
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  Kệ sách
                </li>
              </ul>
            </li>

            <li>
              <a href="/">Khuyến mãi</a>
            </li>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default TopNavigation;
