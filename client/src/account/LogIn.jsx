import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

import "firebase/auth";

import sendMessage from "./sendMessage";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";

const LogIn = () => {
	const { currentUser } = useContext(AuthContext);
	const [values, setValues] = useState({ username: "", password: "" });

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const onLogin = () => {
		auth
			.signInWithEmailAndPassword(values.username, values.password)
			.then((user) => {
				sendMessage(
					`Xin chào ${user.displayName}`,
					"Chúc mừng bạn đã đăng nhập thành công",
					"success"
				);
			})
			.catch((error) => {
				// alert(error);
				sendMessage("Error with your credential!", error.toString(), "danger");
			});
	};

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
			<Link to="/signup">Sign up?</Link>

			<Link to="/phoneauth">Login with Phone number?</Link>
			<Button variant="outlined" color="secondary" onClick={() => onLogin()}>
				Đăng nhập
			</Button>
		</div>
	);
};

export default LogIn;
