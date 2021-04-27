require("dotenv").config();
const https = require("https");
const crypto = require("crypto");
const uuidv1 = require("uuidv1");
const c = require("config");

var endpoint = "https://test-payment.momo.vn/gw_payment/transactionProcessor";
var hostname = "https://test-payment.momo.vn";
var path = "/gw_payment/transactionProcessor";
var partnerCode = process.env.PARTNER_CODE;
var accessKey = process.env.ACCESS_KEY;
var serectkey = process.env.SECRET_KEY;
var orderInfo = "pay with MoMo";
var returnUrl = process.env.PROXY + "/callback";
var notifyurl = process.env.PROXY + "/return";
// var amount = "2000000";
var orderId = uuidv1();
var requestId = uuidv1();
var requestType = "captureMoMoWallet";
var extraData = "merchantName=RoyalFurniture;merchantId=001"; //pass empty value if your merchant does not have stores else merchantName=[storeName]; merchantId=[storeId] to identify a transaction map with a physical store
var ret = {};

function sendPaymentMomo(request, response, dataReq) {
	const amount = dataReq.amount.toString();
	//before sign HMAC SHA256 with format
	//partnerCode=$partnerCode&accessKey=$accessKey&requestId=$requestId&amount=$amount&orderId=$oderId&orderInfo=$orderInfo&returnUrl=$returnUrl&notifyUrl=$notifyUrl&extraData=$extraData
	var rawSignature =
		"partnerCode=" +
		partnerCode +
		"&accessKey=" +
		accessKey +
		"&requestId=" +
		requestId +
		"&amount=" +
		amount +
		"&orderId=" +
		orderId +
		"&orderInfo=" +
		orderInfo +
		"&returnUrl=" +
		returnUrl +
		"&notifyUrl=" +
		notifyurl +
		"&extraData=" +
		extraData;
	// //puts raw signature
	// console.log("--------------------RAW SIGNATURE----------------");
	// console.log(rawSignature);
	//signature
	var signature = crypto
		.createHmac("sha256", serectkey)
		.update(rawSignature)
		.digest("hex");
	// console.log("--------------------SIGNATURE----------------");
	// console.log(signature);

	//json object send to MoMo endpoint
	var body = JSON.stringify({
		partnerCode: partnerCode,
		accessKey: accessKey,
		requestId: requestId,
		amount: amount,
		orderId: orderId,
		orderInfo: orderInfo,
		returnUrl: returnUrl,
		notifyUrl: notifyurl,
		extraData: extraData,
		requestType: requestType,
		signature: signature,
	});

	//Create the HTTPS objects
	var options = {
		hostname: "test-payment.momo.vn",
		port: 443,
		path: "/gw_payment/transactionProcessor",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Content-Length": Buffer.byteLength(body),
		},
	};

	//Send the request and get the response
	console.log("Sending....");
	var req = https.request(options, (res) => {
		console.log(res);
		ret.statusCode = res.statusCode;
		ret.headers = res.headers;
		res.setEncoding("utf8");
		res.on("data", (body) => {
			ret.body = JSON.parse(body);
		});
		res.on("end", () => {
			console.log(ret);
			response.status(200).send(ret);
			console.log("No more data in response.");
		});
	});

	req.on("error", (e) => {
		console.log(`problem with request: ${e.message}`);
	});

	// write data to request body
	req.write(body);
	req.end();
}

module.exports = { sendPaymentMomo };