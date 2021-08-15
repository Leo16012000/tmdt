import { React, useState, useEffect, Suspense, useContext } from "react";
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import { AuthContext } from "../account/Auth";
import { Form, Input, notification, InputNumber, Image, Button, Select, Layout, Menu, Breadcrumb, Upload, Table, Modal, Descriptions } from "antd";
import "antd/dist/antd.css";
import "../styles/Admin.css";
import {
	UserOutlined,
	LaptopOutlined,
	NotificationOutlined,
	UploadOutlined,
	DeleteOutlined
} from "@ant-design/icons";
import Axios from "axios";
import firebase from "firebase/app";
import { Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Column } = Table;
const { Search } = Input;
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
const openNotificationWithIcon = (type, message, des) => {
	notification[type]({
		message: message,
		description: des,
	});
};

const db = firebase.firestore();

const validateMessages = {
	required: "${label} is required!",
	types: {
		email: "${label} is not a valid email!",
		number: "${label} is not a valid number!",
	},
	number: {
		range: "${label} must be between ${min} and ${max}",
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
										<Link to="/admin/add-item">Thêm sản phẩm mới</Link>
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

									<Menu.Item key="8">
										<Link to="/admin/searchOrder">Tra cứu đơn hàng</Link>
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

										<Route exact path="/admin/searchOrder">
											<SearchOrder />
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
	const [data, setData] = useState({});
	const [confirmVisible, setConfirmVisible] = useState(false);

	useEffect(() => {
		Axios.get(`http://localhost:3001/getAllOrders`).then((response) => {
			setItem(response.data.reverse());
		});
	});

	const showConfirmModal = (record) => {
		setConfirmVisible(true);
		setData(record)
	};

	const handleConfirmCancel = () => {
		setConfirmVisible(false);
	};

	function handleUpdateStatus(value, record) {
		Axios.put("/api/order/update", { ID: record.ID, state: value })
			.then((res) => {
				if (res.status === 200) {
					openNotificationWithIcon('success', 'Thành công', 'Cập nhật trạng thái đơn hàng thành công!')
				}
				else {
					openNotificationWithIcon('error', 'Thất bại', 'Đã có lỗi xảy ra!')
				}
			})
			.catch((error) => {
				openNotificationWithIcon('error', 'Thất bại', 'Đã có lỗi xảy ra!')
			});
	}

	return (
		<div>
			<Table dataSource={item}>
				<Column title="Mã đơn hàng" dataIndex="ID" key="ID" />
				<Column title="Email" dataIndex="UserEmail" key="UserEmail" />
				<Column title="Địa chỉ" dataIndex="Address" key="Address" />
				<Column title="Tổng tiền" dataIndex="TotalPrice" key="TotalPrice" />
				<Column
					title="Trạng thái đơn hàng"
					dataIndex="OrderState"
					key="OrderState"
					width={300}
					render={(text, record) => {

						return (
							<div>
								<Select defaultValue={record.OrderState} style={{ width: 150 }} onChange={(value) => handleUpdateStatus(value, record)}>
									<Option value="new">Đơn hàng mới</Option>
									<Option value="processing">Đang được xử lý</Option>
									<Option value="ready_to_pick">Đang được vận chuyển</Option>
									<Option value="done">Hoàn tất</Option>
									<Option value="cancel">Hủy</Option>
								</Select>
								<Button style={{ marginLeft: '20px' }} onClick={() => showConfirmModal(record)}>
									Chi tiết
								</Button>
							</div>
						)
					}}
				/>
			</Table>
			<Modal
				title={`Chi tiết đơn hàng ${data ? data.ID : ''}`}
				visible={confirmVisible}
				closable
				onCancel={handleConfirmCancel}
				footer={null}
			>
				<Descriptions className="detail" layout="horizontal">
					<Descriptions.Item span={24} label="Người Nhận">{data ? data.Receiver : ''}</Descriptions.Item>
					<Descriptions.Item span={24} label="Email">{data ? data.UserEmail : ''}</Descriptions.Item>
					<Descriptions.Item span={24} label="Địa chỉ giao hàng">
						{data ? data.Address : ''}
					</Descriptions.Item>
					<Descriptions.Item span={24} label="Nội dung đơn hàng">
						{data ? data.Content : ''}
					</Descriptions.Item>
					<Descriptions.Item span={24} label="Giá sản phẩm">
						{data ? data.Price : ''} VNĐ
					</Descriptions.Item>
					<Descriptions.Item span={24} label="Phí vận chuyển">
						{data ? data.GHNServicePrice : ''} VNĐ
					</Descriptions.Item>
					<Descriptions.Item span={24} label="Tổng đơn hàng">
						{data ? data.TotalPrice : ''} VNĐ
					</Descriptions.Item>
					<Descriptions.Item span={24} label="Phương thức thanh toán">
						{data ? data.PaymentMethod : ''}
					</Descriptions.Item>
					<Descriptions.Item span={24} label="Trạng thái đơn hàng">
						{data ? data.OrderState : ''}
					</Descriptions.Item>
					<Descriptions.Item span={24} label="Thời gian giao hàng dự kiến">
						{data ? data.DeliveryExpectedTime : ''}
					</Descriptions.Item>
				</Descriptions>
			</Modal>
		</div>

	);
}

function SearchOrder() {
	const [item, setItem] = useState([]);
	const [data, setData] = useState({});
	const [confirmVisible, setConfirmVisible] = useState(false);

	const showConfirmModal = (record) => {
		setConfirmVisible(true);
		setData(record)
	};

	const handleConfirmCancel = () => {
		setConfirmVisible(false);
	};

	async function getOrders(e) {
		var lst1 = await Axios.get(
			`http://localhost:3001/getOrderLadingCode?ID=${e}`
		).then((response) => {
			return response.data;
		});

		var lst2 = await Axios.get(
			`http://localhost:3001/getOrderEmail?UserEmail=${e}`
		).then((response) => {
			return response.data;
		});

		setItem(lst1.concat(lst2));
	}

	function onSearch(e) {
		getOrders(e);
	}

	function handleUpdateStatus(value, record) {
		Axios.put("/api/order/update", { ID: record.ID, state: value })
			.then((res) => {
				if (res.status === 200) {
					openNotificationWithIcon('success', 'Thành công', 'Cập nhật trạng thái đơn hàng thành công!')
				}
				else {
					openNotificationWithIcon('error', 'Thất bại', 'Đã có lỗi xảy ra!')
				}
			})
			.catch((error) => {
				openNotificationWithIcon('error', 'Thất bại', 'Đã có lỗi xảy ra!')
			});
	}

	return (
		<div>
			<div style={{ marginBottom: "10px", marginRight: "10px" }}>
				<Search
					placeholder="Mã vận đơn / Email"
					onSearch={(e) => onSearch(e)}
					enterButton
				/>
			</div>
			<Table dataSource={item}>
				<Column title="Mã đơn hàng" dataIndex="ID" key="ID" />
				<Column title="Email" dataIndex="UserEmail" key="UserEmail" />
				<Column title="Địa chỉ" dataIndex="Address" key="Address" />
				<Column title="Tổng tiền" dataIndex="TotalPrice" key="TotalPrice" />
				<Column
					title="Trạng thái đơn hàng"
					dataIndex="OrderState"
					key="OrderState"
					width={300}
					render={(text, record) => {

						return (
							<div>
								<Select defaultValue={record.OrderState} style={{ width: 150 }} onChange={(value) => handleUpdateStatus(value, record)}>
									<Option value="new">Đơn hàng mới</Option>
									<Option value="processing">Đang được xử lý</Option>
									<Option value="ready_to_pick">Đang được vận chuyển</Option>
									<Option value="done">Hoàn tất</Option>
									<Option value="cancel">Hủy</Option>
								</Select>
								<Button style={{ marginLeft: '20px' }} onClick={() => showConfirmModal(record)}>
									Chi tiết
								</Button>
							</div>
						)
					}}
				/>
			</Table>
			<Modal
				title={`Chi tiết đơn hàng ${data ? data.ID : ''}`}
				visible={confirmVisible}
				closable
				onCancel={handleConfirmCancel}
				footer={null}
			>
				<Descriptions className="detail" layout="horizontal">
					<Descriptions.Item span={24} label="Người Nhận">{data ? data.Receiver : ''}</Descriptions.Item>
					<Descriptions.Item span={24} label="Email">{data ? data.UserEmail : ''}</Descriptions.Item>
					<Descriptions.Item span={24} label="Địa chỉ giao hàng">
						{data ? data.Address : ''}
					</Descriptions.Item>
					<Descriptions.Item span={24} label="Nội dung đơn hàng">
						{data ? data.Content : ''}
					</Descriptions.Item>
					<Descriptions.Item span={24} label="Giá sản phẩm">
						{data ? data.Price : ''} VNĐ
					</Descriptions.Item>
					<Descriptions.Item span={24} label="Phí vận chuyển">
						{data ? data.GHNServicePrice : ''} VNĐ
					</Descriptions.Item>
					<Descriptions.Item span={24} label="Tổng đơn hàng">
						{data ? data.TotalPrice : ''} VNĐ
					</Descriptions.Item>
					<Descriptions.Item span={24} label="Phương thức thanh toán">
						{data ? data.PaymentMethod : ''}
					</Descriptions.Item>
					<Descriptions.Item span={24} label="Trạng thái đơn hàng">
						{data ? data.OrderState : ''}
					</Descriptions.Item>
					<Descriptions.Item span={24} label="Thời gian giao hàng dự kiến">
						{data ? data.DeliveryExpectedTime : ''}
					</Descriptions.Item>
				</Descriptions>
			</Modal>
		</div>
	);
}

function CollectionData() {
	const [item, setItem] = useState([]);
	const [confirmVisible, setConfirmVisible] = useState(false);
	const [form] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [data, setData] = useState({});
	const [image, setImage] = useState([]);

	const showModal = (record) => {
		setData(record);
		setIsModalVisible(true);

	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function handleSubmit(values) {
		const newValues = {
			...values,
			ID: data.ID,
			image: image[0] ? image[0].url : data.Image
		}
		Axios.put("/api/product/update", newValues)
			.then((res) => {
				if (res.status === 200) {
					openNotificationWithIcon('success', 'Thành công', 'Chỉnh sửa thông tin sản phẩm thành công')
				}
				else {
					openNotificationWithIcon('error', 'Thất bại', 'Đã có lỗi xảy ra!')
				}
				setIsModalVisible(false);
			})
			.catch((error) => {
				openNotificationWithIcon('error', 'Thất bại', 'Tên và giá mới của sản phẩm đã tồn tại !')
			});
	}

	const showConfirmModal = (record) => {
		setConfirmVisible(true);
		setData(record)
	};

	const handleConfirmOk = () => {
		Axios.post("/api/product/delete", { ID: data.ID })
			.then((res) => {
				if (res.status === 200) {
					openNotificationWithIcon('success', 'Thành công', 'Xóa sản phẩm thành công')
				}
				else {
					openNotificationWithIcon('error', 'Thất bại', 'Đã có lỗi xảy ra!')
				}
				setConfirmVisible(false);
			})
			.catch((error) => {
				openNotificationWithIcon('error', 'Thất bại', 'Đã có lỗi xảy ra!')
			});
	};

	const handleConfirmCancel = () => {
		setConfirmVisible(false);
	};

	const onImageChange = (event) => {
		if (event) {
			const file = event;
			var storageRef = firebase.storage().ref();

			// Upload file and metadata to the object 'images/mountains.jpg'
			var uploadTask = storageRef
				.child("images/" + file.name)
				.put(file, { contentType: "image/jpeg" });

			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(
				firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
				(snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log("Upload is paused");
							break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
							console.log("Upload is running");
							break;
						default: break;
					}
				},
				(error) => {
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case "storage/unauthorized":
							// User doesn't have permission to access the object
							break;
						case "storage/canceled":
							// User canceled the upload
							break;

						// ...

						case "storage/unknown":
							// Unknown error occurred, inspect error.serverResponse
							break;
						default: break;
					}
				},
				() => {
					// Upload completed successfully, now we can get the download URL
					uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
						console.log("File available at", downloadURL);
						const newImage = {
							uid: '-1',
							name: file.name,
							status: 'done',
							url: downloadURL,
						}
						setImage([
							...image,
							newImage
						]);
					});


				}
			);
		}
	};

	useEffect(() => {
		Axios.get(`http://localhost:3001/collections`).then((response) => {
			setItem(response.data);
		});
	});

	useEffect(() => {
		form.resetFields();
	}, [data, image]);

	return (
		<div>
			<Table dataSource={item}>
				<Column title="Mã sản phẩm" dataIndex="ID" key="ID" />
				<Column title="Tên sản phẩm" dataIndex="Fullname" key="Fullname" />
				<Column
					title="Giá sản phẩm"
					dataIndex="Price"
					key="Price"
					render={(Price) => numberWithCommas(Price)}
				/>
				<Column title="Trạng thái sản phẩm" dataIndex="State" key="State" />
				<Column title="Chỉnh sửa" width={220}
					render={(text, record) => {
						return (
							<div >
								<Button type="primary" onClick={() => showModal(record)} style={{ marginRight: '10px' }}>
									Chỉnh sửa
								</Button>
								<Button type="primary" danger onClick={() => showConfirmModal(record)}>
									<DeleteOutlined />
								</Button>
							</div>
						)
					}}
				/>
			</Table>
			<Modal title="Chỉnh sửa sản phẩm" visible={isModalVisible} footer={null} closable width={750} onCancel={handleCancel}>
				<Image width={250} src={image && image[0] ? image[0].url : data.Image} style={{ margin: '25px 250px' }} />
				<Form
					{...layout}
					form={form}
					name="nest-messages"
					action="/add-item"
					method="post"
					onFinish={handleSubmit}
					validateMessages={validateMessages}
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 14,
					}}
					layout="horizontal"
					initialValues={{
						name: data.Fullname,
						price: data.Price,
						category: data.Category,
						kindOfRoom: data.KindOfRoom,
						detail: data.Detail,
						state: data.State
					}}
				>
					<Form.Item
						name="name"
						label="Tên sản phẩm"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập tên của sản phẩm !"
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
								type: "number",
								min: 1000,
								message: "Vui lòng nhập giá của sản phẩm (tối thiểu 1.000VNĐ)!"
							},
						]}
					>
						<InputNumber min={0} />
					</Form.Item>
					<Form.Item
						name="category"
						label="Loại sản phẩm"
						rules={[
							{
								required: true,
								message: "Vui lòng chọn loại sản phẩm !"
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
								message: "Vui lòng chọn loại phòng sản phẩm thuộc về"
							},
						]}
					>
						<Select placeholder="Chọn loại phòng">
							<Option value={1}>Phòng khách</Option>
							<Option value={2}>Phòng ngủ</Option>
							<Option value={3}>Phòng ăn</Option>
							<Option value={4}>Phòng học/làm việc</Option>
						</Select>
					</Form.Item>
					<Form.Item
						name="state"
						label="Tình trạng"
						rules={[
							{
								required: false,
							},
						]}
					>
						<Select>
							<Option value='còn hàng'>Còn hàng</Option>
							<Option value='hết hang'>Hết hàng</Option>
						</Select>
					</Form.Item>
					<Form.Item
						name="detail"
						label="Mô tả sản phẩm"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập mô tả sản phẩm"
							},
						]}
					>
						<Input.TextArea />
					</Form.Item>
					<Form.Item
						name="image"
						label="Link ảnh "
						rules={[
							{
								required: false,
								message: "Vui lòng upload ảnh của sản phẩm !"
							},
						]}
					>
						<Upload
							listType="picture"
							customRequest={(options) => onImageChange(options.file)}
							fileList={image}
						>
							{
								image.length < 1 ? <Button icon={<UploadOutlined />}>Upload</Button> : ''
							}
						</Upload>
					</Form.Item>
					<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Modal
				title="Xác nhận xóa sản phẩm"
				visible={confirmVisible}
				closable
				onOk={handleConfirmOk}
				onCancel={handleConfirmCancel}
			>
				<p>Bạn có chắc là muốn xóa sản phẩm này không ?</p>
			</Modal>
		</div>

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

	const [image, setImage] = useState([]);
	const [room, setRoom] = useState('');
	const [roomList, setRoomList] = useState([
		{
			id: '1',
			name: 'Phòng khách',
		},
		{
			id: '2',
			name: 'Phòng ngủ',
		},
		{
			id: '3',
			name: 'Phòng ăn',
		},
		{
			id: '4',
			name: 'Phòng học/làm việc',
		},
	]);

	const [category, setCategory] = useState('');
	const [categoryList, setCategoryList] = useState(["bàn", "giá", "gối", "gối", "kệ", "tủ"]);

	function addCategory() {
		setCategoryList([...categoryList, category]);
	};

	function addRoom() {
		const newRoom = {
			id: (roomList.length + 1).toString(),
			name: room
		}
		setRoomList([...roomList, newRoom]);
	};

	useEffect(() => {
	}, [roomList])

	const onImageChange = (event) => {
		if (event) {
			const file = event;
			var storageRef = firebase.storage().ref();

			// Upload file and metadata to the object 'images/mountains.jpg'
			var uploadTask = storageRef
				.child("images/" + file.name)
				.put(file, { contentType: "image/jpeg" });

			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(
				firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
				(snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log("Upload is paused");
							break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
							console.log("Upload is running");
							break;
						default: break;
					}
				},
				(error) => {
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case "storage/unauthorized":
							// User doesn't have permission to access the object
							break;
						case "storage/canceled":
							// User canceled the upload
							break;

						// ...

						case "storage/unknown":
							// Unknown error occurred, inspect error.serverResponse
							break;
						default: break;
					}
				},
				() => {
					// Upload completed successfully, now we can get the download URL
					uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
						console.log("File available at", downloadURL);
						const newImage = {
							uid: '-1',
							name: file.name,
							status: 'done',
							url: downloadURL,
						}
						setImage([
							...image,
							newImage
						]);
					});


				}
			);
		}
	};


	function handleSubmit(values) {
		const newValues = {
			...values,
			room: parseInt(room.id, 10),
			image: image[0].url
		}
		Axios.post("/api/product", newValues)
			.then((res) => {
				if (res.status === 200) {
					openNotificationWithIcon('success', 'Thành công', 'Thêm sản phẩm mới thành công')
				}
				else {
					openNotificationWithIcon('error', 'Thất bại', 'Đã có lỗi xảy ra!')
				}
			})
			.catch((error) => {
				openNotificationWithIcon('error', 'Thất bại', 'Sản phẩm đã tồn tại!')
			});
	}

	function handleCategoryChange(e) {
		setCategory(e.target.value)
	}

	function handleRoomChange(e) {
		setRoom(e.target.value)
	}

	return (
		<div>
			Thêm sản phẩm mới
			<Form
				{...layout}
				form={form}
				name="nest-messages"
				action="/add-item"
				method="post"
				onFinish={handleSubmit}
				validateMessages={validateMessages}
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 14,
				}}
				layout="horizontal"
			>
				<Form.Item
					name="name"
					label="Tên sản phẩm"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập tên của sản phẩm !"
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
							type: "number",
							min: 1000,
							message: "Vui lòng nhập giá của sản phẩm (tối thiểu 1.000VNĐ)!"
						},
					]}
				>
					<InputNumber min={0} />
				</Form.Item>

				<Form.Item
					name="category"
					label="Loại sản phẩm"
					rules={[
						{
							required: true,
							message: "Vui lòng chọn loại sản phẩm !"
						},
					]}
				>
					<Select placeholder="Chọn loại sản phẩm"
						dropdownRender={menu => (
							<div>
								{menu}
								<Divider style={{ margin: '4px 0' }} />
								<div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
									<Input style={{ flex: 'auto' }} placeholder="Thêm loại sản phẩm mới ..." onChange={handleCategoryChange} />
									<Button
										style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
										onClick={addCategory}
									>
										<PlusOutlined /> Add item
									</Button>
								</div>
							</div>
						)}>
						{
							categoryList.map((item) => {
								return (
									<Option key={item} value={item} style={{ textTransform: 'uppercase' }}>{item}</Option>
								)
							})
						}
					</Select>
				</Form.Item>

				<Form.Item
					name="kindOfRoom"
					label="Loại phòng"
					rules={[
						{
							required: true,
							message: "Vui lòng chọn loại phòng sản phẩm thuộc về"
						},
					]}
				>
					<Select
						placeholder="Chọn loại phòng"
					>
						{
							roomList.map(item => {
								return <Option key={item.id} value={item.id}>{item.name}</Option>
							})
						}
						{/* <Option value="1">Phòng khách</Option>
						<Option value="2">Phòng ngủ</Option>
						<Option value="3">Phòng ăn</Option>
						<Option value="4">Phòng học/làm việc</Option> */}
					</Select>
				</Form.Item>

				<Form.Item
					name="detail"
					label="Mô tả sản phẩm"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập mô tả sản phẩm"
						},
					]}
				>
					<Input.TextArea />
				</Form.Item>
				<Form.Item
					name="image"
					label="Link ảnh "
					rules={[
						{
							required: true,
							message: "Vui lòng upload ảnh của sản phẩm !"
						},
					]}
				>
					<Upload
						listType="picture"
						customRequest={(options) => onImageChange(options.file)}
						fileList={image}
					>
						{
							image.length < 1 ? <Button icon={<UploadOutlined />}>Upload</Button> : ''
						}
					</Upload>
				</Form.Item>
				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Admin;
