import React, { useState, SFC, ReactNode, ReactElement } from 'react';
import '../less/App.less';
import { Icon } from 'antd';
import { BrowserRouter, Link } from 'react-router-dom';
import AppRoute from './AppRoute';

type TabMenuProps = {
  selectedKey: string;
}
type ItemType = {
  parentsClickHandle?(eventKey: string): void;
  eventKey?: string;
  selected?: boolean;
}

const App = () => {
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

const TabMenu: SFC<TabMenuProps> = ({ selectedKey: defaultSelectedKey, children }) => {
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);
  const [visible, setVisible] = useState(false);
  const handleChangeTab = (selectedKey: string) => {
    setSelectedKey(selectedKey);
    setVisible(!visible);
  };

  const menu = <div className="tab-container-menu">
    <Icon type='menu' className="tab-container-menu-icon" onClick={() => setVisible(!visible)} ></Icon>
    <ul className={`tab-container-menu-list ${visible ? 'tab-container-menu-list-visible' : ''}`}>
      {React.Children.map(children, (child: ReactNode) => {

        const props: ItemType = {
          parentsClickHandle: handleChangeTab,
          eventKey: (child as any).key
        }
        if ((child as any).key === selectedKey) {
          props['selected'] = true;
        }
        return React.cloneElement(child as ReactElement, props);
      })}
    </ul>
  </div>

  return menu;
}

const Item: SFC<ItemType> = ({ parentsClickHandle, eventKey, selected, children }) => {
  const onclick = () => {
    parentsClickHandle && parentsClickHandle(eventKey as string);
  }
  return <li onClick={onclick} data-selected={selected} > {children}</li >
}

export default App;