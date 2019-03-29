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
            <div className="shop-content">
                <Drawer
                    placement="left"
                    closable={false}
                    mask={false}
                    width={180}
                    visible={this.state.visible}
                    getContainer=".shop-content"
                    style={{ position: 'static' }}
                    bodyStyle={{ padding: 0 }}
                    maskStyle={{ marginRight: '180px' }}
                >
                    <div className="menu">
                        <div className="expend-button">
                            <Button icon="menu-fold" block={true} onClick={this.onClose}></Button>
                        </div>
                        {this.renderMenu()}
                    </div>
                </Drawer >
                <Button icon="menu-unfold" block={true} type="primary" onClick={this.showDrawer} style={{
                    position: 'absolute',
                    height: '100%',
                    width: '2em',
                }}></Button>
                <div className="shop-content-right">
                    1111111111
                </div>
            </div>

        )
    }
}

// class SizePanel extends Component<any> {
//     state = {

//     }

//     constructor(props: any) {
//         super(props);
//     }

//     render() {

//     }
// }

const SizePanel = (props: any) => {
    return (
        <div style={{
            [props.placement]:0,
            position: 'absolute',
            width: props.width + 'px',
            transform: props.visible === true ? 'translateX(0)' : `translateX(-100%)`
        }} className="transition-transform">

        </div>
    )
}

export default Shop;