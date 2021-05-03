import React from 'react'
import '../styles/Button.css'
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import sendMessage from "../account/sendMessage";

function Button(props) {

    var nameClass = "Button " + props.type;

    const dispatch = useDispatch();
    function handleAddCart(id, image, fullName, price) {
		dispatch(addCart(id, image, fullName, price));
		sendMessage(
			"Thêm sản phẩm thành công!",
			`Đã thêm ${fullName} vào giỏ hàng`,
			"success"
		);
	}

    return (
        <button className={nameClass} onClick={ props.type === "Normal" ? ()=>handleAddCart(props.item.id,props.item.img,props.item.fullname,props.item.price) : ""}>
            {props.name} 
        </button>
    )
}

export default Button
