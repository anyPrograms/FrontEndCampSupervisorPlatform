import React, { Component } from 'react';
import './App.less';
import { Menu, Icon } from 'antd';
import { Redirect, BrowserRouter, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  state = {
    current: 'home',
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
              HOME
          </Menu.Item>
            <Menu.Item key="camping" disabled>
              CAMP ING
          </Menu.Item>
            <Menu.Item key="blog">
              <Link to="https://ant.design" rel="noopener noreferrer">BLOG</Link>
            </Menu.Item>
            <Menu.Item key="faq">
              <Link to="https://ant.design" rel="noopener noreferrer">FAQ</Link>
            </Menu.Item>
            <Menu.Item key="contact">
              <Link to="https://ant.design" rel="noopener noreferrer">CONTACT</Link>
            </Menu.Item>
          </Menu>
        </div>

      </BrowserRouter>
    );
  }
}

export default App;
