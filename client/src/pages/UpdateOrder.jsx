import React, { useContext } from "react";
import { CircularProgress } from "@material-ui/core";
import {useSelector,useDispatch } from "react-redux";
import { AuthContext } from "../account/Auth";
import "../styles/UpdateOrder.scss";
import { useHistory } from "react-router";

function UpdateOrder(props) {
  const history = useHistory();
  const axios = require("axios");
  const { currentUser } = useContext(AuthContext);
  let orderInfo = useSelector((state) => state.orderInfo);
  const listCart = useSelector((state) => state.listCart);
  const districtId=useSelector(state=>state.toDistrictId);
  const wardId=useSelector(state=>state.toWardId);
  const realListCart = listCart.filter((cart) => cart.quantity > 0); //realListCart have quanity>0
  console.log(realListCart);
  const addressDelivery = useSelector((state) => state.addressDelivery);
  const paymentMethod = useSelector((state) => state.isCOD);
  let createDataReturn = {};
  let dataInfoReturn = {};

  // calculate totalCart
  let totalCart = 0;
  for (let i = 0; i <= realListCart.length - 1; i++) {
    totalCart += realListCart[i].quantity * realListCart[i].unitCost;
  }
  //
  console.log(addressDelivery);
  // change name of object
  realListCart.map((item) => {
    item.code = item.id.toString();
    item.price = item.unitCost;
    return 0;
  });

  //
  const items = [...realListCart];
  // console.log(items); done
  let bodyParameter = {
    payment_type_id: 2,
    note: addressDelivery,
    required_note: "KHONGCHOXEMHANG",
    return_phone: "0983098604",
    return_address: "39 NTT",
    return_district_id: 3695,
    return_ward_code: "90743",
    client_order_code: "",
    to_name: orderInfo.displayName, // here
    to_phone: orderInfo.phoneNumber, // here
    to_address: orderInfo.address, // here
    to_ward_code: wardId, //
    to_district_id: districtId, //
    cod_amount: 200000, // tổng tiền trả
    content: "Theo New York Times",
    weight: 200, //150g
    length: 20, //10cm
    width: 20, //10cm
    height: 50, //10cm
    pick_station_id: 1370,
    deliver_station_id: null,
    insurance_value: 10000,
    service_id: 53320, //express standard saving
    service_type_id: null,
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
