import React, { Component } from 'react';
import { Menu, Button, Drawer } from 'antd';

const { SubMenu } = Menu;

class Shop extends Component {
    state = { visible: true };

    showSidePanel = () => {
        this.setState({
            visible: true,
        });
    };

    closeSidePanel = () => {
        this.setState({
            visible: false,
        });
    }

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

                <Button icon="menu-unfold" block={true} type="primary" onClick={this.showSidePanel} style={{
                    position: 'absolute',
                    height: '100%',
                    width: '2em',
                    borderRadius:'unset'
                }}></Button>
                <SizePanel width={180} visible={this.state.visible} className="size-panel">
                    <div className="menu">
                        <div className="expend-button">
                            <Button icon="menu-fold" block={true} onClick={this.closeSidePanel}></Button>
                        </div>
                        {this.renderMenu()}
                    </div>
                </SizePanel>
                <div className="shop-content-right">
                    1111111111
                </div>

            </div>

        )
    }
}

const SizePanel = (props: any) => {
    return (
        <div style={{
            width: props.width + 'px',
            marginLeft: props.visible === true ? '0' : `-${props.width}px`
        }} className={'transition-margin-left ' + props.className}>
            {props.children}
        </div>
    )
}

export default Shop;