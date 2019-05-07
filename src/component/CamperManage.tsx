import React, { useState, MouseEvent, ReactNode, SFC, useEffect, Component, ReactComponentElement } from 'react';
import { Button, Table, Input, Icon, Form, InputNumber, Tooltip, Row, Col, Select, Modal, Radio, message } from 'antd';
import { ColumnProps } from 'antd/lib/table/interface';
import { baseUrl } from '../url/url';
import RadioGroup from 'antd/lib/radio/group';

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
    constructor(props: any) {
        super(props);
    }

    renderInput = (type: string, required: boolean, defaultValue: string | number, name: string) => {
        const { getFieldDecorator } = this.props.form;
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
            }
        });
    }

    handleDelete = (studentId: string) => {
        this.props.deleteCamperData(studentId);
    }

    state = {
        editKey: -1,
        isLoading: false
    }

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
                                    <a style={{ color: 'rgb(29, 165, 122)ed', marginLeft: '1em' }} onClick={() => { this.handleDelete(record.studentId) }}> <Icon type="delete"></Icon></a>
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
        required: true
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
            <Table rowKey="studentId" loading={this.props.isTableLoading} dataSource={this.props.campersData} columns={this.columns} components={this.components} className="camper-info-table" />
        )
    }

}

const SearchCamper = (props: any) => {
    const { getFieldDecorator, resetFields } = props.form;
    const Option = Select.Option;
    const [isSpreadForm, setIsSpreadForm] = useState(false);
    const { roomsData = [], findCamperData,refreshCampersData } = props;
    const onSubmitHandle = () => {
        props.form.validateFields((err: Error, values: any) => {
            Object.keys(values).forEach(key => {
                if (values[key] === undefined) {
                    delete values[key];
                }
            });
            if (!err) {
                findCamperData(values);
            }
        });
    }
    const clearSearchForm = ()=>{
        resetFields();
        refreshCampersData();
    }
    return (
        <div className="search-form">
            <Button icon={isSpreadForm ? 'double-left' : 'search'} onClick={() => setIsSpreadForm(!isSpreadForm)}></Button>
            <Form className={`form-content ${isSpreadForm ? 'width-100' : ''}`} onSubmit={onSubmitHandle}>
                {getFieldDecorator(`name`, {
                })(
                    <Input placeholder="营员名字..." className="width-unset" />
                )}
                {getFieldDecorator(`bunk`, {
                })(
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="营员房间"
                        optionFilterProp="children"
                    >
                        {
                            roomsData.map(({ bunkId }: any) => <Option key={bunkId} value={bunkId}>{bunkId}</Option>)
                        }
                    </Select>,
                )}
                {getFieldDecorator(`status`, {
                })(
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="全部"
                        optionFilterProp="children"
                    >
                        <Option value="0">未参加</Option>
                        <Option value="1">正常参加</Option>
                        <Option value="3">外出就医</Option>
                        <Option value="4">意外退出</Option>
                    </Select>,
                )}
                <Button icon="delete" onClick={clearSearchForm }></Button>
                <Button icon="search" onClick={onSubmitHandle} />
            </Form>
        </div>
    )
}

const AddCamper = (props: any) => {
    const { getFieldDecorator } = props.form;
    const [modelVisible, setModelVisible] = useState(false);
    const onOk = () => {
        props.form.validateFields((err: Error, values: any) => {
            if (!err) {
                setModelVisible(false);
                updateData(values);
            }
        });
    }

    const updateData = (values: any) => {
        props.addCamperData(values);
    }

    type camperInputOfFormProps = {
        label: string;
        name: string;
        required: boolean;
        placeholder?: string;
        defaultValue?: number,
        render: ReactNode;
    }
    const camperKeys: camperInputOfFormProps[] = [{
        label: '营员姓名',
        name: 'studentName',
        required: true,
        render: <Input />
    }, {
        label: '营员性别',
        name: 'studentGender',
        required: true,
        render: <RadioGroup >
            <Radio value={0}>女</Radio>
            <Radio value={1}>男</Radio>
        </RadioGroup>
    }, {
        label: '营员年龄段',
        name: 'studentGrade',
        required: true,
        render: <RadioGroup >
            <Radio value={1}>小</Radio>
            <Radio value={2}>中</Radio>
            <Radio value={3}>大</Radio>
        </RadioGroup>
    }, {
        label: '营期年份',
        name: 'studentYear',
        required: true,
        render: <InputNumber></InputNumber>
    }, {
        label: '营员状态',
        name: 'studentStatus',
        required: false,
        defaultValue: 1,
        render: <RadioGroup >
            <Radio value={0}>0</Radio>
            <Radio value={1}>1</Radio>
        </RadioGroup>
    }, {
        label: '营员年龄',
        name: 'studentAge',
        required: true,
        render: <InputNumber></InputNumber>
    }];

    const createCamper = (camperKeys: camperInputOfFormProps[]) => {
        return <Form>
            <Row gutter={16}>
                {camperKeys.map(camper => (
                    <Col key={camper.name} className="gutter-row" span={12}>
                        <Form.Item label={camper.label}>
                            {getFieldDecorator(camper.name, {
                                rules: [{
                                    required: camper.required,
                                    message: camper.label + '不能为空'
                                }],
                                initialValue: camper.defaultValue || null
                            })(
                                camper.render
                            )}
                        </Form.Item>
                    </Col>
                ))}
            </Row>
        </Form>
    }

    return (
        <>
            <Button onClick={() => setModelVisible(true)}>添加营员</Button>
            <Modal
                title="Basic Modal"
                visible={modelVisible}
                onOk={onOk}
                destroyOnClose={true}
                onCancel={() => setModelVisible(false)}
            >
                {createCamper(camperKeys)}
            </Modal>

        </>
    )
}

const EditableFormTable: SFC = Form.create()(CamperManageForm) as any;
const SearchCamperForm: SFC = Form.create()(SearchCamper) as any;
const AddCamperForm: SFC = Form.create()(AddCamper) as any;

const CamperManage = (props: any) => {
    const [isTableLoading, setIsTableLoading] = useState(true);

    const messageSuccess = (text: string) => {
        message.success(text);
    };

    const getCampersData = () => {
        fetch(baseUrl + 'csp/con/student/all')
            .then(data => data.json())
            .then((json: []) => {
                setCampersData(json);
                setIsTableLoading(false);//数据完成解除加载动画
            })
            .catch(e => console.log(e));
    }

    const findCamperData = (values: any) => {
        setIsTableLoading(true);//添加加载动画
        let params = (() => {
            return '?' + Object.keys(values).map(key => {
                return key + '=' + values[key]
            }).join('&');
        })();
        fetch(baseUrl + 'csp/con/student/findByFilters' + params)
            .then(data => data.json())
            .then((json: []) => {
                setCampersData(json);
                setIsTableLoading(false);//数据完成解除加载动画
            })
            .catch(e => console.log(e));
    }

    const refreshCampersData = () => {
        setIsTableLoading(true);//添加加载动画
        getCampersData();
    }

    const deleteCamperData = (studentId: string) => {
        setIsTableLoading(true);//添加加载动画
        fetch(baseUrl + 'csp/con/student/deleteById/' + studentId, {
            method: 'post',
            mode: 'cors'
        }).then(value => value.json())
            .then(result => {
                refreshCampersData();
                messageSuccess('删除成功！');
            })
            .catch(e => console.log(e));
    }

    const addCamperData = (values: any) => {
        setIsTableLoading(true);//添加加载动画
        let params = (() => {
            return '?' + Object.keys(values).map(key => {
                return key + '=' + values[key]
            }).join('&');
        })();

        fetch(baseUrl + 'csp/con/student/add' + params, {
            method: 'post',
            mode: 'cors'
        }).then(value => value.json())
            .then(result => {
                refreshCampersData();
                messageSuccess('添加成功！');
            })
            .catch(e => console.log(e));
    }

    const getRoomsData = () => {
        fetch(baseUrl + 'csp/con/bunk/all')
            .then(data => data.json())
            .then(json => setRoomsData(json));
    }

    const [campersData, setCampersData] = useState();
    const [roomsData, setRoomsData] = useState();

    useEffect(() => {
        getCampersData();
        getRoomsData();
    }, [])

    const childProps: typeof props = {
        deleteCamperData,
        addCamperData,
        refreshCampersData,
        campersData,
        isTableLoading
    }

    return (
        <div className="camper-content">
            <AddCamperForm {...{ addCamperData } as typeof props}></AddCamperForm>
            <SearchCamperForm {...{ findCamperData, roomsData ,refreshCampersData} as typeof props}></SearchCamperForm>
            <EditableFormTable {...childProps} />
        </div>
    )
}

export default CamperManage;