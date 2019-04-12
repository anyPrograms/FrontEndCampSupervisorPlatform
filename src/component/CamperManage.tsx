import React, { Component, useState } from 'react';
import { Button, Table, Input, Icon, Form, InputNumber, Tooltip } from 'antd';

const CamperManage = (props: any) => {
    const [editKey, setEditKey] = useState(-1);

    const components = {
        body: {
            cell: (props: any) => {
                const { editKey, record, dataIndex, type } = props;
                if (!record) return <td>{props.children}</td>
                const editable = record.key === editKey;
                if (dataIndex === 'operate') {
                    return <td>{(() => {
                        if (editable) {
                            return React.Children.toArray([<a onClick={(e: any) => handleSubmit(e, { key: editKey })} style={{ marginRight: '1em' }}><Icon type="check"></Icon></a>, <a onClick={() => rowEditable(-1)}><Icon type="close"></Icon></a>])
                        } else {
                            if (editKey === -1)
                                return (
                                    <Tooltip placement="top" title={'编辑本行信息'} >
                                        <a data-disabled='false' onClick={() => rowEditable(record.key)}> <Icon type="form"></Icon></a>
                                    </Tooltip>
                                )
                            return <a data-disabled='true'><Icon type="form"></Icon></a>
                        }
                    })()
                    }</td>
                }
                return <td>{editable ? renderInput(type, record[dataIndex], dataIndex) : props.children}</td>;
            },
        },
    };

    const columns: any = columnsData.map((val: any) => ({
        ...val,
        onCell: (record: any) => ({
            record,
            dataIndex: val.dataIndex,
            type: typeof record[val.dataIndex],
            editKey: editKey
        })
    }))

    const renderInput = (type: string, defaultValue: any, name: string) => {
        const { getFieldDecorator } = props.form;
        return <Form.Item hasFeedback >{getFieldDecorator(name, {
            initialValue: defaultValue,
            rules: [{ required: true, message: '' }]
        })((() => type === 'number' ? <InputNumber></InputNumber> : <Input />)())} </Form.Item>
    }

    const rowEditable = (editKey: number) => {// editKey === -1 means no rows is editable
        setEditKey(editKey);
    }

    const rowEventHandle = (record: any) => ({
    })

    const handleSubmit = (e: any, obj: any) => {
        e.preventDefault();
        props.form.validateFields((err: any, values: any) => {
            values = { ...values, ...obj };
            if (!err) {
                // console.log('Received values of form: ', values);
                updateData(values);
                rowEditable(-1);
            }
        });
    }

    const updateData = (newData: any) => {

    }

    return (
        <div className="camper-content">
            <div className="camper-content-option-icons">
                <Button icon="user-add" type="primary">创建</Button>
                <Button icon="user-delete" type="danger">删除</Button>
                <Button icon="user-add" type="dashed">查询</Button>
            </div>
            <Form>
                <Table rowSelection={{}} dataSource={dataSource} columns={columns} components={components} className="camper-info-table" onRow={rowEventHandle} />
            </Form>
        </div>
    )
}

const editableFormTable: any = Form.create()(CamperManage);
export default editableFormTable;

const columnsData = [{
    title: '姓名',
    dataIndex: 'name',
    width: '20%'
}, {
    title: '年龄',
    dataIndex: 'age',
    width: '20%'
}, {
    title: '性别',
    dataIndex: 'gender',
    width: '20%'
}, {
    title: '年级',
    dataIndex: 'grade',
    width: '20%'
}, {
    title: '操作',
    dataIndex: 'operate',
    width: '15%'
}];



















const dataSource = new Array(100).fill(0).map((val, index) => {
    return {
        key: index,
        name: '胡彦斌',
        age: 32 + index,
        gender: 'male',
        grade: '10',
    }
});