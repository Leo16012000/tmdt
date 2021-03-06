import React from "react";
import PropTypes from "prop-types";
import "../styles/Orders.css";

Orders.propTypes = {};
const order = {
  ID: 32133434,
  paymentMethod: "momo",
  orderDate: "11:30 12/5/2021",
  address:
    "Ký túc xá khu A phường Linh Trung thành phố Thủ Đức thành phố Hồ Chí Minh",
  state: "Chờ xác nhận",
};
const listCart = [
  {
    name: "Tủ quần áo",
    image:
      "https://product.hstatic.net/1000360516/product/tt002_3_60f52d1fc120475788c060538c6bbc26_4736ccc3c330476aa2addf3dfa710216_master.jpg",
    unitCost: 749000,
    quantity: 2,
  },
  {
    name: "DP001 - GỐI ÔM CHỮ U BODY PILLOW",
    image:
      "https://product.hstatic.net/1000360516/product/4_f72ee0c78cd04785a49101bb01ad5c10_master.jpg",
    unitCost: 490000,
    quantity: 2,
  },
];

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Orders(props) {
  let totalCart = 0;
  for (let i = 0; i <= listCart.length - 1; i++) {
    totalCart += listCart[i].quantity * listCart[i].unitCost;
  }
  return (
    <div class="order">
      <div class="order-info">
        <p class="order-id">Đơn hàng {order.ID}</p>
        <p>Đặt vào lúc {order.orderDate}</p>
      </div>
      <div className="row tableCart">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
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
                      <td>{item.name}</td>
                      <td>
                        <img
                          src={item.image}
                          alt="itemCart"
                          style={{ width: "100px", height: "80px" }}
                        />
                      </td>
                      {/* <td>{numberWithCommas(item.unitCost)}đ</td> */}
                      <td>{numberWithCommas(item.unitCost)}đ</td>
                      <td>{item.quantity}</td>
                      <td>
                        {numberWithCommas(item.unitCost * item.quantity)}đ
                      </td>
                    </tr>
                  );
                })}
              <tr>
                <td colSpan="4">Total Carts</td>
                <td>{numberWithCommas(totalCart)}đ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
