import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../account/Auth";
import { Redirect } from "react-router-dom";
import "../styles/Orders.css";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        <TableContainer className="tableOrder" component={Paper}>
            <Table className="fix" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Nội dung</TableCell>
                        <TableCell align="center">Địa chỉ nhận hàng</TableCell>
                        <TableCell align="center">Thành tiền</TableCell>
                        <TableCell align="center">
                            Thời gian giao hàng
                        </TableCell>
                        <TableCell align="center">
                            Trạng thái đơn hàng
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {item &&
                        item.map((row) => (
                            <TableRow key={row.ID}>
                                <TableCell component="th" scope="row">
                                    {row.ID}
                                </TableCell>
                                <TableCell align="right">
                                    {row.Content}
                                </TableCell>
                                <TableCell align="right">
                                    {row.Address}
                                </TableCell>
                                <TableCell align="right">
                                    {numberWithCommas(row.TotalPrice)}đ
                                </TableCell>
                                <TableCell align="right">
                                    {row.DeliveryExpectedTime.slice(
                                        0,
                                        -5
                                    ).replace("T", " ")}
                                </TableCell>
                                <TableCell align="right">
                                    {stateGHN[row.OrderState]}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Orders;
