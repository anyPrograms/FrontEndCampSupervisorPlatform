import React, { Component } from 'react';
import { Menu, Button, Table } from 'antd';

export default class CamperManage extends Component {



    render() {
        return (
            <div className="camper-content">
                <div className="camper-content-option-icons">
                    <Button icon="user-add" type="primary">创建</Button>
                    <Button icon="user-delete" type="danger">删除</Button>
                    <Button icon="user-add" type="dashed">查询</Button>
                    <Button icon="user-add" type="ghost">编辑</Button>
                </div>
                <Table dataSource={dataSource} columns={columns} className="camper-info-table" />
            </div>
        )
    }
}




const dataSource = new Array(100).fill(0).map((val, index) => {
    return {
        key: index,
        name: '胡彦斌',
        age: 32 + index,
        address: '西湖区湖底公园1号'
    }
});

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}];