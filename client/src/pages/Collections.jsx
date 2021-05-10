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
  const keyword = useSelector((state) => state.keyword);

  console.log(keyword);
  console.log(roomKind);
  console.log(categoryKind);

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

  if (priceLower !== 0 || priceUpper !== 0) {
    itemList = itemList.filter(
      (i) => i.Price < priceUpper && i.Price >= priceLower
    );
  }

  console.log("Key");
  console.log(keyword);

  if(keyword !== "" ){
      console.log(keyword)
      const words = keyword.split(' ');
      itemList = itemList.filter((i) => {
          for(var word of words){
              if( word !== ""){
                  if(i.Fullname.includes(word.toUpperCase()) === true){
                      return true;
                  }
              }
          }
          return false;
      });
  }

  console.log(itemList);

  return (
    <div className="ItemList">
      {itemList.map((sofa) => {
        return <ItemCard key={sofa.ID} props={sofa} />;
      })}
    </div>
  );
}

function Collections(props) {
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
