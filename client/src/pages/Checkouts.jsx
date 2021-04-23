import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LocalPicker from "../vietnamlocalselector";

import "../styles/Checkouts.css";

function Checkouts(props) {
	useEffect(() => {
		// Load Location
		const test = new LocalPicker();
	});

	const [expanded, setExpanded] = React.useState("panel1");

	return (
		<div className="Checkouts__container">
			<div className="Checkouts__info">
				<header>
					<h3>Dongsuh Furniture</h3>
					<Breadcrumbs
						separator={<NavigateNextIcon fontSize="small" />}
						aria-label="breadcrumb"
					>
						<Link color="inherit" href="/">
							Material-UI
						</Link>
						<Link color="inherit" href="/getting-started/installation/">
							Core
						</Link>
						<Typography color="textPrimary">Breadcrumb</Typography>
					</Breadcrumbs>
					<h4>Thông tin thanh toán</h4>
					<p>
						Bạn đã có tài khoản? <Link to="signin">Đăng nhập</Link>
					</p>
				</header>
				<main>
					<TextField
						label="Họ và tên"
						variant="outlined"
						margin="dense"
						id="fullName"
						fullWidth
					/>
					<TextField
						label="Email"
						variant="outlined"
						margin="dense"
						id="email"
					/>
					<TextField
						label="Điện thoại"
						variant="outlined"
						margin="dense"
						id="phoneNumber"
					/>
					<TextField
						label="Địa chỉ"
						variant="outlined"
						margin="dense"
						id="address"
						fullWidth
					/>

					<div className="Checkouts__delivery">
						<Accordion
							expanded={expanded === "panel1"}
							onChange={() => setExpanded("panel1")}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>Giao hàng</Typography>
							</AccordionSummary>
							<AccordionDetails className="selectContainer">
								<select id="ls_province"></select>
								<select id="ls_district"></select>
								<select id="ls_ward"></select>
							</AccordionDetails>
						</Accordion>
						<Accordion
							expanded={expanded === "panel2"}
							onChange={() => setExpanded("panel2")}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel2a-content"
								id="panel2a-header"
							>
								<Typography>Nhận tại cửa hàng</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget.
								</Typography>
							</AccordionDetails>
						</Accordion>
					</div>
				</main>
			</div>
			<div className="Checkouts__conclusion">
				<h1>Conclusion</h1>
			</div>
		</div>
	);
}

export default Checkouts;
