import { React, useState, Suspense, Spinner } from "react";
import '../styles/Detail.css'

import Button from '../components/Button'
import QuantityModifier from '../components/QuantityModifier'
import { Switch, Route, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";



const images = [

    'https://product.hstatic.net/1000360516/product/05_list_img_619b099c849e4d89af9b063d6d00eae3_8c41bb6340564577bfad0c9109fa7647_master.jpg',
    'https://product.hstatic.net/1000360516/product/03_list_img_0b56a525983a42d6a83b49ebca3e6e5d_c63cb5defa0340cdb2a2dd3718bf8daf_master.jpg',
    'https://product.hstatic.net/1000360516/product/01_list_img_96c336601b904da0b3e1d614bcf217e0_658dc91c54674848b8d2e8837e9a64cd_master.jpg',
    'https://product.hstatic.net/1000360516/product/06_list_img_1af8260552124e19a6b30b650e6c5e83_master.jpg',
]

const banners = [
    "https://file.hstatic.net/1000360516/file/3_sf309_1_01_3b46241fc02745eebb61d77ef50e17d0.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_1_02_10a0ad2902644d27a77c59a16e6d9668.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_1_03_5c3e06eaec49496cbb9dac9af4897384.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_1_03-04_cd5571174c5543a19d64a834fe4d7956.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_1_03-05_7bd68f200d9b48c091d99dd0d05d7f10.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_1_03-06_f8f43b20402644418931ae19f14cb33e.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_1_03-07_07e437f3c809482b87e875de5f878d71.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_1_08_5a0ba7cdfaa54fc8831514327d355f60.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_2_01_693bd53bc6274ed1960106b9db5f007e.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_2_01-02_ed6b1e8db7804ed382beba38f4c8cc9d.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_2_01-03_b2427127de084240be9725c07e7ec142.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_2_01-04_56507d5285cf45c5a9df3c43c7ce3b79.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_2_01-05_1b55fefd4ce4457d9b590ac26f7b4236.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_2_01-06_27b9e244f46142aea9e47fd5e58a12bf.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_2_01-07_27b9e244f46142aea9e47fd5e58a12bf.jpg",
    "https://file.hstatic.net/1000360516/file/3_sf309_2_08_18186e64e60e40e2b25b3db440ee17a7.jpg",
    "https://file.hstatic.net/1000360516/file/e1_new_538d2099ea1045f8906923862995735a.jpg",

]

function Detail(props) {

    let query = useQuery();
    const image = useSelector((state) => state.image);

    const item = {
        id: query.get("id"),
        fullname: query.get("fullname"),
        price: query.get("price"),
        des: query.get("des"),
        img: `${query.get("img")}&token=${query.get("token")}`,
    }

    return (
        <Suspense fallback={<Spinner />}>
            <div className="product-wrapper">
                <div className="wrapper">
                    <div className="inner">
                        <div className="product-single">
                            <ProductGallery img={image} />
                            <ProductContent item={item} />
                        </div>
                        <div className="note"></div>
                        <div className="related-product"></div>
                        <div className="product-info"></div>
                        <div className="seen-product"></div>

                        <ProductDescription />

                    </div>
                </div>
            </div>
        </Suspense>
    )
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


function ProductGallery(props) {

    const [photo, setPhoto] = useState(props.img);

    return (
        <div className="gallery">
            <div className="main-img">
                <img alt="img" src={photo} />
            </div>
            <ul className="list" >
                {
                    images.map(image => {
                        return (
                            <li className="image-item" >
                                <button className="gallery-option-button" onClick={() => setPhoto(image)} > <img alt="img" src={image} className="img" /></button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}


function ProductContent(props) {

    var value = 0;

    return (
        <div className="product-content">
            <div ><p className="product-id">Mã SP: {props.item.id}</p></div>
            <div className="product-name">{props.item.fullname}</div>
            <div className="product-price">{numberWithCommas(props.item.price)}đ</div>
            <div className="product-short-description">{props.item.des}</div>

            <div >
                <QuantityModifier quantityValue={value} />
                <Button name="thêm giỏ hàng" type="Normal" item={props.item} />
                <Button name="mua ngay" type="Hightlight" item={props.item} />
            </div>

            <div className="promotion">


                <img alt="img" src="https://theme.hstatic.net/1000360516/1000609234/14/m02.jpg?v=440" className="social-promotion" />
                <img alt="img" src="https://theme.hstatic.net/1000360516/1000609234/14/m03.jpg?v=440" className="social-promotion" />
            </div>
        </div>
    )

}




function Description() {
    return (
        <div>
            {
                banners.map(banner => {
                    return (
                        <img alt="img" src={banner} />
                    )
                })
            }
        </div>
    )
}


const Comments = () => <div>Comments</div>;
const FAQs = () => <div>FAQs</div>;


function ProductDescription() {

    const path = window.location.search

    return (
        <div>
            <div className="links">
                <Link to={`/detail` + path} className="link left-tab">Mô tả sản phẩm</Link>
                <Link to={`/detail` + path + `/faqs`} className="link center-tab">FAQs</Link>
                <Link to={`/detail` + path + `/comments`} className="link right-tab">Đánh giá</Link>
            </div>
            <div className="tabs">
                <Switch>
                    <Route path={`/detail`} exact component={Description} />
                    <Route path={`/detail/faqs`} component={FAQs} />
                    <Route path={`/detail/comments`} component={Comments} />
                </Switch>
            </div>
        </div>

    )
}


export default Detail
