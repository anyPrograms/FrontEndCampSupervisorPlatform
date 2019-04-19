import React, { useState, MouseEvent, ReactNode, SFC } from 'react';
import { Button, Table, Input, Icon, Form, InputNumber, Tooltip } from 'antd';
import { ColumnProps } from 'antd/lib/table/interface';

type StudentType = {
    studentId: string | number;
    studentName: string;
    studentStatus: number;
    studentBunk: number;
}

type ColumnType = StudentType & {
    onCell?(onCell: any): void;
};

const CamperManage: SFC = (props: any) => {
    const renderInput = (type: string, defaultValue: string, name: string) => {
        const { getFieldDecorator } = props.form;
        return <Form.Item hasFeedback >{getFieldDecorator(name, {
            initialValue: defaultValue,
            rules: [{ required: true, message: '' }]
        })((() => type === 'number' ? <InputNumber></InputNumber> : <Input />)())} </Form.Item>
    }

    const handleSubmit = (e: MouseEvent<HTMLElement>, obj: {
        key: number
    }) => {
        e.preventDefault();
        props.form.validateFields((err: Error, values: any) => {
            values = { ...values, ...obj };
            if (!err) {
                updateData(values);
                setEditKey(-1);
            }
        });
    }

    const updateData = (newData: any) => {

    }

    const getColumnSearchProps = () => ({
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

    const [editKey, setEditKey] = useState(-1);
    const [isLoading] = useState(false);
    const components = {
        body: {
            cell: (props: any) => {
                const { editKey, record, dataIndex, type } = props;
                if (!record) return <td>{props.children}</td>
                const editable = record.studentId === editKey;
                if (dataIndex === 'opreate') {
                    return <td>{(() => {
                        if (editKey === -1)
                            return (<>
                                <Tooltip placement="top" title={'编辑本行信息'} >
                                    <a data-disabled='false' onClick={() => setEditKey(record.studentId)}> <Icon type="form"></Icon></a>
                                </Tooltip>
                                <Tooltip placement="top" title={'删除本行信息'} >
                                    <a style={{ color: 'rgb(29, 165, 122)ed', marginLeft: '1em' }} onClick={() => { }}> <Icon type="delete"></Icon></a>
                                </Tooltip>
                            </>
                            )
                        if (editable) {
                            return React.Children.toArray([
                                <a onClick={(e: MouseEvent<HTMLElement>) => handleSubmit(e, { key: editKey })} style={{ marginRight: '1em' }}>
                                    <Icon type="check"></Icon></a>,
                                <a onClick={() => setEditKey(-1)}><Icon type="close"></Icon></a>
                            ])
                        } else {

                            return <a data-disabled='true'><Icon type="form"></Icon></a>
                        }
                    })()
                    }</td>
                }
                return <td>{editable ? renderInput(type, record[dataIndex], dataIndex) : props.children}</td>;
            },
        },
    };

    const columnsData = [{
        title: 'ID',
        dataIndex: 'studentId',
        width: '20%',
        ...getColumnSearchProps(),
    }, {
        title: '姓名',
        dataIndex: 'studentName',
        width: '20%'
    }, {
        title: '铺位',
        dataIndex: 'studentBunk',
        width: '20%'
    }, {
        title: '状态',
        dataIndex: 'studentStatus',
        width: '20%'
    }, {
        title: '编辑',
        dataIndex: 'opreate',
        width: '20%'
    }];

    const columns: ColumnProps<ColumnType>[] = columnsData.map((val: any) => ({
        ...val,
        onCell: (record: any) => ({
            record,
            dataIndex: (val as any).dataIndex,
            type: typeof record[(val as any).dataIndex],
            editKey: editKey
        })
    }));

    return (
        <div className="camper-content">
            <Form>
                <Table rowKey="studentId" loading={isLoading} dataSource={dataSource} columns={columns} components={components} className="camper-info-table" />
            </Form>
        </div>
    )
}

const EditableFormTable: SFC = Form.create()(CamperManage) as any;
export default EditableFormTable;




















const dataSource: StudentType[] = new Array(100).fill(0).map((_val, index) => {
    return {
        studentId: index,
        studentName: '胡彦斌',
        studentStatus: Math.random() > .5 ? 0 : 1,
        studentBunk: 32 + index
    }
});