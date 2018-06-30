import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link, Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import './index.scss';
import ArticleContent from '../content';
import _ from 'lodash';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer, Sider } = Layout;

export default class SubMenuCom extends React.Component {
  constructor(){
    super();
    /**
     * 增加标记解决下面警告
     * Warning: Can't call setState (or forceUpdate) on an unmounted component.
     *  This is a no-op, but it indicates a memory leak in your application. To fix, 
     * cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
     */
    this.flag = false;
    this.state = {
      styles: null,
      scrollFlag: false,
    }
  }
  // handleClick = (e) => {
  //   console.log('click ', e);
  // }
  
  componentDidMount() {
    this.flag = true;
    window.addEventListener('scroll', _.throttle(this.scrollFunction, 50));
  }

  componentWillUnmount() {
    this.flag = false;
    window.removeEventListener('scroll', this.scrollFunction);
  }

  scrollFunction = () => {
    if(!this.flag) return;
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 70) {
      this.setState({
        scrollFlag: true,
      });
    } else {
      this.setState({
        scrollFlag: false,
      });
    }
  }

  render(){
    let { child, arg, history } = this.props;
    let defaultUri = '';
    let flag = false;
    let defaltSelectKey = ''

    child = child && child.map(item => {
      if(history && history.location.pathname.includes(item.arg)){
        item.child && item.child.forEach(innerItem => {
          if(history.location.pathname.endsWith(innerItem.arg)){
            flag = true;
          };
        })
        if(!flag){
          defaltSelectKey = item.child[0].arg;
          defaultUri = `${history.location.pathname.replace('submenu',`submenu/${arg}`)}/${item.child[0].arg}`;
        }
        return item;
      }
    })

    const { scrollFlag } = this.state;

    const className = classNames({
      ['real-menu']: scrollFlag
    })

    
    return (
      <div className='note-sub-menu' style={this.state.styles}>
        <div ref={node => {this.node = node}} className='sub-menu'>
          <Menu
            className={className}
            // onClick={this.handleClick}
            defaultSelectedKeys={[defaltSelectKey]}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            {child && child.map((item) => {
              if(!item){
                return;
              }
              return (
                <SubMenu
                  key='sub1'
                  title={<span><Icon type="appstore" /><span>{item.name}</span></span>}
                >
                  {item.child && item.child.map((itemChild) => {
                    return <Menu.Item key={itemChild.arg}><Link to={`/categories/${item.arg}/${itemChild.arg}`}>{itemChild.name}</Link></Menu.Item>
                  })}
                </SubMenu>
              );
            })}
          </Menu>
        </div>
        <Layout>
          <Content style={{ backgroundColor: '#fff' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
               <Route exact path='/categories/:type' render={() => {
                  return (
                    <Redirect to={defaultUri}/>
                  )
                }}/>
                <Route path='/:arg/:arg1/:arg2' render={props => (<ArticleContent {...props}/>)}/>      
              </Switch>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}