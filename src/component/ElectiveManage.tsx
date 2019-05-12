import React, { SFC, useState, useEffect } from "react";
import { List, message, Table } from "antd";
import { SearchCamperForm } from "./CamperManage";
import { baseUrl } from "../url/url";

const ElectiveManage: SFC = (props: any) => {
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

    const getElectivesData = () => {
        fetch(baseUrl + 'csp/con/elective/all').then(data => data.json()).then(json => {
            setElectivesData(json);
            // 临时
        })
    }

    const getRoomsData = () => {
        fetch(baseUrl + 'csp/con/bunk/all')
            .then(data => data.json())
            .then(json => setRoomsData(json));
    }

    const getSelectedElectivesData = () => {
        // electivesData
    }

    const refreshSelectedElectivesData = (campersId: string) => {
        if (!campersId) {
            setSelectedElectivesData([]);
        } else {
            const selectedElectiveKeys = electivesData.map(({ electiveId }: any, index: number) => index).filter(() => Math.random() > 0.5);
            setSelectedElectivesData(selectedElectiveKeys);
        }
    }

    const [campersData, setCampersData] = useState();
    const [roomsData, setRoomsData] = useState();
    const [electivesData, setElectivesData] = useState();
    const [selectedElectivesData, setSelectedElectivesData] = useState();

    useEffect(() => {
        getCampersData();
        getElectivesData();
    }, []);
    return (
        <div className="elective-manage-content">
            <CampersList {...{ campersData, refreshSelectedElectivesData } as typeof props}></CampersList>
            <Course {...{ electivesData, selectedElectivesData, setSelectedElectivesData } as typeof props}></Course>
        </div>
    );
}

const CampersList: SFC = (props: any) => {
    const columns = [{
        title: '学生姓名',
        dataIndex: 'studentName',
        className: 'text-align-center',
        onCell: (record: any) => ({
            record
        })
    }];

    const components = {
        body: {
            cell: (props: any) => {
                const { record } = props;
                return <td style={{ textAlign: "center" }} onClick={() => {
                    refreshSelectedElectivesData(record['studentId']);
                }}>{record['studentName']}</td>
            }
        }
    }

    const { campersData, refreshSelectedElectivesData } = props;
    return (<div style={{ flexBasis: '400px' }}>
        <SearchCamperForm></SearchCamperForm>
        <Table bordered columns={columns} dataSource={campersData} components={components} />
    </div>
    )
}

const Course: SFC = (props: any) => {
    const columns = [{
        title: '课程名称',
        dataIndex: 'electiveName',
        className: 'text-align-center'
    }];
    const { electivesData, selectedElectivesData = [], setSelectedElectivesData } = props;
    const rowSelection = {
        selectedRowKeys: selectedElectivesData,
        onChange: (selectedRowKeys: string, selectedRows: string) => {
            setSelectedElectivesData(selectedRowKeys);
        },
        getCheckboxProps: (record: any) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <Table bordered rowSelection={rowSelection as any} columns={columns} dataSource={electivesData} />
    )
}

export default ElectiveManage;