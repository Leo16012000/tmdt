import Axios from "axios";
import { React, useState, useEffect } from "react";
// import Alert from '@material-ui/lab/Alert';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheckCircle,
	faExclamationCircle,
	faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/VPNReturn.css";

const apiURL =
	"http://localhost:3001/vnpay_return?" +
	new URLSearchParams(window.location.search);



function VPNReturn(props) {
	const [state, setState] = useState({});

	useEffect(() => {
		const getApiUrl = () => {
			Axios.get(apiURL).then((response) => {
				setState(response.data);
			});
		};

		getApiUrl();
	}, []);

	var message = {};

	console.log(state)

	if (state.code === "00") {
		message = {
			msg: "Giao dịch thành công",
			color: "#39b35a",
			type: "success",
			icon: faCheckCircle,
		};
	} else if (state.code === "01") {
		message = {
			msg: "Giao dịch đã tồn tại",
			color: "#ef9400",
			type: "warning",
			icon: faExclamationTriangle,
		};
	} else {
		message = {
			msg: "Giao dịch thất bại",
			color: "#eb4e2c",
			type: "error",
			icon: faExclamationCircle,
		};
	}

	return (
		<div className="VPNReturn">
			<div className="Message" style={{ border: "5px solid" + message.color }}>
				<div className="Message_inner">
					<FontAwesomeIcon
						icon={message.icon}
						size="4x"
						color={message.color}
					/>
					<h4>{message.msg}</h4>
				</div>
			</div>
			<Button>
				<Link to="/">Về trang chủ</Link>
			</Button>
		</div>
	);
}

export default VPNReturn;
