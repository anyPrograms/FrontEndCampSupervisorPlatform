import React, { Component } from 'react';
import './App.less';
import { Menu, Tooltip, Button, Icon } from 'antd';
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
      current: pathname.split('/')[1] || 'home',
    }
  }

  handleClick = (e: any) => {
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
            <TabMenu selectedKey={this.state.current}>
              <TabMenu.Item key="home"><Link to="/">HOME</Link></TabMenu.Item>
              <TabMenu.Item key="shop"><Link to="/shop">SHOP</Link></TabMenu.Item>
              <TabMenu.Item key="blog"><Link to="/blog">BLOG</Link></TabMenu.Item>
              <TabMenu.Item key="faq"><Link to="/faq">FAQ</Link></TabMenu.Item>
              <TabMenu.Item key="contact"><Link to="/contact">CONTACT</Link></TabMenu.Item>
            </TabMenu>
          </div>
          <div className="sub-content">
            <AppRoute></AppRoute>
          </div>
        </div>
      </BrowserRouter>

    );
  }
}

class TabMenu extends Component<any> {
  state = { selectedKey: this.props.selectedKey, visible: false };

  static Item = (props: any) => {
    const onclick = () => {
      props.parentsClickHandle && props.parentsClickHandle(props.eventKey);
    }
    return (
      <li onClick={onclick} data-selected={props.selected}>{props.children}</li>
    )
  };

  onClick = (selectedKey: string) => {
    this.setState({
      selectedKey,
      visible: !this.state.visible
    });
  }

  displayMenuList = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    const menu = <div className="tab-container-menu">
      <Icon type='menu' className="tab-container-menu-icon"onClick={this.displayMenuList} ></Icon>
      <ul className={`tab-container-menu-list ${this.state.visible ? 'tab-container-menu-list-visible' : ''}`}>
        {React.Children.map(this.props.children, (child: any) => {
          const props: any = {
            parentsClickHandle: this.onClick,
            eventKey: child.key
          }
          if (child.key === this.state.selectedKey) {
            props['selected'] = true;
          }
          return React.cloneElement(child, props);
        })}
      </ul>
    </div>

    return menu;
  }

}

export default App;