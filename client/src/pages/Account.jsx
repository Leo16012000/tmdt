import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import { useSelector } from "react-redux";
import { store } from "react-notifications-component";
import { auth } from "../firebase";
import reduxStore from "../redux/store";
import { updateUser } from "../redux/action";

import "../styles/Account.css";

function Account(props) {
	const user = useSelector((state) => state.user);

	const [process, setProcess] = useState("signIn");
	const [values, setValues] = useState({
		username: "",
		password: "",
		password2: "",
	});

	const sendMessage = (title, message, type) => {
		store.addNotification({
			title: title,
			message: message,
			type: type,
			insert: "top",
			container: "top-right",
			animationIn: ["animate__animated", "animate__fadeIn"],
			animationOut: ["animate__animated", "animate__fadeOut"],
			dismiss: {
				duration: 2500,
				onScreen: true,
			},
		});
	};

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

	const onLogin = () => {
		auth
			.signInWithEmailAndPassword(values.username, values.password)
			.then((userCredential) => {
				// Signed in
				var user = userCredential.user;

				reduxStore.dispatch(
					updateUser(user.email, null, null, null, user.emailVerified)
				);

				if (!user.emailVerified) {
					setProcess("emailConfirmation");
				} else {
					sendMessage(
						`Xin chào ${user.displayName}`,
						"Chúc mừng bạn đã đăng nhập thành công",
						"success"
					);
				}
			})
			.catch((error) => {
				var errorMessage = error.message;
				sendMessage("Error with your credential!", errorMessage, "danger");
			});
	};

	const onRegister = () => {
		console.log("REGISTER");
		if (values.password === values.password2)
			auth
				.createUserWithEmailAndPassword(values.username, values.password)
				.then((credential) => {
					// Signed in
					console.log("credential: ", credential);
					var user = credential.user;
					reduxStore.dispatch(
						updateUser(user.email, null, null, null, user.emailVerified)
					);

					if (!user.emailVerified) {
						sendVerification();
						setProcess("emailConfirmation");
					}
					// ...
				})
				.catch((error) => {
					console.log(error);
					sendMessage("Error with your credential!", error.message, "danger");
					// ..
				});
		else {
			sendMessage(
				"Error with your credential!",
				"Mật khẩu bạn nhập không khớp!",
				"danger"
			);
		}
	};

	return (
		<div>
			{user.verify && <div>THAY ĐỔI THÔNG TIN</div>}

			{!user.verify && (
				<div>
					{process === "signIn" && (
						<div className="Login__Form">
							<Grid container spacing={1} alignItems="flex-end">
								<Grid item>
									<AccountCircle />
								</Grid>
								<Grid item>
									<TextField
										id="input-with-icon-grid"
										type="email"
										label="Username"
										onChange={handleChange("username")}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={1} alignItems="flex-end">
								<Grid item>
									<VpnKeyRoundedIcon />
								</Grid>
								<Grid item>
									<TextField
										id="input-with-icon-grid"
										type="password"
										label="Password"
										onChange={handleChange("password")}
									/>
								</Grid>
							</Grid>
							<p onClick={() => setProcess("signUp")}>Sign up?</p>
							<Button
								variant="outlined"
								color="secondary"
								onClick={() => onLogin()}
							>
								Đăng nhập
							</Button>
						</div>
					)}
					{process === "signUp" && (
						<div className="Register__Form">
							<Grid container spacing={1} alignItems="flex-end">
								<Grid item>
									<AccountCircle />
								</Grid>
								<Grid item>
									<TextField
										id="input-with-icon-grid"
										type="email"
										label="Username"
										onChange={handleChange("username")}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={1} alignItems="flex-end">
								<Grid item>
									<VpnKeyRoundedIcon />
								</Grid>
								<Grid item>
									<TextField
										id="input-with-icon-grid"
										type="password"
										label="Password"
										onChange={handleChange("password")}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={1} alignItems="flex-end">
								<Grid item>
									<VpnKeyRoundedIcon />
								</Grid>
								<Grid item>
									<TextField
										id="input-with-icon-grid"
										type="password"
										label="Re-enter password"
										onChange={handleChange("password2")}
									/>
								</Grid>
							</Grid>
							<p onClick={() => setProcess("signIn")}>Sign in?</p>
							<Button
								variant="outlined"
								color="secondary"
								onClick={() => onRegister()}
							>
								Đăng ký
							</Button>
						</div>
					)}
					{process === "emailConfirmation" && (
						<div class="Register__Form">Please check your email!</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Account;
