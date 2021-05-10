import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import { auth } from "../firebase";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import sendMessage from "./sendMessage";
import firebase from "firebase/app";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../styles/Account.css";

function Account(props) {
	const { currentUser } = useContext(AuthContext);

	console.log("user ", currentUser);

	const [values, setValues] = useState({
		Email: "",
		Fullname: "",
		PhoneNum: "",
		Address: "",
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const onProfileChange = () => {
		console.log("user:", currentUser);
	};

	if (!currentUser) {
		return (
			<div style={{ margin: "20px" }}>
				<h4>Vui lòng đăng nhập trước khi sử dụng tính năng này!</h4>
				<Link to="/login">Log In</Link> or <Link to="/signup">Sign Up</Link>
			</div>
		);
	}

	return (
		<div className="Account__profile">
			<h1>THAY ĐỔI THÔNG TIN</h1>
			<Avatar
				alt="avatar"
				style={{ width: "200px", height: "200px" }}
				src="https://i.pinimg.com/originals/64/aa/4c/64aa4cb31e0a64ec096c41f45c8de878.png"
			/>
			<TextField
				id="input-with-icon-grid"
				type="email"
				label="Họ và tên"
				onChange={handleChange("displayName")}
				defaultValue={currentUser ? currentUser.Fullname : ""}
			/>
			<TextField
				id="input-with-icon-grid"
				type="email"
				label="Số điện thoại"
				onChange={handleChange("phoneNumber")}
				defaultValue={currentUser ? currentUser.PhoneNum : ""}
			/>
			<TextField
				id="input-with-icon-grid"
				type="email"
				label="Địa chỉ"
				onChange={handleChange("phoneNumber")}
				defaultValue={currentUser ? currentUser.Address : ""}
			/>
			<Button
				variant="outlined"
				color="primary"
				id="recaptcha-container"
				onClick={() => onProfileChange()}
			>
				Lưu thông tin
			</Button>
			<Button
				variant="outlined"
				color="secondary"
				onClick={() => auth.signOut()}
			>
				Đăng xuất
			</Button>
		</div>
	);
}

export default Account;
