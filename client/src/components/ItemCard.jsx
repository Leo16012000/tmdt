import React from "react";
import "../styles/ItemCard.css";

function ItemCard(props) {
	return (
		<div className="ItemCard">
			<div className="ItemCard__ImgBlock">
				<img
					src={this.props.props.img}
					alt="img"
					className="ItemCard__ImgBlock__Img"
				/>
				<div className="ItemCard__ImgBlock__Sale">
					-{this.props.props.sale}%
				</div>
				<div className="ItemCard__ImgBlock__ProductAction">
					<button className="ItemCard__ImgBlock__ProductAction__Buy ProductAction__Button">
						Mua ngay
					</button>
				</div>
			</div>
			<div className="ItemCard__InfoBlock">
				<div className="ItemCard__InfoBlock__Info">
					<a className="ItemCard__InfoBlock__Info__Link" href="">
						{this.props.props.id} - {this.props.props.name}
					</a>
				</div>

				{this.props.props.onSale === true ? (
					<div className="ItemCard__InfoBlock__PriceBlock">
						<div className="ItemCard__InfoBlock__SalePrice">
							{(
								parseInt(this.props.props.price) -
								(parseInt(this.props.props.price) *
									parseInt(this.props.props.sale)) /
									100
							).toLocaleString()}
							đ
						</div>
						<div className="ItemCard__InfoBlock__Price">
							{parseInt(this.props.props.price).toLocaleString()}đ
						</div>
					</div>
				) : (
					<div className="ItemCard__InfoBlock__Price">
						{parseInt(this.props.props.price).toLocaleString()}đ
					</div>
				)}
			</div>
		</div>
	);
}

export default ItemCard;
