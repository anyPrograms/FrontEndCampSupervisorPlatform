import React, { useState, useEffect, ReactNode, useMemo } from 'react';
import { Button, Statistic, Modal, Transfer, Pagination, Card, } from 'antd';
import { baseUrl } from '../url/url';

const formatCampers = (undistributedCampers: any, distributedCampers: any) => {
    const allFormatCampers = distributedCampers.concat(undistributedCampers).map((camper: any) => {
        return {
            key: camper['studentId'],
            title: camper['studentName'],
            chosen: false
        }
    });

    const targetKeys = distributedCampers.map(({ studentId }: any) => { return studentId });
    return {
        dataSource: allFormatCampers,
        targetKeys
    }
}

//营员分配房间管理
const Rooms = (props: any) => {
    const [dataSource, setDataSource] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [chosenRoom, setChosenRoom] = useState({});
    const { allBunks, distributedCampers, undistributedCampers, setStudentToBunk, getDistributedCampersByBunkId, getUndistributedCampersData } = props;
    const filterOption = (inputValue: string, option: any) => option.description.indexOf(inputValue) > -1

    const closeModal = () => {
        setModalVisible(false);
    }

    const openModel = (bunk: any) => {
        setChosenRoom(bunk);
        getDistributedCampersByBunkId(bunk['bunkId']);
        getUndistributedCampersData();
    }

    useEffect(() => {
        const { dataSource, targetKeys } = formatCampers(undistributedCampers, distributedCampers);
        setDataSource(dataSource);
        setTargetKeys(targetKeys);
    }, [distributedCampers, undistributedCampers])

    const clickHandle = (bunk: any) => {
        setModalVisible(true);
        openModel(bunk);
    }

    const renderRooms = () => {
        return (
            <Card>{allBunks.map((bunk: any) => (
                <Card.Grid key={bunk['bunkId']} style={{ padding: 0, width: '200px' }}>
                    <div onClick={() => { clickHandle(bunk) }} style={{
                        textAlign: 'center',
                        padding: '2em'
                    }}>
                        <p >房间名称: {bunk['bunkName']}</p>
                        <p>当前分配: {bunk['existedNum'] + ` / ${bunk['bunkVol']}`}</p>
                    </div>

                </Card.Grid>
            ))}</Card>
        )
    };

    const transferChangeHandle = (targetKeys: string[], direction: string, moveKeys: string[]) => {
        setTargetKeys(targetKeys as []);
        if (direction === 'right')//房间新增的人员
        {
            setStudentToBunk(moveKeys[0], (chosenRoom as any)['bunkId']);
        } else {
            setStudentToBunk(moveKeys[0], '');
        }
    }

    return (
        <div style={{ overflow: 'hidden', display: 'flex' }}>
            <Modal visible={modalVisible} onCancel={closeModal} footer={null} style={{ textAlign: 'center' }} centered title={(chosenRoom as any)['bunkName'] || ''}>
                <Transfer
                    listStyle={{ textAlign: "left" }}
                    dataSource={dataSource}
                    targetKeys={targetKeys}
                    filterOption={filterOption}
                    onChange={transferChangeHandle}
                    render={(item: ReactNode) => (item as any).title}
                />
            </Modal>
            {renderRooms()}
        </div>
    )

}

const CreateRoom = () => {
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

const RoomManage = () => {
    const [allBunks, setAllBunks] = useState([]);
    const [countUndistributed, setCountUndistributed] = useState(0);
    const [countDistributed, setCountDistributed] = useState(0);
    const [undistributedCampers, setUndistributedCampers] = useState([]);
    const [distributedCampers, setDistributedCampers] = useState([]);
    const getCountUndistributed = () => {
        fetch(baseUrl + 'csp/con/student/countUndistributed')
            .then(data => data.json())
            .then(num => setCountUndistributed(num));
    };

    const getCountDistributed = () => {
        fetch(baseUrl + 'csp/con/student/countDistributed')
            .then(data => data.json())
            .then(num => setCountDistributed(num));
    };

    const getUndistributedCampersData = () => {
        fetch(baseUrl + 'csp/con/student/undistributed')
            .then(data => data.json())
            .then(json => setUndistributedCampers(json));
    }

    const getDistributedCampersByBunkId = (id: string) => {
        fetch(baseUrl + 'csp/con/student/findStudentsByBunk/' + id)
            .then(data => data.json())
            .then(json => setDistributedCampers(json));
    }

    const setStudentToBunk = (studentId: string, bunkId?: string) => {
        const addUrl = baseUrl + `csp/con/student/addStudentToBunk?studentId=${studentId}&bunkId=${bunkId}`;
        const deleteUrl = baseUrl + `csp/con/student/deleteStudent/${studentId}`;
        let current = deleteUrl;
        if (bunkId) {
            current = addUrl
        }
        fetch(current, { method: 'post' }).then(data => data.ok).then(refreshData);
    }

    const getAllBunksData = () => {
        fetch(baseUrl + 'csp/con/bunk/all')
            .then(data => data.json())
            .then(rooms => {
                setAllBunks(rooms);
            }).catch(e => console.log(e));
    }
    const refreshData = () => {
        getAllBunksData();
        getCountDistributed();
        getCountUndistributed();
    }
    useEffect(refreshData, []);

    return (
        <div className="room-manage-content">
            <div style={{ display: 'flex', justifyContent: 'center', boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)', padding: '1em 0' }}>
                <Statistic title="未分配的人数" value={countUndistributed} valueStyle={{ textAlign: "center", color: 'green' }} />
                <Statistic title="已分配的人数" value={countDistributed} style={{ marginLeft: '2em' }} valueStyle={{ textAlign: "center", color: 'red' }} />
            </div>
            <Rooms {...{ allBunks, undistributedCampers, distributedCampers, getDistributedCampersByBunkId, getUndistributedCampersData, setStudentToBunk }}></Rooms>
            <CreateRoom />
        </div>
    )
}

export default RoomManage;