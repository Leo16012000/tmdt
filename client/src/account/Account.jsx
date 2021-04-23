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
		displayName: "",
		phoneNumber: "",
		photoUrl: "",
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const sendEmailVerification = () => {
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
		// Xác thực sđt trước
		window.appVerifier = new firebase.auth.RecaptchaVerifier(
			"recaptcha-container",
			{
				size: "invisible",
				// Bỏ qua xác thực hình ảnh trước
				// callback: (res) => {},
			}
		);

		const appVerifier = window.appVerifier;

		firebase
			.auth()
			.currentUser.linkWithPhoneNumber(
				`+84${values.phoneNumber.slice(1)}`,
				appVerifier
			)
			.then((confirmationResult) => {
				window.confirmationResult = confirmationResult;
				// prompt user to entre code
				let code = window.prompt(
					"Please enter the 6 digit code from your phone number!"
				);

				confirmationResult
					.confirm(code)
					.then((result) => {
						const credential = firebase.auth.PhoneAuthProvider.credential(
							window.confirmationResult.verificationId,
							code
						);
						firebase.auth().currentUser.linkWithCredential(credential);
					})
					.then((res) => {
						sendMessage("Successfully", "Xác thực thành công!", "success");
					})
					.catch((error) => {
						// reset rechatcha and try again
						sendMessage("Error happend!", error.toString(), "danger");
					});
			})
			.catch((error) => {
				// reset rechatcha and try again
				sendMessage("Error happend!", error.toString(), "danger");
			});

		auth.currentUser
			.updateProfile({
				displayName: values.displayName,
				photoURL: "/photo",
			})
			.then(() => {
				sendMessage(
					"Cập nhật thông tin thành công!",
					"Successfully",
					"success"
				);
			});

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
				src="https://2sao.vietnamnetjsc.vn/images/2021/02/04/10/28/tvn-apologizes-over-chanyeol-s-controversial-subtitle.jpg"
			/>
			<TextField
				id="input-with-icon-grid"
				type="email"
				label="Họ và tên"
				onChange={handleChange("displayName")}
				defaultValue={currentUser ? currentUser.displayName : ""}
			/>
			<TextField
				id="input-with-icon-grid"
				type="email"
				label="Số điện thoại"
				onChange={handleChange("phoneNumber")}
				defaultValue={currentUser ? currentUser.phoneNumber : ""}
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
