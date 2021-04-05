import React from 'react'
import '../styles/Product.css'
import product from '../data.js'

const images = [
    'https://product.hstatic.net/1000360516/product/05_list_img_619b099c849e4d89af9b063d6d00eae3_8c41bb6340564577bfad0c9109fa7647_master.jpg',
    'https://product.hstatic.net/1000360516/product/03_list_img_0b56a525983a42d6a83b49ebca3e6e5d_c63cb5defa0340cdb2a2dd3718bf8daf_master.jpg',
    'https://product.hstatic.net/1000360516/product/01_list_img_96c336601b904da0b3e1d614bcf217e0_658dc91c54674848b8d2e8837e9a64cd_master.jpg',
    'https://product.hstatic.net/1000360516/product/06_list_img_1af8260552124e19a6b30b650e6c5e83_master.jpg',
]

function ProductGallery(){
    return (
        <div className="gallery">
            <div className="main-img">
                <img  src={images[0]} />
            </div>
            <ul className="list">
                {
                    images.map(image => {
                        return (
                            <li className="image-item">
                                <img src={image} className="img"/>
                            </li>                
                        )
                    })
                }
            </ul>
        </div>
    )
}

function ProductContent(){
    return (
        <div className="product-content">
            <h3 className="product-id">{product[0].productId}</h3>
            <h3 className="product-name">{product[0].name}</h3>
            <h3 className="price">{product[0].price}</h3>
            {product[0].description}
            <h3>Kiểu dáng</h3>

            <h3>Vật liệu </h3>

            <h3>Màu sắc</h3>
           
            <div className="promotion">
                
           
            <img src="https://theme.hstatic.net/1000360516/1000609234/14/m02.jpg?v=440" className="social-promotion"/>
            <img src="https://theme.hstatic.net/1000360516/1000609234/14/m03.jpg?v=440" className="social-promotion"/>
            </div>
        </div>
    )
    
}

function Product(props) {
    return (
        <div className="product-wrapper">
            <div className="wrapper">
                <div className="inner">
                    <div className="product-single">
                        <ProductGallery />
                        <ProductContent />
                    </div>
                    <div className="note"></div>
                    <div className="related-product"></div>
                    <div className="product-info"></div>
                    <div className="seen-product"></div>
                    
                    <button>
                        
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default Product
