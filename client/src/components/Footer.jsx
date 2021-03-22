import React from 'react'
import '../styles/Footer.css'


function FooterRight(){
    return (
        <div className="FooterRight">
            
        </div>
    )
}


function FooterSubcribe(){
    return (
        <div className="FooterSubcribe">

        </div>
    )
}

function FooterContent(){
    return (
        <div className="FooterContent">
            <div className="Content">
                <div className="Contact">
                    <img src="https://theme.hstatic.net/1000360516/1000609234/14/logo.png?v=1451" alt="logo" className="Logo"/>
                    <p>DONGSUH FURNITURE - Nội Thất Hàn Quốc Online Số 1 Tại Việt Nam</p>
                    <p>94-96 Nguyễn Văn Trỗi, P.8, Q.Phú Nhuận, TP.HCM</p>
                    <a>(+84)938.38.15.13</a>
                    <a>support@dongsuh.com.vn</a>
                </div>
                <div className="Nav">
                    <h3>thông tin</h3>
                    <ul>
                        <li>
                            <a href="">về chúng tôi</a>
                        </li>
                        <li>
                            <a href="">thông tin liên hệ</a>
                        </li>
                        <li>
                            <a href="">hướng dẫn mua hàng</a>
                        </li>
                        <li>
                            <a href="">sản phẩm khuyến mãi</a>
                        </li>
                        <li>
                            <a href="">thông tin tuyển dụng</a>
                        </li>
                    </ul>
                </div>
                <div className="Nav">
                    <h3>chính sách</h3>
                    <ul>
                        <li>
                            <a href="">chính sách thanh toán</a>
                        </li>
                        <li>
                            <a href="">chích sách bảo hành</a>
                        </li>
                        <li>
                            <a href="">chính sách đổi trả</a>
                        </li>
                        <li>
                            <a href="">chính sách vận chuyển</a>
                        </li>
                        <li>
                            <a href="">chính sách bảo mật</a>
                        </li>
                    </ul>
                </div>
                <div className="Fanpage">

                </div>
            </div>
        </div>
    )
}

export default function Footer() {
    return (
        <div className="Footer">
            <FooterContent/>
            <FooterSubcribe/>
            <FooterRight/>
        </div>
    )
}
