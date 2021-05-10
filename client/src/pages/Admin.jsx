import { React, useState, useEffect, Suspense, useContext } from "react";
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import { AuthContext } from "../account/Auth";
import { Form, Input, InputNumber, Button , Select} from 'antd';
import "antd/dist/antd.css";
import "../styles/Admin.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
	UserOutlined,
	LaptopOutlined,
	NotificationOutlined,
} from "@ant-design/icons";
import { Cascader } from 'antd';
import Axios from "axios";
import { Table, Tag, Space } from "antd";
import Collections from "./Collections";
const { Column, ColumnGroup } = Table;

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Option } = Select;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */
  
  const orderState = [
    {
      value: 'Hoàn tất',
      
    },
    {
      value: 'Đang thực hiện ...',
    },
    {
        value: 'Hủy',
      },
  ];

  function onChange(value, selectedOptions) {
    console.log(value, selectedOptions);
  }

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

function Admin() {
	const { currentUser } = useContext(AuthContext);

	if (!currentUser || currentUser.email !== "admin@gmail.com")
		return <Redirect to="/account" />;

	return (
		<div className="Admin">
			<Router>
				<Layout>
					<Layout>
						<Sider width={300} className="site-layout-background">
							<Menu
								mode="inline"
								defaultSelectedKeys={["1"]}
								defaultOpenKeys={["sub1"]}
								style={{ height: "100%", borderRight: 0 }}
							>
								<SubMenu
									key="sub1"
									icon={<UserOutlined />}
									title="Tài khoản khách hàng"
								>
									<Menu.Item key="1">
										<Link to="/admin/users">
											Danh sách thông tin khách hàng
										</Link>
									</Menu.Item>
								</SubMenu>
								<SubMenu
									key="sub2"
									icon={<LaptopOutlined />}
									title="Thông tin sản phẩm"
								>
									<Menu.Item key="5">
										<Link to="/admin/collections">
											Danh sách thông tin sản phẩm
										</Link>
									</Menu.Item>
									<Menu.Item key="6">
                                        <Link to="/admin/add-item">
											Thêm sản phẩm mới
										</Link>
                                    </Menu.Item>
								</SubMenu>
								<SubMenu
									key="sub3"
									icon={<NotificationOutlined />}
									title="Đơn hàng"
								>
									<Menu.Item key="7">
										<Link to="/admin/orders">Quản lý đơn hàng</Link>
									</Menu.Item>
								</SubMenu>
							</Menu>
						</Sider>
						<Layout style={{ padding: "0 24px 24px" }}>
							<Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>

							<Content
								className="site-layout-background"
								style={{
									padding: 24,
									margin: 0,
									minHeight: 280,
								}}
							>
								
								<Suspense fallback={<h1>....</h1>}>
									<Switch>
										<Route exact path="/admin/users">
											<UserData />
										</Route>

										<Route exact path="/admin/collections">
											<CollectionData />
										</Route>

										<Route exact path="/admin/orders">
											<OrdersData />
										</Route>

                                        <Route exact path="/admin/add-item">
											<AddItem />
										</Route>
									</Switch>
								</Suspense>
							</Content>
						</Layout>
					</Layout>
				</Layout>
			</Router>
		</div>
	);
}

function OrdersData() {
	const [item, setItem] = useState([]);

	useEffect(() => {
		Axios.get(`http://localhost:3001/getAllOrders`).then((response) => {
			setItem(response.data);
		});
	});

	return (
		<Table dataSource={item}>
			<Column title="Mã đơn hàng" dataIndex="ID" key="ID" />
			<Column title="Email" dataIndex="UserEmail" key="UserEmail" />
			<Column title="Địa chỉ" dataIndex="Address" key="Address" />
			<Column title="Tổng tiền" dataIndex="TotalPrice" key="TotalPrice" />
            <Column title="Trạng thái đơn hàng" dataIndex="OrderState" key="OrderState" render={(OrderState) => {
                switch(OrderState){
                    case "ready_to_pick" : return "Đang được vận chuyển";
                    default : return "Đang được vận chuyển"
                }
            }}/>
		</Table>
	);
}

function CollectionData() {
	const [item, setItem] = useState([]);

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	useEffect(() => {
		Axios.get(`http://localhost:3001/collections`).then((response) => {
			setItem(response.data);
		});
	});

	return (
		<Table dataSource={item}>
			<Column title="ID" dataIndex="ID" key="ID" />
			<Column title="Name" dataIndex="Fullname" key="Fullname" />
			<Column
				title="Price"
				dataIndex="Price"
				key="Price"
				render={(Price) => numberWithCommas(Price)}
			/>
			<Column title="State" dataIndex="State" key="State" />
		</Table>
	);
}

function UserData() {
	const [item, setItem] = useState([]);

	useEffect(() => {
		Axios.get(`http://localhost:3001/users`).then((response) => {
			setItem(response.data);
		});
	});

	return (
		<Table dataSource={item}>
			<Column title="ID" dataIndex="ID" key="ID" />
			<Column title="Name" dataIndex="Fullname" key="Fullname" />
			<Column title="Phone Number" dataIndex="PhoneNum" key="PhoneNum" />
			<Column title="Email" dataIndex="Email" key="Email" />
			<Column title="Address" dataIndex="Address" key="Address" />
		</Table>
	);
}

function AddItem() {
    const [form] = Form.useForm();

    function handleSubmit(values){
        console.log(values)
        Axios.post("/add-item", {
            values
      })
      .then((res) => {
        if (res.status == 200) console.log("success");
      })
      .catch((err) => {
        console.log("fail");
      });
    }

	return (
        <div>
            Thêm sản phẩm mới
            <Form {...layout} form={form} name="nest-messages" action="/add-item" method="post" onFinish={handleSubmit} validateMessages={validateMessages} labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal">
                <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item
                name="image"
                label="Link ảnh "
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                name="price"
                label="Giá sản phẩm"
                rules={[
                    {
                    required: true,
                    type: 'number',
                    min: 0,
                    },
                ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                name="category"
                label="Loại sản phẩm"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                    <Select placeholder="Chọn loại sản phẩm">
                        <Option value="bàn">Bàn</Option>
                        <Option value="giá">Giá</Option>
                        <Option value="giường">Giường</Option>
                        <Option value="gối">Gối</Option>
                        <Option value="kệ">Kệ</Option>
                        <Option value="tủ">Tủ</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                name="kindOfRoom"
                label="Loại phòng"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                    <Select placeholder="Chọn loại phòng">
                        <Option value="1">Phòng khách</Option>
                        <Option value="2">Phòng ngủ</Option>
                        <Option value="3">Phòng ăn</Option>
                        <Option value="4">Phòng học/làm việc</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="detail" label="Mô tả sản phẩm" rules={[
                    {
                    required: true,
                    },
                ]}>
                    <Input.TextArea />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
        
	);
}

export default Admin;
