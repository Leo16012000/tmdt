import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import "../styles/Login.css";

import "firebase/auth";
import { Form, Input, Button } from "antd";
import sendMessage from "./sendMessage";

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};

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
			<h6> Đăng Nhập </h6>

			<Form
				{...layout}
				name="basic"
				initialValues={{
					remember: true,
				}}
				onFinish={() => onLogin()}
				onFinishFailed=""
			>
				<Form.Item
					label="Username"
					type="email"
					name="username"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
					onChange={handleChange("username")}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
					onChange={handleChange("password")}
				>
					<Input.Password />
				</Form.Item>
				<div className="column">
					<Link to="/signup">Sign up?</Link>
					<Link to="/phoneauth">Login with Phone number?</Link>
				</div>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default LogIn;
