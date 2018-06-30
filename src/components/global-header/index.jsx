import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';
import ActiveLink from './ActiveLink.js';


export default class GlobalHeader extends React.Component {
  state = {
    current: 'home',
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  onSelectMenu = (key) => {
    this.setState({
      current: key,
    });
  }
  render() {
    const { child, arg } = this.props;
    const { current } = this.state;

    const menu = (
      <Menu className='note-drop'>
        {child && child.map(item => (
          <Menu.Item key={item.arg}><Link to={`/submenu/${item.arg}`}>{item.name}</Link></Menu.Item>
        ))}
      </Menu>
    )
    return (
      <div className='global-head'>
        <Menu
          // onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
        {[
          <Menu.Item key="home">
            <ActiveLink to='/home' current={current} activeOnlyWhenExact={true} onSelect={() => this.onSelectMenu('home')}>
              首页
            </ActiveLink>
          </Menu.Item>,
          <Menu.Item key="categories">
            <ActiveLink to='/categories' current={current} onSelect={() => this.onSelectMenu('categories')}>
              笔记分类
            </ActiveLink>
          </Menu.Item>,
          <Menu.Item key="calendar">
            <ActiveLink to='/calendar' current={current} onSelect={() => this.onSelectMenu('calendar')}>
              日程
            </ActiveLink>
          </Menu.Item>
        ]}
          
        </Menu>
      </div>
    );
  }
}