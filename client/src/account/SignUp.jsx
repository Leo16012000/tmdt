import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import sendMessage from "./sendMessage";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";

const SignUp = () => {
	const [currentUser, setCurrentUser] = useState(null);
	const [values, setValues] = useState({
		username: "",
		password: "",
		password2: "",
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const onRegister = () => {
		if (values.password !== values.password2)
			sendMessage(
				"Error with your credential!",
				"Mật khẩu bạn nhập không khớp!",
				"danger"
			);
		else
			auth
				.createUserWithEmailAndPassword(values.username, values.password)
				.then((user) => {
					setCurrentUser(true);
				})
				.catch((error) => {
					sendMessage(
						"Error with your credential!",
						error.toString(),
						"danger"
					);
				});
	};

	if (currentUser) {
		return <Redirect to="/account" />;
	}

	return (
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
			<Link to="/login">Sign in?</Link>
			<Button variant="outlined" color="secondary" onClick={() => onRegister()}>
				Đăng ký
			</Button>
		</div>
	);
};

export default SignUp;
