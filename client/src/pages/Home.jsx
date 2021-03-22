import React from "react";
import AwesomeSlider from "react-awesome-slider";
import AwsSliderStyles from "react-awesome-slider/src/core/styles.scss";
import ItemCard from "../components/ItemCard";
import items from '../data'
import "../styles/Home.css";

const sliderImage = [
	{ src: "https://theme.hstatic.net/1000360516/1000609234/14/slideshow_1.png" },
	{ src: "https://theme.hstatic.net/1000360516/1000609234/14/slideshow_2.png" },
	{ src: "https://theme.hstatic.net/1000360516/1000609234/14/slideshow_3.png" },
	{ src: "https://theme.hstatic.net/1000360516/1000609234/14/slideshow_4.png" },
	{ src: "https://theme.hstatic.net/1000360516/1000609234/14/slideshow_5.png" },
	{ src: "https://theme.hstatic.net/1000360516/1000609234/14/slideshow_6.png" },
	{ src: "https://theme.hstatic.net/1000360516/1000609234/14/slideshow_7.png" },
	{ src: "https://theme.hstatic.net/1000360516/1000609234/14/slideshow_8.png" },
	{ src: "https://theme.hstatic.net/1000360516/1000609234/14/slideshow_9.png" },
];

const catalogImage1 = [
	{
		src: "https://theme.hstatic.net/1000360516/1000609234/14/x1.jpg?v=428",
		name: "GHẾ SOFA",
	},
	{
		src: "https://theme.hstatic.net/1000360516/1000609234/14/x2.jpg?v=428",
		name: "GIƯỜNG",
	},
	{
		src: "https://theme.hstatic.net/1000360516/1000609234/14/x3.jpg?v=428",
		name: "BÀN ĂN",
	},
	{
		src: "https://theme.hstatic.net/1000360516/1000609234/14/x4.jpg?v=428",
		name: "BÀN LÀM VIỆC",
	},
	{
		src: "https://theme.hstatic.net/1000360516/1000609234/14/x55.jpg?v=428",
		name: "BÀN TRÀ",
	},
];

const catalogImage2 = [
	{
		src: "https://theme.hstatic.net/1000360516/1000609234/14/x6.jpg?v=428",
		name: "BÀN TRANG ĐIỂM	",
	},
	{
		src: "https://theme.hstatic.net/1000360516/1000609234/14/x7.jpg?v=428",
		name: "TỦ TRANG TRÍ",
	},
	{
		src: "https://theme.hstatic.net/1000360516/1000609234/14/x8.jpg?v=428",
		name: "KỆ TRANG TRÍ",
	},
	{
		src: "https://theme.hstatic.net/1000360516/1000609234/14/x9.jpg?v=428",
		name: "TỦ ĐẦU GIƯỜNG",
	},
	{
		src: "https://theme.hstatic.net/1000360516/1000609234/14/x100.jpg?v=428",
		name: "GIÁ TREO QUẦN ÁO",
	},
];

function Home__carousel() {
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

function Home__catalog() {
	return (
		<div className="Home__catalog mt-5">
			<div className="content">
				<h1>DANH MỤC NỔI BẬT</h1>
				<p>
					Danh mục sản phẩm bán tốt nhất trong tháng và được lựa chọn nhiều
					nhất.
				</p>
			</div>
			<div className="banner">
				{catalogImage1.map((item, index) => (
					<div className="banner__item" key={index}>
						<img src={item.src} />
						<h4>{item.name}</h4>
					</div>
				))}
			</div>
			<div className="banner">
				{catalogImage2.map((item, index) => (
					<div className="banner__item" key={index}>
						<img src={item.src} />
						<h4>{item.name}</h4>
					</div>
				))}
			</div>
			<div className="map-banner mt-5">
				<img
					src="https://theme.hstatic.net/1000360516/1000609234/14/map2.gif?v=293"
					alt="map"
				/>
			</div>
		</div>
	);
}


function Home__collection1() {

	var list = [];
	for( var i =0; i <4 ; i++){
		list.push(<ItemCard props={items[i]}/>)
	}
	

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

			<div className="banner">
				<ItemCard />
				<ItemCard />
				<ItemCard />
				<ItemCard />
			</div>
			<div className="readmore-line">
				<a>XEM TẤT CẢ</a>
			</div>
		</div>
	);
}

function Home__collection2() {
	var list = [];
	for( var i =0; i <4 ; i++){
		list.push(<ItemCard props={items[i]}/>)
	}

	return (
		<div className="Home__collection mt-5">
			<div className="content">
				<h1>NỘI THẤT BÁN CHẠY</h1>
			</div>
			<div className="banner">	
				{
					list
				}

			</div>
			<div className="banner">	
				{
					list
				}

			</div>
			<div className="banner">	
				{
					list
				}

			</div>
			<div className="readmore-line">
				<a>XEM TẤT CẢ</a>
			</div>

			<div className="banner">	
				{
					list
				}

			</div>
		</div>
	);
}

function Home(props) {
	return (
		<div className="Home">
			<Home__carousel />
			<Home__catalog />
			<Home__collection1 />
			<div className="banner-pic">
				<img
					src="https://theme.hstatic.net/1000360516/1000609234/14/banner_1350.gif?v=870"
					alt="banner-pic"
				/>
			</div>
			<Home__collection2 />
			<div className="banner-pic mt-4">
				<img
					src="https://theme.hstatic.net/1000360516/1000609234/14/bn_0.jpg?v=428"
					alt="banner-pic"
				/>
			</div>
		</div>
	);
}

export default Home;
