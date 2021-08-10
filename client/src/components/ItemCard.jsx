import React from "react";
// import SearchIcon from "@material-ui/icons/Search";
// import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";
import "../styles/ItemCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addCart, quantityModifier } from "../redux/action";
import sendMessage from "../account/sendMessage";

// function numberWithCommas(x) {
// 	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

function ItemCard(props) {

	const param = '/detail?id=' + props.props.ID + '&fullname=' + props.props.Fullname + '&price=' + props.props.Price + '&des=' + props.props.Detail + '&img="' + props.props.Image + '"'

	const dispatch = useDispatch();


	function handleAddCart(id, image, fullName, price) {
		dispatch(quantityModifier(1))
		dispatch(addCart(id, image, fullName, price));
		sendMessage(
			"Thêm sản phẩm thành công!",
			`Đã thêm ${fullName} vào giỏ hàng`,
			"success"
		);
	}

	return (
		<div className="ItemCard">
			<div className="ItemCard__ImgBlock">
				<img
					src={props.props.Image}
					alt="error"
					className="ItemCard__ImgBlock__Img"
				/>
				{props.props.salePercent > 0 ? (
					<div className="ItemCard__ImgBlock__Sale">
						-{props.props.salePercent}%
					</div>
				) : (
					""
				)}
				<div className="ItemCard__ImgBlock__ProductAction">
					<button className="ItemCard__ImgBlock__ProductAction__Buy ProductAction__Button Left_Button">
						<FontAwesomeIcon icon={faSearchPlus} size="1x" />
					</button>
					<button
						onClick={() => {
							handleAddCart(
								//without moving to cart
								props.props.ID,
								props.props.Image,
								props.props.Fullname,
								props.props.Price
							);
						}}
						className="ItemCard__ImgBlock__ProductAction__Buy ProductAction__Button Center_Button"
					>
						Mua ngay
					</button>
					<button
						onClick={() => {
							handleAddCart(
								//moving to cart
								props.props.ID,
								props.props.Image,
								props.props.Fullname,
								props.props.Price
							);
						}}
						className="ItemCard__ImgBlock__ProductAction__Buy ProductAction__Button Right_Button"
					>
						<FontAwesomeIcon icon={faCartPlus} size="1x" />
					</button>
				</div>
			</div>
			<div className="ItemCard__InfoBlock">
				<div className="ItemCard__InfoBlock__Info">
					<Link className="ItemCard__InfoBlock__Info__Link" to={param}>{props.props.ID} - {props.props.Fullname}</Link>
				</div>
				{props.props.salePercent > 0 ? (
					<div className="ItemCard__InfoBlock__PriceBlock">
						<div className="ItemCard__InfoBlock__SalePrice">
							{(
								parseInt(props.props.Price) -
								(parseInt(props.props.Price) *
									parseInt(props.props.salePercent)) /
								100
							).toLocaleString()}
							đ
						</div>
						<div className="ItemCard__InfoBlock__Price">
							{parseInt(props.props.Price).toLocaleString()}đ
						</div>
					</div>
				) : (
					<div className="ItemCard__InfoBlock__SalePrice">
						{parseInt(props.props.Price).toLocaleString()}đ
					</div>
				)}
			</div>
		</div>
	);
}

export default ItemCard;
