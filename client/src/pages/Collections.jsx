import React, { useEffect, useState } from "react";
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

  const filterProductList = productList.filter((i) => i.KindOfRoom == roomKind);

  return (
    <ul>
      {filterProductList.map((i) => (
        <li key={i.Id}>
          <ItemCard
            name={i.Fullname}
            price={i.Price}
            salePercent={i.SalePercent}
            src={i.Image}
          />
        </li>
      ))}
    </ul>
  );
}

export default Collections;
