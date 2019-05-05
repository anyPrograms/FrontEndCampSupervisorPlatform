import React, { SFC, useEffect, useState } from "react";
import { Button, Table, Input, Form } from 'antd';
import 'antd/dist/antd.css';
import { render } from "react-dom";

import "./styles.css";
import { ColumnProps } from "antd/lib/table/interface";
import { ColumnType } from "antd/lib/list";

const CamperManageForm = (props: any) => {
    const renderInput = (type: string, required: boolean, defaultValue: string, name: string) => {
        const { getFieldDecorator } = props.form;
        return <Form.Item> {getFieldDecorator(name, {
            initialValue: '234',
            rules: [{ required, message: '' }],
        })(<Input key={name} />)} </Form.Item>
    }

    const getData = () => {
        setDataSource([
            {
                "studentId": "S12320008",
                "studentName": "Camille123",
                "studentAge": "123",
                "studentBunk": "",
                "studentStatus": "1"
            },
            {
                "studentId": "S123331007",
                "studentName": "234",
                "studentAge": "32",
                "studentBunk": "",
                "studentStatus": "1"
            },
            {
                "studentId": "S201910004",
                "studentName": "Camille",
                "studentAge": "8",
                "studentBunk": "1556612865",
                "studentStatus": "1"
            }
        ])
    }

    useEffect(getData, []);

    const [dataSource, setDataSource] = useState();
    const [editKey] = useState(-1);
    const [isLoading] = useState(false);

    const components = {
        body: {
            cell: (props: any) => {
                const { record, dataIndex, type, required } = props;
                return <td>{renderInput(type, required, record[dataIndex], dataIndex)}</td>;
            },
        },
    };

    const columnsData = [{
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

    const columns: ColumnProps<ColumnType>[] = columnsData.map((val: any) => ({
        ...val,
        onCell: (record: any) => ({
            record,
            required: val["required"] ? true : false,
            dataIndex: (val as any).dataIndex,
            type: typeof record[(val as any).dataIndex],
            editKey: editKey
        })
    }));


    return (
        <Table rowKey="studentId" loading={isLoading} dataSource={dataSource} columns={columns} components={components} className="camper-info-table" />
    )

}
const EditableFormTable: SFC = Form.create()(CamperManageForm) as any;
const rootElement = document.getElementById("root");
render(<EditableFormTable />, rootElement);
