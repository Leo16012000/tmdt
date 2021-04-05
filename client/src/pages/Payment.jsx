import React from 'react'
import '../styles/Payment.css'
import { OnePayDomestic } from 'vn-payments';
import { OnePayInternational } from 'vn-payments';
import { VNPay } from 'vn-payments';
import { SohaPay } from 'vn-payments';
import { NganLuong } from 'vn-payments';

const axios = require('axios').default;
const onepayIntl = new OnePayInternational({
    paymentGateway: 'https://mtf.onepay.vn/vpcpay/vpcpay.op',
    merchant: 'TESTONEPAY',
    accessCode: '6BEB2546',
    secureSecret: '6D0870CDE5F24F34F3915FB0045120DB',
  });

function paymentClick(){
    // var postData = $("#createOrder").serialize();
    //     var submitUrl = $("#createOrder").attr("action");
    //     $.ajax({
    //         type: "POST",
    //         url: submitUrl,
    //         data: postData,
    //         dataType: 'JSON',
    //         success: function (x) {
    //             if (x.code === '00') {
    //                 if(window.vnpay)
    //                     {
    //                         vnpay.open({width: 768, height: 600, url: x.data});
    //                     }
    //                     else
    //                     {
    //                         location.href=x.data;
    //                     }
    //                     return false;
                    
    //             } else {
    //                 alert(x.Message);
    //             }
    //         }
    //     });
        return false;
}


function Payment() {
    var amount;
    
    return (
        <div>
            <div>
                <form action='/create_payment_url' method='POST'>
                    <div>
                        <label>Loại hàng hóa</label>
                        <select name='orderType'>
                            <option value='topup'>Nạp tiền điện thoại</option>
                            <option value='billpayment'>Nạp tiền điện thoại</option>
                            <option value='fashion'>Thời trang</option>
                        </select>

                        <label>Số tiền</label>
                        <input name='amount' placeholder='Số tiền' value={amount}/>

                        <label>Nội dung thanh toán</label>
                        <textarea name='orderDescription' placeholder='Nội dung thanh toán'/>

                        <select name='bankCode'>
                            <option value=''> Không chọn </option>
                            <option value='VNPAYQR'>  Ngân hàng VNPAYQR </option>
                            <option value='NCB'>  Ngân hàng NCB </option>
                            <option value='SCB'>  Ngân hàng SCB </option>
                            <option value='SACOMBANK'>  Ngân hàng SACOMBANK </option>
                            <option value='EXIMBANK'>  Ngân hàng EXIMBANK </option>
                            <option value='MSBANK'>  Ngân hàng MSBANK </option>
                            <option value='NAMABANK'>  Ngân hàng NAMABANK </option>
                            <option value='VISA'>  Ngân hàng VISA </option>
                            <option value='VNMART'>  Ngân hàng VNMART </option>
                            <option value='VIETINBANK'>  Ngân hàng VIETINBANK </option>
                            <option value='VIETCOMBANK'>  Ngân hàng VIETCOMBANK </option>
                            <option value='HDBANK'>  Ngân hàng HDBANK </option>
                            <option value='DONGABANK' >  Ngân hàng Dong A </option>
                            <option value='TPBANK' >  Ngân hàng Tp Bank </option>
                            <option value='OJB'>  Ngân hàng OceanBank </option>
                            <option value='BIDV'>  Ngân hàng BIDV </option>
                            <option value='TECHCOMBANK'>  Ngân hàng Techcombank </option>
                            <option value='VPBANK'>  Ngân hàng VPBank </option>
                            <option value='AGRIBANK'>  Ngân hàng AGRIBANK </option>
                            <option value='MBBANK'>  Ngân hàng MBBank </option>
                            <option value='ACB'>  Ngân hàng ACB </option>
                            <option value='OCB'>  Ngân hàng OCB </option>
                            <option value='SHB'>  Ngân hàng SHB </option>
                            <option value='IVB'>  Ngân hàng IVB  </option>
                        </select>
                    </div>

                    <div>
                        <label>Ngôn ngữ</label>
                        <select name='language'>
                            <option>Vietnamese</option>
                            <option>English</option>
                        </select>
                    </div>
                    
                    <button type='submit'>  Thanh toán </button>
                </form>
            </div>
        </div>
    )
}

export default Payment
