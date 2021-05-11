import React, { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import sendMessage from "../account/sendMessage";
import { Button, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../account/Auth";
import { Alert, AlertTitle } from "@material-ui/lab";
import "../styles/UpdateOrder.scss";
import { resetCart } from "../redux/action";
import { useHistory } from "react-router";

function UpdateOrder(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const axios = require("axios");
  const { currentUser } = useContext(AuthContext);
  let orderInfo = useSelector((state) => state.orderInfo);
  console.log("orderInfo:", orderInfo);
  const listCart = useSelector((state) => state.listCart);
  console.log(listCart);
  const addressDelivery = useSelector((state) => state.addressDelivery);
  const paymentMethod = useSelector((state) => state.isCOD);
  let createDataReturn = {};
  let dataInfoReturn = {};
  let orderDetail = {};

  // calculate totalCart
  let totalCart = 0;
  for (let i = 0; i <= listCart.length - 1; i++) {
    totalCart += listCart[i].quantity * listCart[i].unitCost;
  }
  //
  console.log(addressDelivery);
  // change name of object
  listCart.map((item) => {
    item.code = item.id.toString();
    item.price = item.unitCost;
    return 0;
  });

  console.log(listCart);

  //
  const items = [...listCart];
  // console.log(items); done
  let bodyParameter = {
    payment_type_id: 2,
    note: addressDelivery,
    required_note: "KHONGCHOXEMHANG",
    return_phone: "0353323643",
    return_address: "39 NTT",
    return_district_id: null,
    return_ward_code: "",
    client_order_code: "",
    to_name: orderInfo.displayName, // here
    to_phone: orderInfo.phoneNumber, // here
    to_address: orderInfo.address, // here
    to_ward_code: "20308", //
    to_district_id: 1444, //
    cod_amount: 200000, // tổng tiền trả
    content: "Theo New York Times",
    weight: 150000, //150 ký
    length: 100, //1m
    width: 100, //1m
    height: 100, //1m
    pick_station_id: 1444,
    deliver_station_id: null,
    insurance_value: 10000000,
    service_id: 0, //express standard saving
    service_type_id: 2,
    order_value: 130000, //???
    coupon: null,
    pick_shift: [2],
    items, //done
  };

  const config = {
    headers: {
      token: "69ace0ab-ac82-11eb-8be2-c21e19fc6803",
      ShopId: 79749,
    },
  };
  function orderCreate() {
    axios
      .post(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
        bodyParameter,
        config
      )
      .then((res) => {
        console.log(res.data, "create data reponse");
        createDataReturn = res.data.data;
        saveOrder();
      })
      .catch((err) => console.log(err));
    return <div>Run Update Order</div>;
  }

  async function saveOrder() {
    console.log("createDataReturn", createDataReturn.order_code);
    let orderDetail = {};
    bodyParameter = {
      order_code: createDataReturn.order_code,
    };

    async function firstPost() {
      var resDetail = await axios
        .post(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail",
          bodyParameter,
          config
        )
        .then((res) => {
          dataInfoReturn = { ...res.data.data };
          orderDetail = {
            ID: createDataReturn.order_code,
            PaymentMethod: paymentMethod ? "chưa thanh toán" : "đã thanh toán",
            DeliveryExpectedTime: createDataReturn.expected_delivery_time,
            Address: dataInfoReturn.note,
            OrderState: dataInfoReturn.status,
            UserEmail: currentUser.email,
            GHNServicePrice: createDataReturn.total_fee,
            Content: dataInfoReturn.content,
            Price: totalCart,
            Receiver: dataInfoReturn.to_name,
            TotalPrice: totalCart + createDataReturn.total_fee,
          };
          console.log("Order Detail", orderDetail);
          return orderDetail;
        });

      orderDetail = resDetail;
    }

    async function secondPost() {
      console.log("secondPost", orderDetail);
      await axios
        .get(
          `http://localhost:3001/api/saveOrder?ID=${orderDetail.ID}&PaymentMethod=${orderDetail.PaymentMethod}&DeliveryExpectedTime=${orderDetail.DeliveryExpectedTime}&Address=${orderDetail.Address}&OrderState=${orderDetail.OrderState}&UserEmail=${orderDetail.UserEmail}&GHNServicePrice=${orderDetail.GHNServicePrice}&Content=${orderDetail.Content}&Price=${orderDetail.Price}&Receiver=${orderDetail.Receiver}&TotalPrice=${orderDetail.TotalPrice}`
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    await firstPost();
    await secondPost();
    // alert("successful insert");
    // dispatch(resetCart());
    history.push("/Orders");
  }

  orderCreate();
  return (
    <div>
      <CircularProgress />
    </div>
  );
}

export default UpdateOrder;
