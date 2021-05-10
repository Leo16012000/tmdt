import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../account/Auth";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "../styles/Orders.css";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const stateGHN = { ready_to_pick: "Chờ xác nhận" };

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Orders() {
  const { currentUser } = useContext(AuthContext);
  const [item, setItem] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getOrderEmail?UserEmail=${currentUser.email}`)
      .then((response) => {
        setItem(response.data);
      });
  }, []);

  if (!currentUser) return <Redirect to="/account" />;

  return (
    <TableContainer className="tableOrder" component={Paper}>
      <Table className="fix" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Nội dung</TableCell>
            <TableCell align="right">Địa chỉ nhận hàng</TableCell>
            <TableCell align="right">Thành tiền</TableCell>
            <TableCell align="right">Thời gian giao hàng</TableCell>
            <TableCell align="right">Trạng thái đơn hàng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.map((row) => (
            <TableRow key={row.ID}>
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="right">{row.Content}</TableCell>
              <TableCell align="right">{row.Address}</TableCell>
              <TableCell align="right">
                {numberWithCommas(row.TotalPrice)}đ
              </TableCell>
              <TableCell align="right">
                {row.DeliveryExpectedTime.slice(0, -5).replace("T", " ")}
              </TableCell>
              <TableCell align="right">{row.OrderState}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Orders;
