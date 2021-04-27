var express = require("express");
const { v1: uuidv1 } = require("uuid");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var logger = require("morgan");

const bodyParser = require("body-parser");
const cors = require("cors");

const mysql = require("mysql");
var app = express();
var $ = require("jquery");
var router = express.Router();

var sortObject = require("sort-object");

// momo requirement
const { sendPaymentMomo } = require("./sendPaymentMomo");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/star-war", async function (req, res) {
	let myObject = await fetch("https://swapi.dev/api/people/1/");
	let myText = await myObject.text();
	res.send(myText);
});

app.get("/", function (req, res) {
	res.send("hello world");
});

app.get("/post", function (req, res, next) {
	var dateFormat = require("dateformat");
	var date = new Date();

	var desc =
		"Thanh toan don hang thoi gian: " + dateFormat(date, "yyyy-mm-dd HH:mm:ss");
	res.send({ title: "Tạo mới đơn hàng", amount: 10000, description: desc });
});

app.post("/post", (req, res) => {
	console.log("Connected to React");
	res.redirect("/");
});

// Momo Payment

app.post("/api/momo", (req, res) => {
	const dataReq = { amount: req.body.amount };
	sendPaymentMomo(req, res, dataReq);
});

app.get("/callback", (req, res) => {
	console.log("Callback: " + req);
});

app.get("/return", (req, res) => {
	console.log("Return: " + req);
});

// Create URL payment

app.post("/create_payment_url", function (req, res, next) {
	var ipAddr =
		req.headers["x-forwarded-for"] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;

	var onlinePayment = req.body.onlinePayment;
	var config = require("config");

	var dateFormat = require("dateformat");

	var tmnCode = config.get("vnp_TmnCode");

	var secretKey = config.get("vnp_HashSecret");
	var vnpUrl = config.get("vnp_Url");
	var returnUrl = config.get("vnp_ReturnUrl");

	var date = new Date();

	var createDate = dateFormat(date, "yyyymmddHHmmss");
	var orderId = dateFormat(date, "HHmmss");
	var amount = req.body.amount;
	var bankCode = req.body.bankCode;

	var orderInfo = req.body.orderDescription;
	var orderType = req.body.orderType;
	var locale = req.body.language;
	if (locale === null || locale === "") {
		locale = "vn";
	}
	var currCode = "VND";
	var vnp_Params = {};
	vnp_Params["vnp_Version"] = "2";
	vnp_Params["vnp_Command"] = "pay";
	vnp_Params["vnp_TmnCode"] = tmnCode;
	// vnp_Params['vnp_Merchant'] = 'Demo'
	vnp_Params["vnp_Locale"] = locale;
	vnp_Params["vnp_CurrCode"] = currCode;
	vnp_Params["vnp_TxnRef"] = orderId;
	vnp_Params["vnp_OrderInfo"] = orderInfo;
	vnp_Params["vnp_OrderType"] = orderType;
	vnp_Params["vnp_Amount"] = amount * 100;
	vnp_Params["vnp_ReturnUrl"] = returnUrl;
	vnp_Params["vnp_IpAddr"] = ipAddr;
	vnp_Params["vnp_CreateDate"] = createDate;

	if (bankCode !== null && bankCode !== "") {
		vnp_Params["vnp_BankCode"] = bankCode;
	}

	vnp_Params = sortObject(vnp_Params);

	var querystring = require("qs");
	var signData =
		secretKey + querystring.stringify(vnp_Params, { encode: false });

	var sha256 = require("sha256");

	var secureHash = sha256(signData);

	vnp_Params["vnp_SecureHashType"] = "SHA256";
	vnp_Params["vnp_SecureHash"] = secureHash;
	vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });

	//Neu muon dung Redirect thi dong dong ben duoi
	// res.status(200).json({code: '00', data: vnpUrl})
	//Neu muon dung Redirect thi mo dong ben duoi va dong dong ben tren

	console.log(vnpUrl);
	res.redirect(vnpUrl);
});

// return URL

app.get("/vnpay_return", function (req, res, next) {
	var vnp_Params = req.query;

	var secureHash = vnp_Params["vnp_SecureHash"];

	delete vnp_Params["vnp_SecureHash"];
	delete vnp_Params["vnp_SecureHashType"];

	vnp_Params = sortObject(vnp_Params);

	var config = require("config");
	var tmnCode = config.get("vnp_TmnCode");
	var secretKey = config.get("vnp_HashSecret");

	var querystring = require("qs");
	var signData =
		secretKey + querystring.stringify(vnp_Params, { encode: false });

	var sha256 = require("sha256");

	var checkSum = sha256(signData);

	if (secureHash == checkSum) {
		//Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
		console.log("giống nhau");
		res.send({ code: vnp_Params["vnp_ResponseCode"] });
		console.log(vnp_Params["vnp_ResponseCode"]);
	} else {
		console.log("khác nhau");
		res.send({ code: "97" });
		console.log("hash: " + secureHash);
		console.log("checksum " + checkSum);
	}
});

app.get("/vnpay_ipn", function (req, res, next) {
	console.log("---------------------------------");
	console.log("req.query of ipn: ");
	console.log(req.query);
	console.log("---------------------------------");
	var vnp_Params = req.query;
	var secureHash = vnp_Params["vnp_SecureHash"];

	delete vnp_Params["vnp_SecureHash"];
	delete vnp_Params["vnp_SecureHashType"];

	vnp_Params = sortObject(vnp_Params);
	var config = require("config");
	var secretKey = config.get("vnp_HashSecret");
	var querystring = require("qs");
	var signData =
		secretKey + querystring.stringify(vnp_Params, { encode: false });

	var sha256 = require("sha256");

	var checkSum = sha256(signData);

	if (secureHash === checkSum) {
		var orderId = vnp_Params["vnp_TxnRef"];
		var rspCode = vnp_Params["vnp_ResponseCode"];
		//Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
		res.status(200).json({ RspCode: "00", Message: "success" });
	} else {
		res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
	}
});

const PORT = 3001;

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "quan0402",
	database: "tmdt_ass0204",
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get all product
app.get("/collections", (req, res) => {
	const sqlSelect = "SELECT * FROM `product`";
	db.query(sqlSelect, (err, result) => {
		if (err) {
			res.send(err);
		}
		res.send(result);
	});
});



app.listen(PORT, () => {
	console.log("running on port ", PORT);
});
