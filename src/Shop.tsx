import React, { Component } from 'react';
import { Menu, Button } from 'antd';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import RoomManage from './RoomManage';
import CamperManage from './CamperManage';

const { SubMenu } = Menu;

class Shop extends Component<any>{
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
        const rootUrl = this.props.match.url;
        const defaultKey: any = location.pathname.split('/').pop();
        return (
            <Menu mode="inline" defaultSelectedKeys={[defaultKey === 'shop' ? 'camper' : defaultKey]}>
                <Menu.Item key="camper"><Link to={rootUrl + "/camper"}>营员管理</Link></Menu.Item>
                <Menu.Item key="room"><Link to={rootUrl + "/room"}>房间管理</Link></Menu.Item>
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
                    width: '1.5em',
                    borderRadius: 'unset',
                    position: 'absolute',
                    height: '100%',
                    padding: 0
                }} />
                <SizePanel minWidth={180} visible={this.state.visible} className="size-panel">
                    <div className="menu">
                        <div className="expend-button">
                            <Button icon="menu-fold" block={true} onClick={this.closeSidePanel}></Button>
                        </div>
                        {this.renderMenu()}
                    </div>
                </SizePanel>
                <ShopRouter match={this.props.match}></ShopRouter>
            </div>

        )
    }
}

const ShopRouter = (props: any) => {
    return (
        <Switch>
            <Route path={props.match.url + "/camper"} component={CamperManage}></Route>
            <Route path={props.match.url + "/room"} component={RoomManage}></Route>
            <Redirect to={props.match.url + "/camper"}></Redirect>
        </Switch>
    )
}

const SizePanel = (props: any) => {
    return (
        <div style={{
            minWidth: props.minWidth + 'px',
            marginLeft: props.visible === true ? 0 : `-${props.minWidth}px`
        }} className={'transition-margin-left ' + props.className}>
            {props.children}
        </div>
    )
}


export default Shop;