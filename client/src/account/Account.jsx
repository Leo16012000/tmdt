import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import { auth } from "../firebase";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import sendMessage from "./sendMessage";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../styles/Account.css";

function Account(props) {
	const { currentUser } = useContext(AuthContext);

	const [values, setValues] = useState({
		username: "",
		password: "",
		password2: "",
		displayName: "",
		phoneNumber: "",
		photoUrl: "",
		address: "",
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
		console.log(values);
	};

	const sendVerification = () => {
		var user = auth.currentUser;

		user
			.sendEmailVerification()
			.then(() => {
				console.log("Email sended");
			})
			.catch((err) => {
				window.alert(err);
			});
	};

	const onProfileChange = () => {
		console.log(currentUser);
	};
	// 	auth.onAuthStateChanged(function (user) {
	// 		if (user) {
	// 			dispatch(
	// 				updateUser(
	// 					user.email,
	// 					values.displayName,
	// 					values.phoneNumber,
	// 					values.photoUrl,
	// 					values.address,
	// 					user.verify
	// 				)
	// 			);

	// 			user
	// 				.updateProfile({
	// 					displayName: values.displayName,
	// 					photoURL: values.photoUrl,
	// 					phoneNumber: values.phoneNumber,
	// 					address: values.address,
	// 					verify: user.verify,
	// 				})
	// 				.then(
	// 					sendMessage(
	// 						"Cập nhật thông tin thành công!",
	// 						"Successfully",
	// 						"success"
	// 					)
	// 				);
	// 		} else {
	// 			console.log("Not login");
	// 		}
	// 	});
	// };

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
				src="https://2sao.vietnamnetjsc.vn/images/2021/02/04/10/28/tvn-apologizes-over-chanyeol-s-controversial-subtitle.jpg"
			/>
			<TextField
				id="input-with-icon-grid"
				type="email"
				label="Họ và tên"
				// placeholder={user.displayName ? user.displayName : ""}
				onChange={handleChange("displayName")}
			/>
			<TextField
				id="input-with-icon-grid"
				type="email"
				label="Số điện thoại"
				onChange={handleChange("phoneNumber")}
			/>
			<TextField
				id="input-with-icon-grid"
				type="email"
				label="Địa chỉ"
				onChange={handleChange("address")}
			/>

			<Button
				variant="outlined"
				color="primary"
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
