import React, { useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

function Collections(props) {
  const roomKind = useSelector((state) => state.room);
  console.log(roomKind);
  Axios.get(`http://localhost:3001/collections`).then((response) => {
    console.log(response.data);
  });
  return <div></div>;
}

export default Collections;
