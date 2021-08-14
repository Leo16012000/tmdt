import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeCart,
} from "../redux/action";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";

import sendMessage from "../account/sendMessage";
import "../styles/Cart.css";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Cart(props) {
  const dispatch = useDispatch();
  let listCart = useSelector((state) => state.listCart);

  let totalCart = 0,
    numsCart = 0;
  for (let i = 0; i <= listCart.length - 1; i++) {
    numsCart += listCart[i].quantity;
    totalCart += listCart[i].quantity * listCart[i].unitCost;
  }

  function DeleteCart(key, name) {
    dispatch(removeCart(key));
    sendMessage(
      "Xóa sản phẩm thành công!",
      `Đã xóa ${name} ra khỏi giỏ hàng!`,
      "danger"
    );
  }

  function DecreaseQuantity(key) {
    if (listCart[key].quantity === 1) return;
    else dispatch(decreaseQuantity(key));
  }

  function IncreaseQuantity(key) {
    dispatch(increaseQuantity(key));
  }

  return (
    <div className="Cart__Container">
      <div className="Cart__Wrapper">
        <section>
          <div className="title">
            <h1>Giỏ hàng</h1>
            <h5>{numsCart} sản phẩm</h5>
          </div>
          <div className="items">
            {listCart &&
              listCart.map((item, key) => (
                <div className="item" key={key}>
                  <img
                    src={item.image}
                    width="100"
                    height="100"
                    style={{ borderRadius: "10px" }}
                  />
                  <div className="info">
                    <span>Sản phẩm</span>
                    <p>{item.name}</p>
                  </div>
                  <div className="quantity">
                    <RemoveIcon onClick={() => DecreaseQuantity(key)} />
                    <span className="btn btn-disable">{item.quantity}</span>
                    <AddIcon onClick={() => IncreaseQuantity(key)} />
                  </div>
                  <p>{numberWithCommas(item.unitCost * item.quantity)}đ</p>
                  <Button
                    color="secondary"
                    onClick={() => DeleteCart(key, item.name)}>
                    X
                  </Button>
                </div>
              ))}
          </div>
        </section>
        <section>
          <div className="title">
            <h2>Tiến hành đặt hàng</h2>
          </div>
          <div className="content">
            <p>Đơn vị vận chuyển</p>
            <select>
              <option class="text-muted">Giao hàng nhanh</option>
            </select>
          </div>
          <div className="content">
            <p>Tổng giá tiền</p>
            <h1>{numberWithCommas(totalCart)}đ</h1>
          </div>
          <div className="link-to-checkout">
            {totalCart ? (
              <Link to="/checkouts">Thanh toán</Link>
            ) : (
              <Link to="/">Mua sắm</Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Cart;
