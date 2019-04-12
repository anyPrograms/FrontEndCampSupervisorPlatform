import React, { Component, useState, useEffect, useCallback } from 'react';
import { Button, Statistic, Modal, Transfer, Pagination, Card, } from 'antd';

const RoomManage = () => {
    return (
        <div className="room-manage-content">
            <div style={{ display: 'flex', justifyContent: 'center', boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)', padding: '1em 0' }}>
                <Statistic title="未分配的人数" value={112893} />
                <Statistic title="已分配的人数" value={112893} style={{ marginLeft: '2em' }} />
            </div>
            <Rooms></Rooms>
            <Pagination simple defaultCurrent={2} total={40} style={{ textAlign: 'center', padding: '1em' }} />
            <CreateRoom />
        </div>
    )
}

//营员分配房间管理
const Rooms = (props: any) => {
    const [mockData, setMockData] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [rooms, setRooms] = useState(() => new Array(12).fill({
        name: 'room1',
        maxContains: 10,
        alreadyInCamperId: ['2', '5'],
    }, 0));
    const getMock = useCallback(() => {
        const targetKeys: any = [];
        const mockData: any = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        setMockData(mockData);
        setTargetKeys(targetKeys);
    }, []);
    const filterOption = (inputValue: string, option: any) => option.description.indexOf(inputValue) > -1

    const handleChange = (targetKeys: any) => {
        setTargetKeys(targetKeys);
    }

    const showModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const handleCardClick = (evt: any) => {
        showModal();
    }

    const renderRooms = () => {
        return (
            <Card>{rooms.map((val, key) => (
                <Card.Grid key={key} style={{ padding: 0, minWidth: '100px' }}>
                    <div onClick={handleCardClick} style={{
                        textAlign: 'center',
                        padding: '2em'
                    }}>
                        <p >room: {val.name}</p>
                        <p>number: {val.alreadyInCamperId.length + ` / ${val.maxContains}`}</p>
                    </div>

                </Card.Grid>
            ))}</Card>
        )
    }

    useEffect(() => {
        getMock();
    }, [getMock])

    return (
        <div style={{ overflow: 'hidden', display: 'flex' }}>
            <Modal visible={modalVisible} onCancel={closeModal} footer={null} style={{ textAlign: 'center' }} centered title={'RoomName1'}>
                <Transfer
                    dataSource={mockData}
                    filterOption={filterOption}
                    targetKeys={targetKeys}
                    onChange={handleChange}
                    render={(item: any) => item.title}
                />
            </Modal>
            {renderRooms()}
        </div>
    )

}

const CreateRoom = (props: any) => {
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


export default RoomManage;