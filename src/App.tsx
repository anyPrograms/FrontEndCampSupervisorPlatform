import React, { Component } from 'react';
import './App.less';
import { Menu } from 'antd';
import { BrowserRouter, Link } from 'react-router-dom';
import AppRoute from './AppRoute';
interface state {
  current: string;
}
class App extends Component<any, state>{
  constructor(props: any) {
    super(props);
    const pathname: string = location.pathname;
    this.state = {
      current: pathname.slice(1) || 'home',
    }
  }

  handleClick = (e: any) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <BrowserRouter>

        <div className="main-content">
          <div className="display-flex tab-container horizontal-space-between">
            <a href="/" className="display-flex align-items-center tab-logon">
              <img src={require('./img/logon.png')} className="display-block" />
            </a>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              className="display-flex horizontal-center border-none"
            >
              <Menu.Item key="home">
                <Link to="/">HOME</Link>
              </Menu.Item>
              <Menu.Item key="shop">
                <Link to="/shop">SHOP</Link>
              </Menu.Item>
              <Menu.Item key="blog">
                <a href="https://ant.design" rel="noopener noreferrer">BLOG</a>
              </Menu.Item>
              <Menu.Item key="faq">
                <a href="https://ant.design" rel="noopener noreferrer">FAQ</a>
              </Menu.Item>
              <Menu.Item key="contact">
                <a href="https://ant.design" rel="noopener noreferrer">CONTACT</a>
              </Menu.Item>
            </Menu>
          </div>
          <div className="sub-content">
            <AppRoute></AppRoute>
          </div>

        </div>
      </BrowserRouter>

    );
  }
}

export default App;
