import React from "react";
import "../styles/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../redux/action";

function Cart(props) {
  const dispatch = useDispatch();
  let listCart = useSelector((state) => state.listCart);
  console.log(listCart);
  let totalCart = 0;
  for (let i = 0; i <= listCart.length - 1; i++) {
    totalCart += listCart[i].quantity * listCart[i].unitCost;
  }
  console.log(totalCart);
  function DeleteCart() {}
  function DecreaseQuantity(key) {
    dispatch(decreaseQuantity(key));
    console.log(listCart);
  }
  function IncreaseQuantity(key) {
    dispatch(increaseQuantity(key));
    console.log(listCart);
  }
  return (
    <div className="row">
      <div className="col-md-12">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {listCart.map((item, key) => {
              return (
                <tr key={key}>
                  <td>
                    <i
                      className="badge badge-danger"
                      onClick={() => DeleteCart(key)}
                    >
                      X
                    </i>
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.image}
                      style={{ width: "100px", height: "80px" }}
                    />
                  </td>
                  <td>{item.unitCost}đ</td>
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
                  <td>{item.unitCost * item.quantity}đ</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="5">Total Carts</td>
              <td>{totalCart}đ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cart;
