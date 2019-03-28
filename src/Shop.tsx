import React, { Component } from 'react';
import { Menu, Button, Drawer } from 'antd';

const { SubMenu } = Menu;

class Shop extends Component {
    state = { visible: true };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    renderMenu() {
        return (
            <Menu mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">营员管理</Menu.Item>
                <Menu.Item key="2">房间管理</Menu.Item>
                <SubMenu key="sub1" title={<span>选修管理</span>}>
                    <Menu.Item key="sub11">选修报名</Menu.Item>
                    <Menu.Item key="sub12">课堂管理</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span>待办事项</span>}>
                    <Menu.Item key="sub21">分配待办</Menu.Item>
                    <Menu.Item key="sub22">个人待办</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }

    render() {
        return (
            <Drawer
                title="Basic Drawer"
                placement="left"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
                className="shop-content"
                getContainer=".sub-content"
            >
                <div className="menu">
                    <div className="expend-button">
                        <Button icon="menu-fold" block={true} onClick={(e: any) => {  }}></Button>
                    </div>
                    {this.renderMenu()}
                </div>
            </Drawer>
        )
    }
}

export default Shop;