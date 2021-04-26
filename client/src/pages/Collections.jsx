import { React, useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import Accordion from "../components/Accordion";
import Pagination from "../components/Pagination";
import Axios from "axios";
import "../styles/Collections.css";
import { useSelector } from "react-redux";

function Title() {
  const roomKind = useSelector((state) => state.room);

  var title = "";

  switch (roomKind) {
    case 1:
      title = "Phòng Khách";
      break;
    case 2:
      title = "Phòng Ngủ";
      break;
    case 3:
      title = "Phòng Ăn";
      break;
    case 4:
      title = "Phòng Học/Làm việc";
      break;
    default:
      break;
  }

  return (
    <div className="Title">
      <h2>{title}</h2>
    </div>
  );
}

function MyAccordion() {
  return (
    <div className="MyAccordion">
      <div className="Accordion">
        <Accordion />
      </div>
    </div>
  );
}

function ItemList() {
  const roomKind = useSelector((state) => state.room);
  const categoryKind = useSelector((state) => state.category);
  const priceUpper = useSelector((state) => state.priceUpper);
  const priceLower = useSelector((state) => state.priceLower);

  const [item, setItem] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/collections`).then((response) => {
      setItem(response.data);
    });
  }, []);

  var itemList = item;

  if (roomKind === 0) {
    itemList = item;
  } else {
    itemList = itemList.filter((i) => i.KindOfRoom === roomKind);
  }

  if (categoryKind !== "all") {
    itemList = itemList.filter((i) => i.Category === categoryKind);
  }

  if (priceLower !== 0 && priceUpper !== 0) {
    itemList = itemList.filter(
      (i) => i.Price < priceUpper && i.Price >= priceLower
    );
    console.log("hello");
  }

  return (
    <div className="ItemList">
      {itemList.map((sofa) => {
        return <ItemCard props={sofa} />;
      })}
    </div>
  );
}

function Collections(props) {
  console.log(props);

  return (
    <div className="Sofa">
      <Title />
      <div className="Sofa__inner">
        <MyAccordion />
        <ItemList category />
      </div>

      <Pagination />
    </div>
  );
}

export default Collections;
