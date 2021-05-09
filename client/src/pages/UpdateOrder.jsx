import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import sendMessage from "../account/sendMessage";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";

function UpdateOrder(props) {
  const axios = require("axios");
  let orderInfo = useSelector((state) => state.orderInfo);
  console.log("orderInfo:", orderInfo);
  const listCart = useSelector((state) => state.listCart);
  const addressDelivery = useSelector((state) => state.addressDelivery);
  console.log(addressDelivery);
  // change name of object
  listCart.map((item) => {
    item.code = item.id.toString();
    item.price = item.unitCost;
  });
  // console.log(listCart); done

  //
  const items = [...listCart];
  // console.log(items); done
  const bodyParameter = {
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
    weight: 200000, //200 ký
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
        console.log(res.data, "run into here");
      })
      .catch((err) => console.log(err));
    return <div>Run Update Order</div>;
  }
  orderCreate();
  return <div></div>;
}

export default UpdateOrder;
