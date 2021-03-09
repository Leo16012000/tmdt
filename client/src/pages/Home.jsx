import React from "react";
import AwesomeSlider from "react-awesome-slider";
import AwsSliderStyles from "react-awesome-slider/src/core/styles.scss";

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

function Home(props) {
	return (
		<div className="Home">
			<div className="Home__carousel">
				<AwesomeSlider cssModule={AwsSliderStyles}>
					{sliderImage.map((item) => (
						<div data-src={item.src} />
					))}
				</AwesomeSlider>
			</div>
		</div>
	);
}

export default Home;
