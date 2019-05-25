import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { Button, Statistic, Modal, Transfer, Pagination, Card, } from 'antd';
import { baseUrl } from '../url/url';

const formatCampers = (campers: any, campersOfChosenRoom: any) => {
    const campersOfNotChosenRoom = campers.filter(({ studentId }: any) => {
        const isSelected = campersOfChosenRoom.find(({ key }: any) => key === studentId);
        return !isSelected;
    });

    const campersWithFormatOfNotChosenRoom = campersOfNotChosenRoom.map((camper: any) => (
        {
            key: camper['studentId'],
            title: camper['studentName'],
            chosen: false
        })
    );

    const campersWithFormatOfChosenRoom = campersOfChosenRoom.map((camper: any) => (
        {
            key: camper['studentId'],
            title: camper['studentName'],
            chosen: false
        })
    );

    const allFormatCampers = campersWithFormatOfNotChosenRoom.concat(campersWithFormatOfChosenRoom);

    const targetKeys = campersWithFormatOfChosenRoom.map(({ key }: any) => key);
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
    let chosenRoom: any = {};
    const { allBunks, distributedCampers, undistributedCampers } = props;
    const filterOption = (inputValue: string, option: any) => option.description.indexOf(inputValue) > -1

    const closeModal = () => {
        setModalVisible(false);
    }

    const openModel = (bunk: any) => {
        chosenRoom = bunk;
        const allCampers = distributedCampers.concat(undistributedCampers);
        const { dataSource, targetKeys } = formatCampers(allCampers, chosenRoom.campers);
        setDataSource(dataSource);
        setTargetKeys(targetKeys);
    }

    const clickHandle = (bunk: any) => {
        setModalVisible(true);
        openModel(bunk);
    }

    const renderRooms = () => {
        return (
            <Card>{allBunks.map((bunk: any, key: number) => (
                <Card.Grid key={key} style={{ padding: 0, width: '200px' }}>
                    <div onClick={() => { clickHandle(bunk) }} style={{
                        textAlign: 'center',
                        padding: '2em'
                    }}>
                        <p >房间名称: {bunk.bunkName}</p>
                        <p>当前分配: {bunk.campers.length + ` / ${bunk.bunkVol}`}</p>
                    </div>

                </Card.Grid>
            ))}</Card>
        )
    };

    const transferChangeHandle = (targetKeys: string[], direction: string, moveKeys: string[]) => {
        setTargetKeys(targetKeys as []);
        if (direction === 'right')//房间新增的人员
        {

        } else {

        }
    }

    return (
        <div style={{ overflow: 'hidden', display: 'flex' }}>
            <Modal visible={modalVisible} onCancel={closeModal} footer={null} style={{ textAlign: 'center' }} centered title={chosenRoom['bunkName'] || ''}>
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
    const [undistributedCampers, setUndistributedCampers] = useState([]);
    const [distributedCampers, setDistributedCampers] = useState([]);
    const [allBunks, setAllBunks] = useState([]);

    const getAllCampersData = () => {
        fetch(baseUrl + 'csp/con/student/all').then(data => data.json()).then(campers => {
            const undistributedCampers: any[] = [];
            const distributedCampers: any[] = [];
            campers.forEach((camper: any) => {
                if (camper['studentBunk']) {
                    distributedCampers.push(camper);
                } else {
                    undistributedCampers.push(camper);
                }
            });
            setUndistributedCampers(undistributedCampers as never[]);
            setDistributedCampers(distributedCampers as never[]);
        });
    };

    const getAllUndistributedCampersData = () => {
        fetch(baseUrl + 'con/student/undistributed').then(data => data.json()).then(campers => {
            setUndistributedCampers(campers);
        });
    }

    const getDistributedCampersByBunkId = (id: string) => {
        fetch(baseUrl + 'con/student/findStudentsByBunk/' + id).then(data => data.json()).then(campers => {
            setDistributedCampers(campers);
        });
    }

    const getAllBunksData = () => {
        fetch(baseUrl + 'csp/con/bunk/all')
            .then(data => data.json())
            .then(rooms => {
                const campersOfRooms = rooms.map(({ bunkId }: any) => fetch(baseUrl + 'csp/con/student/findStudentsByBunk/' + bunkId).then(data => data.json()));

                Promise.all(campersOfRooms)
                    .then(campersOfRooms => {
                        campersOfRooms.forEach((campersOfRoom, index) => {
                            Object.assign(rooms[index], { campers: campersOfRoom });
                        });

                        setAllBunks(rooms);
                    });

            }).catch(e => console.log(e));
    }

    const refreshAllBunksData = () => {
        getAllBunksData();
    }

    useEffect(() => {
        getAllCampersData();
        getAllBunksData();
    }, []);

    return (
        <div className="room-manage-content">
            <div style={{ display: 'flex', justifyContent: 'center', boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)', padding: '1em 0' }}>
                <Statistic title="未分配的人数" value={undistributedCampers.length} valueStyle={{ textAlign: "center", color: 'green' }} />
                <Statistic title="已分配的人数" value={distributedCampers.length} style={{ marginLeft: '2em' }} valueStyle={{ textAlign: "center", color: 'red' }} />
            </div>
            <Rooms {...{ allBunks, distributedCampers, undistributedCampers }}></Rooms>
            <CreateRoom />
        </div>
    )
}

export default RoomManage;