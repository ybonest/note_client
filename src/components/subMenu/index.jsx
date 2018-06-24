import React from 'react';
import { Menu, Icon } from 'antd';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class SubMenuCom extends React.Component {
  constructor(){
    super();
    this.state = {
      styles: null
    }
    document.addEventListener('scroll', this.handleScroll)
  }
  handleClick = (e) => {
    console.log('click ', e);
  }
  handleScroll = (e) => {
    console.log(window.pageYOffset);
    if(window.pageYOffset > 45 && !this.state.styles) {
      this.setState({
        styles: {position: 'fixed',top:'0px'}
      })
    }
    if(window.pageYOffset <=45 && this.state.styles) {
      console.log(123);
      
      this.setState({
        styles: null
      })
    }
  }
  componentWillUnmount(){
    // document.removeEventListener('scroll');
  }
  render(){
    const { child, arg } = this.props;
    console.log(123123);
    console.log(this.props);
    
    
    return (
      <div className='note-sub-menu' style={this.state.styles}>
        <Menu
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          {child && child.map((item) => {
            return (
              <SubMenu
                key={item.name}
                title={<span><Icon type="appstore" /><span>{item.name}</span></span>}
              >
                {item.child && item.child.map((itemChild) => {
                  return <Menu.Item key={itemChild.name}><Link to={`/${arg}/${item.arg}/${itemChild.arg}`}>{itemChild.name}</Link></Menu.Item>
                })}
              </SubMenu>
            );
          })}
        </Menu>
      </div>
    );
  }
}