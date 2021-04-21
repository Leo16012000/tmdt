import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ItemCard from "../components/ItemCard";
import { handlePriceFilter } from "../redux/action";

function Collections(props) {
  const roomKind = useSelector((state) => state.room);
  const category = useSelector((state) => state.category);
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();
  function handlePriceFilterChange(priceFilter) {
    dispatch(handlePriceFilter(priceFilter));
  }

  Axios.get(`http://localhost:3001/collections`).then((response) => {
    setProductList(response.data);
  });

  const filterProductList = productList.filter((i) => i.KindOfRoom == roomKind);

  return (
    <ul>
      {filterProductList.map((i) => (
        <li key={i.ID}>
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
