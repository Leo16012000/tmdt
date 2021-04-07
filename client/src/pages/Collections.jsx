import React, { useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import ItemCard from "../components/ItemCard";

function Collections(props) {
  const roomKind = useSelector((state) => state.room);
  const [productList, setProductList] = useState([]);
  Axios.get(`http://localhost:3001/collections`).then((response) => {
    setProductList(response.data);
  });

  return (
    <div className="Home__collection mt-5">
      {productList.map((i) => (
        <ItemCard
          name={i.Fullname}
          price={i.Price}
          salePercent={0}
          src="https://product.hstatic.net/1000360516/product/tt002_3_60f52d1fc120475788c060538c6bbc26_4736ccc3c330476aa2addf3dfa710216_master.jpg"
        />
      ))}
    </div>
  );
}

export default Collections;
