import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../account/Auth";
import { Link, Redirect } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import LocalPicker from "../vietnamlocalselector";

import "../styles/Checkouts.css";
import sendMessage from "../account/sendMessage";

function Checkouts(props) {
	const { currentUser } = useContext(AuthContext);
	const defaultInfo = currentUser
		? {
				email: currentUser.email,
				displayName: currentUser.displayName,
				phoneNumber: currentUser.phoneNumber,
		  }
		: {};

	const [values, setValues] = useState(defaultInfo);
	const [expanded, setExpanded] = useState("panel1");
	const [redirect, setRedirect] = useState(null);

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const moveNextStep = (e) => {
		var errors = [];

		const ls_province = document.getElementById("ls_province")
			.selectedOptions[0];

		const ls_district = document.getElementById("ls_district");

		const ls_ward = document.getElementById("ls_ward");

		if (!values.displayName) errors.push("Tên không được để trống!");

		if (!values.phoneNumber) errors.push("Số điện thoại không được để trống!");

		if (!values.address) errors.push("Địa chỉ không được để trống!");

		if (expanded === "panel1" && !ls_ward.value)
			errors.push("Vui lòng chọn địa chỉ giao hàng!");

		if (errors?.length)
			errors.map((err) => sendMessage("Error happened!", err, "danger"));
		else {
			const addressDelivery =
				ls_ward.selectedOptions[0].innerText +
				", " +
				ls_district.selectedOptions[0].innerText +
				", " +
				ls_province.dataset.level +
				" " +
				ls_province.innerText;
			setValues({ ...values, addressDelivery: addressDelivery });
			setRedirect(`/checkouts?step=2`);
		}
	};

	useEffect(() => {
		// Load Location
		LocalPicker();
	}, []);

	if (redirect) return <Redirect to={redirect} />;

	return (
		<div className="Checkouts__container">
			<div className="Checkouts__info">
				<header>
					<h3>Dongsuh Furniture</h3>
					<Breadcrumbs
						separator={<NavigateNextIcon fontSize="small" />}
						aria-label="breadcrumb"
					>
						<Link color="inherit" to="/cart">
							Giỏ hàng
						</Link>
						<Link color="inherit" to="/getting-started/installation/">
							Thông tin vận chuyển
						</Link>
						<Typography color="textPrimary">Phương thức thanh toán</Typography>
					</Breadcrumbs>
					<h5>Thông tin vận chuyển</h5>
					{!currentUser && (
						<p>
							Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
						</p>
					)}
				</header>
				<main>
					<TextField
						label="Họ và tên"
						variant="outlined"
						margin="dense"
						id="fullName"
						onChange={handleChange("displayName")}
						defaultValue={currentUser ? currentUser.displayName : ""}
						fullWidth
					/>
					<TextField
						label="Email"
						variant="outlined"
						margin="dense"
						onChange={handleChange("email")}
						defaultValue={currentUser ? currentUser.email : ""}
						id="email"
					/>
					<TextField
						label="Điện thoại"
						variant="outlined"
						margin="dense"
						onChange={handleChange("phoneNumber")}
						defaultValue={currentUser ? currentUser.phoneNumber : ""}
						id="phoneNumber"
					/>
					<TextField
						label="Địa chỉ"
						variant="outlined"
						margin="dense"
						id="address"
						onChange={handleChange("address")}
						fullWidth
					/>

					<div className="Checkouts__delivery">
						<Accordion
							expanded={expanded === "panel1"}
							onChange={() => setExpanded("panel1")}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>Giao hàng</Typography>
							</AccordionSummary>
							<AccordionDetails className="selectContainer">
								<select id="ls_province" />
								<select id="ls_district" />
								<select id="ls_ward" />
							</AccordionDetails>
						</Accordion>
						<Accordion
							expanded={expanded === "panel2"}
							onChange={() => setExpanded("panel2")}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel2a-content"
								id="panel2a-header"
							>
								<Typography>Nhận tại cửa hàng</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget.
								</Typography>
							</AccordionDetails>
						</Accordion>
					</div>
				</main>
				<footer>
					<Link to="/cart">
						<div className="backToCart">
							<ArrowBackIosIcon />
							<p>Giỏ hàng</p>
						</div>
					</Link>

					<div
						to="/checkouts?step=2"
						className="nextStep"
						onClick={(e) => moveNextStep(e)}
					>
						<p>Phương thức thanh toán</p>
					</div>
				</footer>
			</div>
			<div className="Checkouts__conclusion">
				<div className="products">
					<div className="product">
						<div className="product__thumbnail">
							<img
								src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTgzLHajkq5kyTvBNpN4i6kb7CsflEi3GBZXNkxk_BgKMNKUBRcw1LkV6zct8XapA&usqp=CAc"
								alt="product__thumbnail"
							/>
						</div>
						<div className="product__info">
							<p>VNL001 - BỘ BÀN ĂN VANILLA 4 GHẾ ĐƠN</p>
						</div>
						<p className="product__price">7,273,000₫</p>
					</div>

					<div className="product">
						<div className="product__thumbnail">
							<img
								src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTgzLHajkq5kyTvBNpN4i6kb7CsflEi3GBZXNkxk_BgKMNKUBRcw1LkV6zct8XapA&usqp=CAc"
								alt="product__thumbnail"
							/>
						</div>
						<div className="product__info">
							<p>VNL001 - BỘ BÀN ĂN VANILLA 4 GHẾ ĐƠN</p>
						</div>
						<p className="product__price">7,273,000₫</p>
					</div>
				</div>
				<div className="finalPrice">
					<p>Tổng tiền</p>
					<div>
						<p>VND</p>
						<h4>7,273,000₫</h4>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkouts;
