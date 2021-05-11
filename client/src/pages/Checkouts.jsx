import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOrderInfo } from "../redux/action";
import { AuthContext } from "../account/Auth";
import { Link, Redirect, useHistory } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import sendMessage from "../account/sendMessage";
import LocalPicker from "../vietnamlocalselector";

import "../styles/Checkouts.css";

const axios = require("axios");

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Checkouts(props) {
	let history = useHistory();
	const dispatch = useDispatch();
	const { currentUser } = useContext(AuthContext);
	const defaultInfo = currentUser
		? {
				email: currentUser.email,
				displayName: currentUser.displayName,
				phoneNumber: currentUser.phoneNumber,
		  }
		: {};
	const listCart = useSelector((state) => state.listCart);
	const [values, setValues] = useState(defaultInfo);
	const [expanded, setExpanded] = useState("panel1");
	const [method, setMethod] = useState("momo");
	const [open, setOpen] = useState(false);
	var finalPrice = 0;

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickDialog = () => {
		setOpen(!open);
	};

	function moveNextStep(isCOD) {
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
			console.log("addressDelivery: ", addressDelivery);
			// // dispatch order info
			// dispatch(sendOrderInfo(values)); //late for a value
			// console.log(values);
			//open dialog?
			setOpen(!isCOD);
			console.log(values);
			dispatch(sendOrderInfo(values, addressDelivery, isCOD)); //late for a value
			if (isCOD) history.push("/update-order");
		}
	}

	const SendPayment = () => {
		// send order infomation into redux
		console.log(values);
		dispatch(sendOrderInfo(values));
		//
		if (method === "momo")
			axios
				.post("/api/momo", { amount: finalPrice })
				.then((res) => {
					const dataRes = res.data;
					if (dataRes.statusCode === 200)
						if (dataRes.body.errorCode === 0)
							window.location.href = dataRes.body.payUrl;
						else if (dataRes.body.errorCode === 4)
							sendMessage(
								"Error happened!",
								"Số tiền thanh toán cần nhỏ hơn 50 triệu, vui lòng cho phương thức khác!",
								"danger"
							);
						else
							sendMessage(
								"Error happened!",
								dataRes.body.localMessage,
								"danger"
							);
					else console.log("Something wrong happened!");
				})
				.catch((err) => console.log(err));
		else if (method === "vnpay") {
			axios
				.post("/create_payment_url", {
					amount: finalPrice,
					language: "vn",
					orderDescription: "Thanh toan noi that",
					orderType: "Noi that",
				})
				.then((res) => {
					const dataRes = res;
					if (dataRes.status === 200)
						if (!dataRes.errorCode) window.location.href = dataRes.data;
						else console.log(dataRes.body.localMessage);
					else console.log("Something wrong happened!");
				})
				.catch((err) => console.log(err));
		}
	};

	useEffect(() => {
		// Load Location
		LocalPicker();
	}, []);

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
						<Link color="inherit" to="/checkouts">
							Thông tin vận chuyển
						</Link>
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
						required
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
						required
						onChange={handleChange("phoneNumber")}
						defaultValue={currentUser ? currentUser.phoneNumber : ""}
						id="phoneNumber"
					/>
					<TextField
						label="Địa chỉ"
						variant="outlined"
						margin="dense"
						id="address"
						required
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
								<div class="select">
									<select id="ls_province" />
								</div>
								<div class="select">
									<select id="ls_district" />
								</div>
								<div class="select">
									<select id="ls_ward" />
								</div>
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

					{/* Thanh toán thành công */}

					<div className="methodPayment" onClick={() => moveNextStep(1)}>
						<p>Thanh toán tiền mặt</p>
					</div>
					{/*  */}

					<div className="methodPayment" onClick={() => moveNextStep(0)}>
						<p>Thanh toán trực tuyến</p>
					</div>
					<Dialog
						open={open}
						maxWidth="xl"
						onClose={handleClickDialog}
						aria-labelledby="responsive-dialog-title"
					>
						<DialogTitle id="responsive-dialog-title">
							PHƯƠNG THỨC THANH TOÁN
						</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Bạn vui lòng chọn một trong số những phương thức thanh toán sau.
							</DialogContentText>
							<div className="radio-group row justify-content-between px-3 text-center a">
								<div
									className={`col-auto mr-sm-2 mx-1 card-block py-0 text-center radio ${
										method === "momo" ? "selected" : ""
									}`}
									onClick={() => setMethod("momo")}
								>
									<div className="flex-row">
										<div className="col">
											<div className="pic">
												<img
													className="irc_mut img-fluid"
													src="https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1458245625/pwegh6kadcb37kuz0woj.png"
													alt="momo-logo"
													width="100"
													height="100"
												/>
											</div>
											<p>Thanh toán trực tuyến qua MoMo</p>
										</div>
									</div>
								</div>
								<div
									className={`col-auto mr-sm-2 mx-1 card-block py-0 text-center radio ${
										method === "vnpay" ? "selected" : ""
									}`}
									onClick={() => setMethod("vnpay")}
								>
									<div className="flex-row">
										<div className="col">
											<div className="pic">
												<img
													className="irc_mut img-fluid"
													src="https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/fux5pruztupxjy0lcxv0"
													alt="vnpay-logo"
													width="100"
													height="100"
												/>
											</div>
											<p>Thanh toán trực tuyến qua VNPAY</p>
										</div>
									</div>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							<Button autoFocus onClick={handleClickDialog} color="primary">
								Bỏ qua
							</Button>
							<Button onClick={() => SendPayment()} color="primary" autoFocus>
								Thanh toán
							</Button>
						</DialogActions>
					</Dialog>
				</footer>
			</div>
			<div className="Checkouts__conclusion">
				<div className="products">
					{listCart?.map((product) => {
						finalPrice += product.quantity * product.unitCost;
						if (product.quantity)
							return (
								<div className="product" key={product.id}>
									<div className="product__thumbnail">
										<img src={product.image} alt="product__thumbnail" />
										<p className="product__quantity">{product.quantity}</p>
									</div>
									<div className="product__info">
										<p>{product.name}</p>
									</div>
									<p className="product__price">
										{numberWithCommas(product.unitCost)}₫
									</p>
								</div>
							);
					})}
				</div>
				<div className="finalPrice">
					<p>Tổng tiền</p>
					<div>
						<p>VND</p>
						<h4>{numberWithCommas(finalPrice)}₫</h4>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkouts;
