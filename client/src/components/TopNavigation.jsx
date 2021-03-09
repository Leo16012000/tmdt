import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import "../styles/TopNavigation.css";

function TopNavigation() {
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
							<p id="account">Tài Khoản</p>
							<p id="shop">Giỏ Hàng</p>
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
							<a href="/">Trang chủ</a>
						</li>
						<li className="dropdown">
							<a href="/">Phòng khách</a>
							<ul>
								<li className="dropdown-item">item 1</li>
								<li className="dropdown-item">item 2</li>
								<li className="dropdown-item">item 3</li>
							</ul>
						</li>
						<li className="dropdown">
							<a href="/">Phòng ngủ</a>
							<ul>
								<li className="dropdown-item">item 1</li>
								<li className="dropdown-item">item 2</li>
								<li className="dropdown-item">item 3</li>
							</ul>
						</li>
						<li className="dropdown">
							<a href="/">
								Phòng ăn
								<ExpandMoreIcon />
							</a>
							<ul>
								<li className="dropdown-item">item 1</li>
								<li className="dropdown-item">item 2</li>
								<li className="dropdown-item">item 3</li>
							</ul>
						</li>
						<li className="dropdown">
							<a href="/">Phòng học / làm việc </a>
							<ul>
								<li className="dropdown-item">item 1</li>
								<li className="dropdown-item">item 2</li>
								<li className="dropdown-item">item 3</li>
							</ul>
						</li>
						<li className="dropdown">
							<a href="/">Sản phẩm khác</a>
							<ul>
								<li className="dropdown-item">item 1</li>
								<li className="dropdown-item">item 2</li>
								<li className="dropdown-item">item 3</li>
							</ul>
						</li>
						<li>
							<a href="/">Khuyến mãi</a>
						</li>
						<li className="dropdown">
							<a href="/">Tin tức</a>
							<ul>
								<li className="dropdown-item">item 1</li>
								<li className="dropdown-item">item 2</li>
								<li className="dropdown-item">item 3</li>
							</ul>
						</li>
						<li>
							<a href="/">Liên hệ</a>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}

export default TopNavigation;
