import React, { useState, MouseEvent, ReactNode, SFC, useEffect, Component } from 'react';
import { Button, Table, Input, Icon, Form, InputNumber, Tooltip, Row, Col, Select } from 'antd';
import { ColumnProps } from 'antd/lib/table/interface';
import { baseUrl } from '../url/url';
import { render } from 'react-dom';

type StudentType = {
    studentId: string;
    studentName: string;
    studentAge: string;
    studentStatus: number;
    studentBunk: number;
}

type ColumnType = StudentType & {
    onCell?(onCell: any): void;
};

class CamperManageForm extends Component<any>{


    renderInput = (type: string, required: boolean, defaultValue: string | number, name: string) => {
        const { getFieldDecorator } = this.props.form;
        console.log(11);
        return <Form.Item> {getFieldDecorator(name, {
            initialValue: defaultValue,
            rules: [{ required, message: '' }],
        })(type === 'number' ? <InputNumber /> : <Input />)} </Form.Item>
    }

    handleSubmit = (e: MouseEvent<HTMLElement>, obj: {
        key: number
    }) => {
        e.preventDefault();
        this.props.form.validateFields((err: Error, values: any) => {
            values = { ...values, ...obj };
            if (!err) {
                // updateData(values);
                // setEditKey(-1);
            }
        });
    }



    componentDidMount() {
        fetch(baseUrl + 'csp/con/student/all')
            .then(data => data.json())
            .then((json: []) => { this.setState({ dataSource: json }) })
            .catch(e => console.log(e))
    }

    getColumnSearchProps = () => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters
        }: any) => {
            return (<div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search `}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={confirm}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={clearFilters}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>)
        },
        filterIcon: (filtered: string) => <Icon type="search" style={{ color: filtered ? 'red' : 'rgb(29, 165, 122)' }} />
    })
    state = {
        editKey: -1,
        isLoading: false,
        dataSource: undefined
    }
    // const[editKey, setEditKey] = useState(-1);
    // const [isLoading] = useState(false);
    // const [dataSource, setDataSource] = useState();
    components = {
        body: {
            cell: (props: any) => {
                const { editKey, record, dataIndex, type, required } = props;
                if (!record) return <td>{props.children}</td>
                const editable = record.studentId === editKey;
                if (dataIndex === 'opreate') {
                    return <td>{(() => {
                        if (editKey === -1)
                            return (<>
                                <Tooltip placement="top" title={'编辑本行信息'} >
                                    <a data-disabled='false' onClick={() => this.setState({ editKey: record.studentId })}> <Icon type="form"></Icon></a>
                                </Tooltip>
                                <Tooltip placement="top" title={'删除本行信息'} >
                                    <a style={{ color: 'rgb(29, 165, 122)ed', marginLeft: '1em' }} onClick={() => { }}> <Icon type="delete"></Icon></a>
                                </Tooltip>
                            </>
                            )
                        if (editable) {
                            return React.Children.toArray([
                                <a onClick={(e: MouseEvent<HTMLElement>) => this.handleSubmit(e, { key: editKey })} style={{ marginRight: '1em' }}>
                                    <Icon type="check"></Icon></a>,
                                <a onClick={() => this.setState({ editKey: -1 })}><Icon type="close"></Icon></a>
                            ])
                        } else {

                            return <a data-disabled='true'><Icon type="form"></Icon></a>
                        }
                    })()
                    }</td>
                }
                return <td>{editable ? this.renderInput(type, required, record[dataIndex], dataIndex) : props.children}</td>;
            },
        },
    };

    columnsData = [{
        title: 'ID',
        dataIndex: 'studentId',
        width: '20%',
        required: true,
        ...this.getColumnSearchProps(),
    }, {
        title: '姓名',
        dataIndex: 'studentName',
        width: '20%'
    }, {
        title: '年龄',
        dataIndex: 'studentAge',
        width: '10%'
    }, {
        title: '铺位',
        dataIndex: 'studentBunk',
        width: '20%'
    }, {
        title: '状态',
        dataIndex: 'studentStatus',
        width: '10%'
    }, {
        title: '编辑',
        dataIndex: 'opreate',
        width: '20%'
    }];

    columns: ColumnProps<ColumnType>[] = this.columnsData.map((val: any) => ({
        ...val,
        onCell: (record: any) => ({
            record,
            required: val["required"] ? true : false,
            dataIndex: (val as any).dataIndex,
            type: typeof record[(val as any).dataIndex],
            editKey: this.state.editKey
        })
    }));


    render() {
        return (
            <Table rowKey="studentId" loading={this.state.isLoading} dataSource={this.state.dataSource} columns={this.columns} components={this.components} className="camper-info-table" />
        )
    }

}

const SearchCamper = (props: any) => {
    const { getFieldDecorator } = props.form;
    const Option = Select.Option;
    return (
        <Form>
            <Row>
                <Col className="gutter-row" span={6}>
                    <Form.Item>
                        {getFieldDecorator(`field`, {
                            rules: [{
                                required: true,
                                message: 'Input something!',
                            }],
                        })(
                            <Input placeholder="placeholder" />
                        )}
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Form.Item>
                        {getFieldDecorator(`field`, {
                            rules: [{
                                required: true,
                                message: 'Input something!',
                            }],
                        })(
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                optionFilterProp="children"
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>,
                        )}
                    </Form.Item>
                </Col>


            </Row>
        </Form>
    )
}

const EditableFormTable: SFC = Form.create()(CamperManageForm) as any;
const SearchCamperForm: SFC = Form.create()(SearchCamper) as any;
const CamperManage = () => {
    return (
        <div className="camper-content">
            <SearchCamperForm></SearchCamperForm>
            <EditableFormTable />
        </div>
    )
}

export default CamperManage;

















