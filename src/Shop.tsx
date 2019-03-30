import React, { Component } from 'react';
import { Menu, Button, Statistic, Drawer, Transfer, Pagination, Card, Icon } from 'antd';
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
                    position: 'absolute',
                    height: '100%',
                    width: '1.5em',
                    borderRadius: 'unset',
                    padding: 0
                }}></Button>
                <SizePanel width={180} visible={this.state.visible} className="size-panel">
                    <div className="menu">
                        <div className="expend-button">
                            <Button icon="menu-fold" block={true} onClick={this.closeSidePanel}></Button>
                        </div>
                        {this.renderMenu()}
                    </div>
                </SizePanel>
                <Switch>
                    <Route path={this.props.match.url + "/camper"} component={Camper}></Route>
                    <Route path={this.props.match.url + "/room"} component={() => (<h1>home</h1>)}></Route>
                    <Redirect to={this.props.match.url + "/camper"}></Redirect>
                </Switch>


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

const Camper = () => {
    return (
        <div className="shop-content-right">
            <div style={{ display: 'flex', justifyContent: 'center', boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)' }}>
                <Statistic title="未分配的人数" value={112893} />
                <Statistic title="已分配的人数" value={112893} style={{ marginLeft: '2em' }} />
            </div>
            <Room></Room>
        </div>
    )
}
class Room extends Component {
    state = {
        mockData: [],
        targetKeys: [],
        rooms: [{
            name: 'room1',
            maxContains: 10,
            alreadyInCamperId: ['2', '5'],
        }, {
            name: 'room1',
            maxContains: 10,
            alreadyInCamperId: ['2', '5'],
        }]
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

    renderRooms() {
        return <Card>{this.state.rooms.map((val, key) => (
            <Card.Grid key={key} style={{
                textAlign: 'center',
                padding: '2em'
            }}>
                <p>room: {val.name}</p>
                <p>number: {val.alreadyInCamperId.length + ` / ${val.maxContains}`}</p>
            </Card.Grid>
        ))}</Card>


    }

    render() {
        return (
            <div>

                <Drawer placement="bottom">
                    <Transfer
                        dataSource={this.state.mockData}
                        filterOption={this.filterOption}
                        targetKeys={this.state.targetKeys}
                        onChange={this.handleChange}
                        render={(item: any) => item.title}
                    />
                </Drawer>
                {this.renderRooms()}
                <Pagination simple defaultCurrent={2} total={40} style={{textAlign:'center',marginTop:'2em'}} />
            </div>
        )
    }
}

export default Shop;