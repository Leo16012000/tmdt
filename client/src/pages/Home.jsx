import { React, useState, useEffect } from "react";
import Axios from "axios";
import AwesomeSlider from "react-awesome-slider";
import AwsSliderStyles from "react-awesome-slider/src/core/styles.scss";
import ItemCard from "../components/ItemCard";
// import items from "../data";
import "../styles/Home.css";
import { Button } from "@material-ui/core";

const sliderImage = [
  { src: "https://theme.hstatic.net/1000360516/1000730119/14/slideshow_9.png?v=20" },
  { src: "https://theme.hstatic.net/1000360516/1000730119/14/slideshow_8.png?v=20" },
  { src: "https://theme.hstatic.net/1000360516/1000730119/14/slideshow_10.png?v=20" },
  { src: "https://theme.hstatic.net/1000360516/1000730119/14/slideshow_7.png?v=20" },
  { src: "https://theme.hstatic.net/1000360516/1000730119/14/slideshow_1.png?v=20" },
  { src: "https://theme.hstatic.net/1000360516/1000730119/14/slideshow_9.png?v=20" },
  { src: "https://theme.hstatic.net/1000360516/1000730119/14/slideshow_8.png?v=20" },
  { src: "https://theme.hstatic.net/1000360516/1000730119/14/slideshow_10.png?v=20" },
  { src: "https://theme.hstatic.net/1000360516/1000730119/14/slideshow_7.png?v=20" },
];

const catalogImage1 = [
  {
    src: "https://theme.hstatic.net/1000360516/1000730119/14/x1.jpg?v=20",
    name: "GHẾ SOFA",
  },
  {
    src: "https://theme.hstatic.net/1000360516/1000730119/14/x2.jpg?v=20",
    name: "GIƯỜNG",
  },
  {
    src: "https://theme.hstatic.net/1000360516/1000730119/14/x3.jpg?v=20",
    name: "BÀN ĂN",
  },
  {
    src: "https://theme.hstatic.net/1000360516/1000730119/14/x4.jpg?v=20",
    name: "BÀN LÀM VIỆC",
  },
  {
    src: "https://theme.hstatic.net/1000360516/1000730119/14/x55.jpg?v=20",
    name: "BÀN TRÀ",
  },
];

const catalogImage2 = [
  {
    src: "https://theme.hstatic.net/1000360516/1000730119/14/x6.jpg?v=20",
    name: "BÀN TRANG ĐIỂM	",
  },
  {
    src: "https://theme.hstatic.net/1000360516/1000730119/14/x7.jpg?v=20",
    name: "TỦ TRANG TRÍ",
  },
  {
    src: "https://theme.hstatic.net/1000360516/1000730119/14/x8.jpg?v=20",
    name: "KỆ TRANG TRÍ",
  },
  {
    src: "https://theme.hstatic.net/1000360516/1000730119/14/x9.jpg?v=20",
    name: "TỦ ĐẦU GIƯỜNG",
  },
  {
    src: "https://theme.hstatic.net/1000360516/1000730119/14/x100.jpg?v=20",
    name: "GIÁ TREO QUẦN ÁO",
  },
];

function HomeCarousel() {
  return (
    <div className="Home__carousel">
      <AwesomeSlider cssModule={AwsSliderStyles}>
        {sliderImage.map((item, index) => (
          <div data-src={item.src} key={index} />
        ))}
      </AwesomeSlider>
    </div>
  );
}

function HomeCatalog() {
  return (
    <div className="Home__catalog mt-5">
      <div className="content">
        <h1>DANH MỤC NỔI BẬT</h1>
        <p>Sản phẩm thường được người tiêu dùng lựa chọn</p>
      </div>
      <div className="banner">
        {catalogImage1.map((item, index) => (
          <div className="banner__item" key={index}>
            <img src={item.src} alt="banner item" />
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
      <div className="banner">
        {catalogImage2.map((item, index) => (
          <div className="banner__item" key={index}>
            <img src={item.src} alt="banner item" />
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
      <div className="map-banner mt-5">
        <img
          src="https://theme.hstatic.net/1000360516/1000730119/14/map2.gif?v=20"
          alt="map"
        />
      </div>
    </div>
  );
}

function HomeCollection1() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/collections`).then((response) => {
      setItem(response.data);
    });
  }, []);

  return (
    <div className="Home__collection mt-5">
      <div className="content">
        <h1>NỘI THẤT NỔI BẬT</h1>
      </div>
      <div className="nav">
        <div>GIƯỜNG NGỦ</div>
        <div>BÀN TRÀ</div>
        <div>BÀN ĂN</div>
        <div>GHẾ SOFA</div>
        <div>TỦ TRANG TRÍ</div>
      </div>

      <div className="list">
        {item
          .filter((item) => item.ID < 6)
          .map((item) => {
            return <ItemCard props={item} />;
          })}
      </div>
      <div className="readmore-line"></div>
    </div>
  );
}

function HomeCollection2() {
  const [item, setItem] = useState([]);
  const [readMore, setreadMore] = useState(false);

  function handleClick() {
    setreadMore(!readMore);
  }

  useEffect(() => {
    Axios.get(`http://localhost:3001/collections`).then((response) => {
      setItem(response.data);
    });
  }, []);

  return (
    <div className="Home__collection mt-5">
      <div className="content">
        <h1>NỘI THẤT BÁN CHẠY</h1>
      </div>
      <div className="list">
        {readMore === false
          ? item
              .filter((item) => item.ID < 10)
              .map((item) => {
                return <ItemCard props={item} />;
              })
          : item.map((item) => <ItemCard props={item} />)}
      </div>

      <div className="readmore-line">
        <Button onClick={() => handleClick()}>
          {readMore === false ? "Xem thêm" : "Thu gọn"}
        </Button>
      </div>
    </div>
  );
}

function Home(props) {
  return (
    <div className="Home">
      <HomeCarousel />
      <HomeCatalog />
      <HomeCollection1 />
      <div className="banner-pic">
        <img
          src="https://theme.hstatic.net/1000360516/1000730119/14/banner_1350.gif?v=20"
          alt="banner-pic"
        />
      </div>
      <HomeCollection2 />
      <div className="banner-pic mt-4">
        <img
          src="https://theme.hstatic.net/1000360516/1000730119/14/bn_0.jpg?v=20"
          alt="banner-pic"
        />
      </div>
    </div>
  );
}

export default Home;
