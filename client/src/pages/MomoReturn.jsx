import { React, useState, useEffect } from "react";
// import Alert from '@material-ui/lab/Alert';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheckCircle,
	faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/VPNReturn.css";

function MomoReturn(props) {
	const [state, setState] = useState({});

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const localMessage = urlParams.get("localMessage");
		const errorCode = urlParams.get("errorCode");

		if (errorCode === "0")
			setState({
				localMessage,
				message: {
					msg: "Giao dịch thành công",
					color: "#39b35a",
					type: "success",
					icon: faCheckCircle,
				},
			});
		else
			setState({
				localMessage,
				message: {
					msg: "Giao dịch thất bại",
					color: "#eb4e2c",
					type: "error",
					icon: faExclamationCircle,
				},
			});
	}, []);

	console.log(state);

	return (
		<div className="VPNReturn">
			{state.message && (
				<div
					className="Message"
					style={{ border: "5px solid" + state.message.color }}
				>
					<div className="Message_inner">
						<FontAwesomeIcon
							icon={state.message.icon}
							size="4x"
							color={state.message.color}
						/>
						<h4>{state.message.msg}</h4>
						<h5>{state.localMessage}</h5>
					</div>
				</div>
			)}
			<Button>
				<Link to="/">Về trang chủ</Link>
			</Button>
		</div>
	);
}

export default MomoReturn;
