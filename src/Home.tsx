import React, { Component } from 'react';
import { Card } from 'antd';
const { Meta } = Card;

interface news {
    imgSrc: string;
    title: string | null;
}
interface state {
    list: Array<news>;
}
export default class Home extends Component<any, state> {
    constructor(props: any) {
        super(props);
        this.state = {
            list: [{
                imgSrc: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                title: 'fasd'
            }, {
                imgSrc: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                title: 'asd'
            }, {
                imgSrc: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                title: 'asd'
            }]
        }
    }
    renderNewsList(list: Array<news>) {
        return list.map((val, index: number) => {
            return (
                <Card
                    key={index}
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={val['imgSrc']} />}
                >
                    <Meta
                        title={val['title']}
                        description="www.instagram.com"
                    />
                </Card>
            )
        });
    }
    render() {
        return (
            <div className="home-content">
                <img src={require('./img/overview.jpg')}></img>
                <div>
                    <h1 className="news-header-title">Today's NEWS</h1>
                    <div className="display-flex horizontal-space-around flex-wrap">
                        {this.renderNewsList(this.state['list'])}
                    </div>
                </div>
            </div>
        )
    }
}