import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './style.scss';
const SubMenu = Menu.SubMenu;
export default class SideBar extends React.Component {
  constructor(){
    super()
  }
  render(){
    const { child, arg } = this.props;
    
    return (
    <div className='sidebar'>
      <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={true}
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>Option 3</span>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="form" /><span>Note</span></span>}>
            {child && child.map(item => (
              <Menu.Item key={item.arg}><Link to={`/submenu/${item.arg}`}>{item.name}</Link></Menu.Item>
            ))}
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}