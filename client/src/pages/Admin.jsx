import { React, useState, useEffect } from "react";
import 'antd/dist/antd.css';
import '../styles/Admin.css'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Axios from "axios";
import { Table, Tag, Space } from 'antd';
const { Column, ColumnGroup } = Table;



const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function Admin() {

    const [item, setItem] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/collections`).then((response) => {
        setItem(response.data);
        });
    }, []);

    return (
        <div className="Admin">
        <Layout>
                <Layout>
                <Sider width={300} className="site-layout-background">
                    <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Tài khoản khách hàng">
                        <Menu.Item key="1">Danh sách khách hàng</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="Thông tin sản phẩm">
                        <Menu.Item key="5">Danh sách thông tin sản phẩm</Menu.Item>
                        <Menu.Item key="6">Thêm sản phẩm mới</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="Đơn hàng">
                        <Menu.Item key="9">Đã hoàn tất</Menu.Item>
                        <Menu.Item key="10">Đang giao hàng</Menu.Item>
                        <Menu.Item key="11">Đã hủy</Menu.Item>
                    </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    
                    </Breadcrumb>

                    <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                    <Table dataSource={item}>
                            <Column title="ID" dataIndex="id" key="id" />
                            <Column title="Name" dataIndex="name" key="name" />
                            <Column title="Price" dataIndex="price" key="price" />
                            <Column title="Price" dataIndex="price" key="price" />
                            <Column 
                            title="Tags"
                            dataIndex="tags"
                            key="tags"
                            render={tags => (
                                <>
                                {tags.map(tag => (
                                    <Tag color="blue" key={tag}>
                                    {tag}
                                    </Tag>
                                ))}
                                </>
                            )}
                            />
                            <Column
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle">
                                <a>Invite {record.lastName}</a>
                                <a>Delete</a>
                                </Space>
                            )}
                            />
                        </Table>
                    </Content>
                </Layout>
                </Layout>
            </Layout>
        </div>
    )
}

export default Admin
