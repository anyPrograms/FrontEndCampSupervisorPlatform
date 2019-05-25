import React, { SFC, useState } from 'react';
import { Button, Icon, Form, Input, DatePicker, Select } from 'antd';

const SearchPositionForm = (props: any) => {
    const { form: { getFieldDecorator } } = props;
    const [isFormVisible, setIsFormVisible] = useState(false);
    return (<>
        <Button className='search-button' onClick={() => setIsFormVisible(!isFormVisible)} icon={`caret-${isFormVisible ? 'up' : 'down'}`} type='primary' />
        <Form layout="inline" className={`${isFormVisible ? '' : 'hidden'}`}>
            <Form.Item>
                {getFieldDecorator('username')(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="姓名"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('date')(
                    <DatePicker placeholder="日期" />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('time')(
                    <DatePicker placeholder="时间" mode="time" />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('positon')(
                    <Select
                        showSearch
                        placeholder="地点"
                        optionFilterProp="children"
                        style={{ width: '100%' }}
                    >
                        <Select.Option value="jack">Jack</Select.Option>
                        <Select.Option value="lucy">Lucy</Select.Option>
                        <Select.Option value="tom">Tom</Select.Option>
                    </Select>
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">搜索</Button>
            </Form.Item>
        </Form>
    </>);
}

const Position: SFC = (props: any) => {
    const WrappedHorizontalSearchPositionForm: SFC = Form.create()(SearchPositionForm) as any;

    return (
        <div className="position-manage">
            <WrappedHorizontalSearchPositionForm />
            <div className="position-button-container">
                {['篮球场', '湖南岸', '足球场', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((val: any, key: number) => (<Button {...{ key }}>{val}</Button>))}
            </div>
        </div>
    )
}

export default Position;