import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../account/Auth";
import { Redirect } from "react-router-dom";
import "../styles/Orders.scss";
import axios from "axios";
import { makeStyles } from "@material-ui/core";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const stateGHN = {
  ready_to_pick: "Chờ xác nhận",
  picking: "Đang lấy hàng",
  picked: "Đã lấy hàng",
  delivering: "Shiper đang giao hàng cho khách",
  delivered: "Shiper đã giao hàng cho khách",
  delivery_fail: "Giao hàng thất bại",
  cancel: "Đơn hàng bị hủy",
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Orders() {
  const { currentUser } = useContext(AuthContext);
  const [item, setItem] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (currentUser)
      axios
        .get(
          `http://localhost:3001/getOrderEmail?UserEmail=${currentUser.email}`
        )
        .then((response) => {
          setItem(response.data);
        });
  }, []);

  if (!currentUser) return <Redirect to="/account" />;

  return (
    <div class="container Orders__container">
      <div class="table-responsive">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="row">
              <div class="col-sm-5">
                <h2>
                  Quản lý <b>Đơn hàng</b>
                </h2>
              </div>
            </div>
          </div>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Mã vận đơn</th>
                <th>Nội dung</th>
                <th>Địa chỉ nhận hàng</th>
                <th>Thành tiền</th>
                <th> Trạng thái đơn hàng</th>
                <th> Thời gian giao hàng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <a href="#">Michael Holz</a>
                </td>
                <td>04/10/2013</td>
                <td>Admin</td>
                <td>
                  <span class="status text-success">&bull;</span> Active
                </td>
                <td>
                  <td>04/10/2013</td>
                </td>
                <td>
                  <a
                    href="#"
                    class="delete"
                    title="Delete"
                    data-toggle="tooltip">
                    <i class="material-icons">&#xE5C9;</i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
