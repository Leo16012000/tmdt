import React from "react";
import { Link } from "react-router-dom";

Cart.propTypes = {};

function Cart(props) {
	return (
		<div>
			<h1>Cart Page</h1>
			<Link to="/checkouts">Thanh toán</Link>
		</div>
	);
}

export default Cart;
