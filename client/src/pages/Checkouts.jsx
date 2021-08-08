import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOrderInfo } from "../redux/action";
import { AuthContext } from "../account/Auth";
import { Link, useHistory } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import firebase from "firebase/app";

import sendMessage from "../account/sendMessage";
import LocalPicker from "../vietnamlocalselector";
import { Select } from 'antd';

import { AddressService } from "../service/GHN/AddressService";
import "../styles/Checkouts.css";

const axios = require("axios");
const db = firebase.firestore();

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Checkouts(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const listCart = useSelector((state) => state.listCart);
  const [values, setValues] = useState({
    displayName: "",
    phoneNumber: "",
    photoUrl: "",
    address: "",
  });
  const [expanded, setExpanded] = useState("panel1");
  const [method, setMethod] = useState("momo");
  const [fee, setFee] = useState(0);
  const [open, setOpen] = useState(false);
  const { Option } = Select;

  const [province,setProvince]= useState(null);
  const [district,setDistrict]= useState(null);
  const [ward,setWard]= useState(null);
  const [address,setAddress] = useState({province:null,district:null,ward:null});

  var finalPrice = 0;

  useEffect(() => {
    async function getProvince() {
      // You can await here
      const res = await AddressService.getProvince();
      setProvince(res.data);   
    }
    getProvince();
  }, []);

  const handleChangeProvince=(e,o)=>{
    console.log("e",e);
    setAddress({...address,province:e.children});
    async function getDistrict() {
      // You can await here
      const res = await AddressService.getDistrict(e.value);
      setDistrict(res.data);   
    }
    getDistrict();
  }
  const handleChangeDistrict=(e)=>{
    setAddress({...address,district:e.children});
    async function getWard() {
      // You can await here
      const res = await AddressService.getWard(e.value);
      setWard(res.data);   
    }
    getWard();
  }
  const handleChangeWard=(e)=>{
    setAddress({...address,ward:e.children});
    async function calculateFee() {
      // You can await here
      const res = await AddressService.calculateFee(e.value);
      setFee(res.data);   
    }
    calculateFee();  }

  useEffect(()=>{console.log(address);},[address])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickDialog = () => {
    setOpen(!open);
  };

  function moveNextStep(isCOD) {
    var errors = [];

    // const ls_province =
    //   document.getElementById("ls_province").selectedOptions[0];

    // const ls_district = document.getElementById("ls_district");

    // const ls_ward = document.getElementById("ls_ward");

    if (!values.displayName) errors.push("Tên không được để trống!");
    if (!values.phoneNumber) errors.push("Số điện thoại không được để trống!");
    if (!values.address) errors.push("Địa chỉ không được để trống!");

    if (expanded === "panel1" && !address.ward)
      errors.push("Vui lòng chọn địa chỉ giao hàng!");

    if (errors?.length)
      errors.map((err) => sendMessage("Error happened!", err, "danger"));
    else {
      // const addressDelivery =
      //   ls_ward.selectedOptions[0].innerText +
      //   ", " +
      //   ls_district.selectedOptions[0].innerText +
      //   ", " +
      //   ls_province.dataset.level +
      //   " " +
      //   ls_province.innerText;
      const addressDelivery=address.province+" "+address.district+" "+address.ward;
      console.log("addressDelivery: ", addressDelivery);
      // // dispatch order info
      // dispatch(sendOrderInfo(values)); //late for a value
      // console.log(values);
      //open dialog?
      console.log(values);
      dispatch(sendOrderInfo(values, addressDelivery, isCOD)); //late for a value
      console.log("vnpay run into here", values, addressDelivery, isCOD);
      setOpen(!isCOD);
      if (isCOD) history.push("/update-order");
    }
  }
  const SendPayment = () => {
    // send order infomation into redux
    console.log(values);
    // dispatch(sendOrderInfo(values));
    //
    if (method === "momo")
      axios
        .post("/api/momo", { amount: finalPrice })
        .then((res) => {
          const dataRes = res.data;
          if (dataRes.statusCode === 200)
            if (dataRes.body.errorCode === 0)
              window.location.href = dataRes.body.payUrl;
            else if (dataRes.body.errorCode === 4)
              sendMessage(
                "Error happened!",
                "Số tiền thanh toán cần nhỏ hơn 50 triệu, vui lòng cho phương thức khác!",
                "danger"
              );
            else
              sendMessage(
                "Error happened!",
                dataRes.body.localMessage,
                "danger"
              );
          else console.log("Something wrong happened!");
        })
        .catch((err) => console.log(err));
    else if (method === "vnpay") {
      axios
        .post("/create_payment_url", {
          amount: finalPrice,
          language: "vn",
          orderDescription: "Thanh toan noi that",
          orderType: "Noi that",
        })
        .then((res) => {
          const dataRes = res;
          if (dataRes.status === 200)
            if (!dataRes.errorCode) window.location.href = dataRes.data;
            else console.log(dataRes.body.localMessage);
          else console.log("Something wrong happened!");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    // Load Location
    if (currentUser) {
      const docRef = db.collection("Infos").doc(currentUser.email);

      docRef.get().then((doc) => {
        console.log(doc.data());
        if (doc.exists) setValues(doc.data());
      });
    }

    LocalPicker();
  }, []);
  //   getFee();
  return (
    <div className="Checkouts__container">
      <div className="Checkouts__info">
        <header>
          <h3>Dongsuh Furniture</h3>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb">
            <Link color="inherit" to="/cart">
              Giỏ hàng
            </Link>
            <Link color="inherit" to="/checkouts">
              Thông tin vận chuyển
            </Link>
          </Breadcrumbs>
          <h5>Thông tin vận chuyển</h5>
          {!currentUser && (
            <p>
              Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
          )}
        </header>
        <main>
          <TextField
            label="Họ và tên"
            variant="outlined"
            margin="dense"
            id="fullName"
            required
            onChange={handleChange("displayName")}
            value={values.displayName ? values.displayName : ""}
            fullWidth
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="dense"
            onChange={handleChange("email")}
            value={currentUser ? currentUser.email : ""}
            id="email"
          />
          <TextField
            label="Điện thoại"
            variant="outlined"
            margin="dense"
            required
            onChange={handleChange("phoneNumber")}
            value={values ? values.phoneNumber : ""}
            id="phoneNumber"
          />
          <TextField
            label="Địa chỉ"
            variant="outlined"
            margin="dense"
            id="address"
            required
            onChange={handleChange("address")}
            value={values ? values.address : ""}
            fullWidth
          />

          <div className="Checkouts__delivery">
            <Accordion
              expanded={expanded === "panel1"}
              onChange={() => setExpanded("panel1")}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>Giao hàng</Typography>
              </AccordionSummary>
              <AccordionDetails className="selectContainer">
              <Select defaultValue="Chọn tỉnh,thành phố" style={{ width: 150 }} onChange={(value,e)=>handleChangeProvince(e)}>
                {province? province.map(item=><Option value={item.ProvinceID}>{item.ProvinceName}</Option>):<></>}
              </Select>
              <Select defaultValue="Chọn quận,huyện" style={{ width: 150 }} onChange={(value,e)=>handleChangeDistrict(e)}>
                {district? district.map(item=><Option value={item.DistrictID}>{item.DistrictName}</Option>):<></>}
              </Select>
              <Select defaultValue="Chọn xã,phường" style={{ width: 150 }} onChange={(value,e)=>handleChangeWard(e)}>
                {ward? ward.map(item=><Option value={item.WardCode}>{item.WardName}</Option>):<></>}
              </Select>
              </AccordionDetails>
            </Accordion>
          </div>
        </main>
        <footer>
          <Link to="/cart">
            <div className="backToCart">
              <ArrowBackIosIcon />
              <p>Giỏ hàng</p>
            </div>
          </Link>

          {/* Thanh toán thành công */}

          <div className="methodPayment" onClick={() => moveNextStep(1)}>
            <p>Thanh toán tiền mặt</p>
          </div>
          {/*  */}

          <div className="methodPayment" onClick={() => moveNextStep(0)}>
            <p>Thanh toán trực tuyến</p>
          </div>
          <Dialog
            open={open}
            maxWidth="xl"
            onClose={handleClickDialog}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">
              PHƯƠNG THỨC THANH TOÁN
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Bạn vui lòng chọn một trong số những phương thức thanh toán sau.
              </DialogContentText>
              <div className="radio-group row justify-content-between px-3 text-center a">
                <div
                  className={`col-auto mr-sm-2 mx-1 card-block py-0 text-center radio ${
                    method === "momo" ? "selected" : ""
                  }`}
                  onClick={() => setMethod("momo")}>
                  <div className="flex-row">
                    <div className="col">
                      <div className="pic">
                        <img
                          className="irc_mut img-fluid"
                          src="https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1458245625/pwegh6kadcb37kuz0woj.png"
                          alt="momo-logo"
                          width="100"
                          height="100"
                        />
                      </div>
                      <p>Thanh toán trực tuyến qua MoMo</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-auto mr-sm-2 mx-1 card-block py-0 text-center radio ${
                    method === "vnpay" ? "selected" : ""
                  }`}
                  onClick={() => setMethod("vnpay")}>
                  <div className="flex-row">
                    <div className="col">
                      <div className="pic">
                        <img
                          className="irc_mut img-fluid"
                          src="https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/fux5pruztupxjy0lcxv0"
                          alt="vnpay-logo"
                          width="100"
                          height="100"
                        />
                      </div>
                      <p>Thanh toán trực tuyến qua VNPAY</p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClickDialog} color="primary">
                Bỏ qua
              </Button>
              <Button onClick={() => SendPayment()} color="primary" autoFocus>
                Thanh toán
              </Button>
            </DialogActions>
          </Dialog>
        </footer>
      </div>
      <div className="Checkouts__conclusion">
        <div className="products">
          {listCart?.map((product) => {
            finalPrice += product.quantity * product.unitCost;
            if (product.quantity)
              return (
                <div className="product" key={product.id}>
                  <div className="product__thumbnail">
                    <img src={product.image} alt="product__thumbnail" />
                    <p className="product__quantity">{product.quantity}</p>
                  </div>
                  <div className="product__info">
                    <p>{product.name}</p>
                  </div>
                  <p className="product__price">
                    {numberWithCommas(product.unitCost)}₫
                  </p>
                </div>
              );
          })}
        </div>
        <div className="finalPrice">
          <p>Tạm tính</p>
          <div>
            <p>VND</p>
            <h4>{numberWithCommas(finalPrice)}₫</h4>
          </div>
        </div>
        <div className="finalPrice">
          <p>Phí vận chuyển</p>
          <div>
            <p>VND</p>
            <h4>{numberWithCommas(fee)}₫</h4>
          </div>
        </div>

        <div className="finalPrice">
          <p>Thành tiền</p>
          <div>
            <p>VND</p>
            <h4>{numberWithCommas(fee + finalPrice)}₫</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkouts;
