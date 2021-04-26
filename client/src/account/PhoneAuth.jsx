import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";

import sendMessage from "./sendMessage";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";

const PhoneAuth = () => {
	const { currentUser } = useContext(AuthContext);

	const [phoneNumber, setPhoneNumber] = useState("");

	async function signInWithPhoneNumber() {
		console.log("SDT: ", `+84 ${phoneNumber.slice(1)}`);

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
			.signInWithPhoneNumber(`+84 ${phoneNumber.slice(1)}`, appVerifier)
			.then(function (confirmationResult) {
				console.log("Success");
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				// window.confirmationResult = confirmationResult;

				let code = window.prompt("Please enter the 6 digit code");
				return confirmationResult.confirm(code);
			})
			.then(() => {
				sendMessage("Successfully", "Xác thực thành công!", "success");
			})
			.catch(function (error) {
				sendMessage("Error happend!", error.toString(), "danger");
			});
	}

	if (currentUser) {
		return <Redirect to="/account" />;
	}

	return (
		<div className="Login__Form">
			<Grid container spacing={1} alignItems="flex-end">
				<Grid item>
					<AccountCircle />
				</Grid>
				<Grid item>
					<TextField
						id="input-with-icon-grid"
						type="phone"
						label="Phone number"
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
				</Grid>
			</Grid>

			<Link to="/signup">Sign up?</Link>

			<Button
				variant="outlined"
				color="secondary"
				id="recaptcha-container"
				onClick={() => signInWithPhoneNumber()}
			>
				Đăng nhập
			</Button>
		</div>
	);
};

export default PhoneAuth;
