import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import "../styles/TopNavigation.css";
import { useSelector, useDispatch } from "react-redux";
import { roomFilter, categoryFilter } from "../redux/action";
import { Button } from "@material-ui/core";

function TopNavigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleFilter(room, category) {
    dispatch(room);
    dispatch(category);
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
              <div id="account">
                <Link to="/account">Tài khoản</Link>
                {!user.email && (
                  <div id="options">
                    <Link to="/account">Đăng nhập</Link>
                    <Link to="/account">Đăng ký</Link>
                  </div>
                )}
              </div>
              <div id="shop">
                <Link to="/cart">Giỏ hàng</Link>
              </div>
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
              <Button
                onClick={() =>
                  handleFilter(roomFilter(1), categoryFilter("all"))
                }
              >
                <Link to="/">Trang chủ</Link>
              </Button>
            </li>
            <li className="dropdown">
              <Button
                onClick={() => {
                  handleFilter(roomFilter(1), categoryFilter("all"));
                }}
              >
                <Link to="/collections">Phòng khách</Link>
                <ExpandMoreIcon />
              </Button>
              <ul>
                <div id="top--black"></div>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  <Button
                    onClick={() =>
                      handleFilter(roomFilter(1), categoryFilter("bàn"))
                    }
                  >
                    <Link to="/collections">Bàn</Link>
                  </Button>
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  <Button
                    onClick={() =>
                      handleFilter(roomFilter(1), categoryFilter("tủ"))
                    }
                  >
                    <Link to="/collections">Tủ</Link>
                  </Button>
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  <Button
                    onClick={() =>
                      handleFilter(roomFilter(1), categoryFilter("giá"))
                    }
                  >
                    <Link to="/collections">Giá</Link>
                  </Button>
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  <Button
                    onClick={() =>
                      handleFilter(roomFilter(1), categoryFilter("kệ"))
                    }
                  >
                    <Link to="/collections">Kệ</Link>
                  </Button>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <Button
                onClick={() => {
                  handleFilter(roomFilter(2), categoryFilter("all"));
                }}
              >
                <Link to="/collections">Phòng ngủ</Link>
                <ExpandMoreIcon />
              </Button>
              <ul>
                <div id="top--black"></div>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  <Button
                    onClick={() =>
                      handleFilter(roomFilter(2), categoryFilter("bàn"))
                    }
                  >
                    <Link to="/collections">Bàn</Link>
                  </Button>
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  <Button
                    onClick={() =>
                      handleFilter(roomFilter(2), categoryFilter("tủ"))
                    }
                  >
                    <Link to="/collections">Tủ</Link>
                  </Button>
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  <Button
                    onClick={() =>
                      handleFilter(roomFilter(2), categoryFilter("gối"))
                    }
                  >
                    <Link to="/collections">Gối</Link>
                  </Button>
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  <Button
                    onClick={() =>
                      handleFilter(roomFilter(2), categoryFilter("giường"))
                    }
                  >
                    <Link to="/collections">Giường</Link>
                  </Button>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <Button
                onClick={() => {
                  handleFilter(roomFilter(3), categoryFilter("all"));
                }}
              >
                <Link to="/collections">Phòng ăn</Link>
                <ExpandMoreIcon />
              </Button>
              <ul>
                <div id="top--black"></div>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  <Button
                    onClick={() =>
                      handleFilter(roomFilter(3), categoryFilter("bàn"))
                    }
                  >
                    <Link to="/collections">Bàn</Link>
                  </Button>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <Button
                onClick={() => {
                  handleFilter(roomFilter(4), categoryFilter("all"));
                }}
              >
                <Link to="/collections">Phòng học/làm việc</Link>
                <ExpandMoreIcon />
              </Button>
              <ul>
                <div id="top--black"></div>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  <Button
                    onClick={() =>
                      handleFilter(roomFilter(4), categoryFilter("bàn"))
                    }
                  >
                    <Link to="/collections">Bàn</Link>
                  </Button>
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  <Button
                    onClick={() =>
                      handleFilter(roomFilter(4), categoryFilter("kệ"))
                    }
                  >
                    <Link to="/collections">Kệ</Link>
                  </Button>
                </li>
                <li className="dropdown-item">
                  <ArrowRightIcon />
                  <Button
                    onClick={() =>
                      handleFilter(roomFilter(4), categoryFilter("tủ"))
                    }
                  >
                    <Link to="/collections">Tủ</Link>
                  </Button>
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
