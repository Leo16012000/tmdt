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
    
    
    return (
        <div>
            <div>
                
            </div>
        </div>
    )
}

export default Payment
