import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../account/Auth";
import { Redirect } from "react-router-dom";
import "../styles/Orders.scss";
import axios from "axios";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { Button, Tooltip } from "antd";

import sendMessage from "../account/sendMessage";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const stateGHN = {
  ready_to_pick: "Chờ xác nhận",
  picking: "Đang lấy hàng",
  picked: "Đã lấy hàng",
  delivering: "Shiper đang giao hàng cho khách",
  delivered: "Shiper đã giao hàng cho khách",
  delivery_fail: "Giao hàng thất bại",
  cancel: "Đơn hàng bị hủy",
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Orders() {
  const { currentUser } = useContext(AuthContext);
  const [item, setItem] = useState([]);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCancel = (ID) => {
    axios.put(`http://localhost:3001/api/order/update`, {
      state: "cancel",
      ID: ID,
    });
    sendMessage(
      "Đơn hàng mã số " + { ID },
      "Huỷ đơn hàng thành công",
      "success"
    );
    window.location.reload();
  };

  useEffect(() => {
    if (currentUser)
      axios
        .get(
          `http://localhost:3001/getOrderEmail?UserEmail=${currentUser.email}`
        )
        .then((response) => {
          setItem(response.data);
        });
  }, []);

  if (!currentUser) return <Redirect to="/account" />;

  return (
    <div className="Orders__container">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-5">
                <h2>
                  Quản lý <b>Đơn hàng</b>
                </h2>
              </div>
              <AppBar position="static" class="col-sm-7 bar-process">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example">
                  <Tab label="Trong tiến trình" {...a11yProps(0)} />
                  <Tab label="Đã kết thúc" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
            </div>
          </div>
          <TabPanel value={value} index={0}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Mã vận đơn</th>
                  <th>Nội dung</th>
                  <th>Địa chỉ nhận hàng</th>
                  <th>Thành tiền</th>
                  <th>Trạng thái đơn hàng</th>
                  <th>Thời gian giao hàng</th>
                  <th>Hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {item
                  .filter(
                    (row) =>
                      row.OrderState !== "delivered" &&
                      row.OrderState !== "delivered_fail" &&
                      row.OrderState !== "cancel"
                  )
                  .map((row) => (
                    <tr>
                      <td>{row.ID}</td>
                      <td>{row.Content.replace(",", "\n")}</td>
                      <td>{row.Address}</td>
                      <td>{numberWithCommas(row.TotalPrice)}</td>
                      <td>
                        <span className="status text-success">&bull;</span>{" "}
                        {stateGHN[row.OrderState]}
                      </td>
                      <td>
                        <td>{row.DeliveryExpectedTime.split("T")[0]}</td>
                      </td>
                      <td>
                        <Tooltip title={"Huỷ đơn hàng"}>
                          <Button
                            size="middle"
                            type="link"
                            onClick={() => {
                              handleCancel(row.ID);
                            }}
                            icon={<i className="material-icons">&#xE5C9;</i>}
                          />
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Mã vận đơn</th>
                  <th>Nội dung</th>
                  <th>Địa chỉ nhận hàng</th>
                  <th>Thành tiền</th>
                  <th>Trạng thái đơn hàng</th>
                  <th>Thời gian giao hàng</th>
                </tr>
              </thead>
              <tbody>
                {item
                  .filter(
                    (row) =>
                      row.OrderState === "delivered" ||
                      row.OrderState === "delivered_fail" ||
                      row.OrderState === "cancel"
                  )
                  .map((row) => (
                    <tr>
                      <td>{row.ID}</td>
                      <td>{row.Content}</td>
                      <td>{row.Address}</td>
                      <td>{numberWithCommas(row.TotalPrice)}</td>
                      <td>
                        <span
                          className={
                            row.OrderState === "delivered"
                              ? "status text-success"
                              : "status text-danger"
                          }>
                          &bull;
                        </span>{" "}
                        {stateGHN[row.OrderState]}
                      </td>
                      <td>
                        <td>
                          {row.DeliveryExpectedTime.slice(0, -5).replace(
                            "T",
                            " "
                          )}
                        </td>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

export default Orders;
