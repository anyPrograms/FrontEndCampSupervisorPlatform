import React, { Component } from 'react';
import { Button, Table, Input, Icon, Form, InputNumber, Tooltip } from 'antd';

class CamperManage extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    state = {
        editKey: -1
    }

    private components = {
        body: {
            cell: (props: any) => {
                const { editKey, record, dataIndex, type } = props;
                const editable = record.key === editKey;
                if (dataIndex === 'operate') {
                    return <td>{(() => {
                        if (editable) {
                            return ([<a key="0" onClick={(e: any) => this.handleSubmit(e, { key: editKey })} style={{ marginRight: '1em' }}><Icon type="check"></Icon></a>, <a key="1" onClick={() => this.rowEditable(-1)}><Icon type="close"></Icon></a>])
                        } else {
                            if (editKey === -1)
                                return (
                                    <Tooltip placement="top" title={'编辑本行信息'} >
                                        <a data-disabled='false' onClick={() => this.rowEditable(record.key)}> <Icon type="form"></Icon></a>
                                    </Tooltip>
                                )
                            return <a data-disabled='true'><Icon type="form"></Icon></a>
                        }
                    })()
                    }</td>
                }
                return <td>{editable ? this.renderInput(type, record[dataIndex], dataIndex) : props.children}</td>;
            },
        },
    };

    private columns: any = columns;

    private renderInput = (type: string, defaultValue: any, name: string) => {
        const { getFieldDecorator } = this.props.form;
        return <Form.Item hasFeedback >{getFieldDecorator(name, {
            initialValue: defaultValue,
            rules: [{ required: true, message: '' }]
        })((() => type === 'number' ? <InputNumber></InputNumber> : <Input />)())} </Form.Item>
    }

    private rowEditable = (editKey: number) => {// editKey === -1 means no rows is editable
        this.setState({
            editKey,
        })
    }

    private rowEventHandle = (record: any) => ({
    })

    private handleSubmit = (e: any, obj: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            values = { ...values, ...obj };
            if (!err) {
                // console.log('Received values of form: ', values);
                this.updateData(values);
                this.rowEditable(-1);
            }
        });
    }

    private updateData = (newData: any) => {

    }

    render() {
        this.columns = this.columns.map((val: any) => ({
            ...val,
            onCell: (record: any) => ({
                record,
                dataIndex: val.dataIndex,
                type: typeof record[val.dataIndex],
                editKey: this.state.editKey
            })
        }))

        return (
            <div className="camper-content">
                <div className="camper-content-option-icons">
                    <Button icon="user-add" type="primary">创建</Button>
                    <Button icon="user-delete" type="danger">删除</Button>
                    <Button icon="user-add" type="dashed">查询</Button>
                </div>
                <Form>
                    <Table dataSource={dataSource} columns={this.columns} components={this.components} className="camper-info-table" onRow={this.rowEventHandle} />
                </Form>
            </div>
        )
    }
}

const editableFormTable: any = Form.create()(CamperManage);
export default editableFormTable;

const columns = [{
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