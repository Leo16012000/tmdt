import React from "react";
import "../styles/ItemCard.css";

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ItemCard() {
	const props = {
		name: "DB026 - GIƯỜNG NGỦ GỖ ĐÈN LED NGĂN KÉO",
		price: "14525000",
		salePercent: "60",
		src:
			"https://product.hstatic.net/1000360516/product/db026_3_6ebe92f0888c442d8b7cf7ad171a99b4_medium.jpg",
	};

	return (
		<div className="ItemCard">
			<div>
				<section className="ItemCard__img">
					<a href="/">
						<img src={props.src} alt={props.name}></img>
					</a>
					<p>-{props.salePercent}%</p>
					<div className="ItemCard__actions"></div>
				</section>
			</div>
			<section className="ItemCard__info">
				<h4>{props.name}</h4>
				<div className="price">
					<p>
						{numberWithCommas((props.price * (100 - props.salePercent)) / 100)}
					</p>
					<p>{numberWithCommas(props.price)}</p>
				</div>
			</section>
		</div>
	);
}

export default ItemCard;
