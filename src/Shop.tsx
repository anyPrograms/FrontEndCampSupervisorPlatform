import React, { Component } from 'react';
import { Menu, Button, Statistic, Modal, Transfer, Pagination, Card, Icon } from 'antd';
import { Link, Route, Redirect, Switch } from 'react-router-dom';

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
            <Route path={props.match.url + "/camper"} component={() => null}></Route>
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

const RoomManage = () => {
    return (
        <div className="shop-content-right">
            <div style={{ display: 'flex', justifyContent: 'center', boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)', padding: '1em 0' }}>
                <Statistic title="未分配的人数" value={112893} />
                <Statistic title="已分配的人数" value={112893} style={{ marginLeft: '2em' }} />
            </div>
            <Rooms></Rooms>
            <Pagination simple defaultCurrent={2} total={40} style={{ textAlign: 'center', padding: '1em' }} />
            <CreateCamper />
        </div>
    )
}

//营员分配房间管理
class Rooms extends Component {
    state = {
        mockData: [],
        targetKeys: [],
        modalVisible: false,
        rooms: new Array(12).fill({
            name: 'room1',
            maxContains: 10,
            alreadyInCamperId: ['2', '5'],
        }, 0)
    }

    componentDidMount() {
        this.getMock();
    }

    getMock = () => {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
    }

    filterOption = (inputValue: string, option: any) => option.description.indexOf(inputValue) > -1

    handleChange = (targetKeys: any) => {
        this.setState({ targetKeys });
    }

    showModal = () => {
        this.setState({
            modalVisible: true
        })
    }

    closeModal = () => {
        this.setState({
            modalVisible: false
        })
    }

    handleCardClick = (evt: any) => {
        this.showModal();
    }

    renderRooms() {
        return (
            <Card>{this.state.rooms.map((val, key) => (
                <Card.Grid key={key} style={{ padding: 0 }}>
                    <div onClick={this.handleCardClick} style={{
                        textAlign: 'center',
                        padding: '2em'
                    }}>
                        <p >room: {val.name}</p>
                        <p>number: {val.alreadyInCamperId.length + ` / ${val.maxContains}`}</p>
                    </div>

                </Card.Grid>
            ))}</Card>
        )


    }

    render() {
        return (
            <div style={{ overflow: 'hidden', display: 'flex' }}>
                <Modal visible={this.state.modalVisible} onCancel={this.closeModal} footer={null} style={{ textAlign: 'center' }} centered title={'RoomName1'}>
                    <Transfer
                        dataSource={this.state.mockData}
                        filterOption={this.filterOption}
                        targetKeys={this.state.targetKeys}
                        onChange={this.handleChange}
                        render={(item: any) => item.title}
                    />
                </Modal>
                {this.renderRooms()}
            </div>
        )
    }
}


const CreateCamper = (props: any) => {
    return (
        <Button type="primary" icon="plus" className="border-radius-none" style={{
            width: '1.5em',
            borderRadius: 'unset',
            position: 'absolute',
            height: '100%',
            right: 0,
            padding: 0
        }} />
    )
}

export default Shop;