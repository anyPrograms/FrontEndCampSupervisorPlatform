import React, { Component, useState } from 'react';
import '../less/App.less';
import { Icon } from 'antd';
import { BrowserRouter, Link } from 'react-router-dom';
import AppRoute from './AppRoute';

const App = (props: any) => {
  const [current,] = useState(() => {
    const pathname: string = location.pathname;
    return pathname.split('/')[1] || 'home';
  });

  return (
    <BrowserRouter>
      <div className="main-content">
        <div className="display-flex tab-container horizontal-space-between">
          <a href="/" className="display-flex align-items-center tab-logon">
            <img src={require('../img/logon.png')} className="display-block" />
          </a>
          <TabMenu selectedKey={current}>
            <Item key="home"><Link to="/">HOME</Link></Item>
            <Item key="shop"><Link to="/shop">SHOP</Link></Item>
            <Item key="blog"><Link to="/blog">BLOG</Link></Item>
            <Item key="faq"><Link to="/faq">FAQ</Link></Item>
            <Item key="contact"><Link to="/contact">CONTACT</Link></Item>
          </TabMenu>
        </div>
        <div className="sub-content">
          <AppRoute></AppRoute>
        </div>
      </div>
    </BrowserRouter>

  );
}

const TabMenu = (props: any) => {
  const [selectedKey, setSelectedKey] = useState(props.selectedKey);
  const [visible, setVisible] = useState(false);
  const onClick = (selectedKey: string) => {
    setSelectedKey(selectedKey);
    setVisible(!visible);
  };

  const displayMenuList = () => {
    setVisible(!visible);
  };

  const menu = <div className="tab-container-menu">
    <Icon type='menu' className="tab-container-menu-icon" onClick={displayMenuList} ></Icon>
    <ul className={`tab-container-menu-list ${visible ? 'tab-container-menu-list-visible' : ''}`}>
      {React.Children.map(props.children, (child: any) => {
        const props: any = {
          parentsClickHandle: onClick,
          eventKey: child.key
        }
        if (child.key === selectedKey) {
          props['selected'] = true;
        }
        return React.cloneElement(child, props);
      })}
    </ul>
  </div>

  return menu;
}


const Item = (props: any) => {
  const onclick = () => {
    props.parentsClickHandle && props.parentsClickHandle(props.eventKey);
  }
  return <li onClick={onclick} data-selected={props.selected} > {props.children}</li >
}

export default App;