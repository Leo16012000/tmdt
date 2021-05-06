import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeCart,
} from "../redux/action";

import sendMessage from "../account/sendMessage";
import "../styles/Cart.css";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Cart(props) {
  const dispatch = useDispatch();
  let listCart = useSelector((state) => state.listCart);
  console.log(listCart);
  let totalCart = 0;
  for (let i = 0; i <= listCart.length - 1; i++) {
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
    dispatch(decreaseQuantity(key));
  }
  function IncreaseQuantity(key) {
    dispatch(increaseQuantity(key));
  }
  return (
    <div className="row tableCart">
      <div className="col-md-12">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Image</th>
              <th>Unit Cost</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {listCart &&
              listCart.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <i
                        className="badge badge-danger"
                        onClick={() => DeleteCart(key, item.name)}
                      >
                        X
                      </i>
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <img
                        src={item.image}
                        alt="itemCart"
                        style={{ width: "100px", height: "80px" }}
                      />
                    </td>
                    {/* <td>{numberWithCommas(item.unitCost)}đ</td> */}
                    <td>{numberWithCommas(item.unitCost)}</td>
                    <td>
                      <span
                        className="btn btn-primary"
                        style={{ margin: "2px" }}
                        onClick={() => DecreaseQuantity(key)}
                      >
                        -
                      </span>
                      <span className="btn btn-info">{item.quantity}</span>
                      <span
                        className="btn btn-primary"
                        style={{ margin: "2px" }}
                        onClick={() => IncreaseQuantity(key)}
                      >
                        +
                      </span>
                    </td>
                    <td>{numberWithCommas(item.unitCost * item.quantity)}đ</td>
                  </tr>
                );
              })}
            <tr>
              <td colSpan="5">Total Carts</td>
              <td>{numberWithCommas(totalCart)}đ</td>
            </tr>
          </tbody>
        </table>
        <Link to="/checkouts" style={{ float: "right" }}>
          Thanh toán
        </Link>
      </div>
    </div>
  );
}

export default Cart;
