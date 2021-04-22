import Axios from "axios";
import { React, useState, useEffect } from "react";

function VPNReturn(props) {
	const [state, setState] = useState({});

	const apiURL = "http://localhost:8080/vnpay_return" + props.location.search;

	console.log(apiURL);

	useEffect(() => {
		Axios.get(apiURL).then((response) => {
			setState(response.data);
		});
	});

	console.log(state);

	return (
		<div>
			<div>{state.code}</div>
		</div>
	);
}

export default VPNReturn;
