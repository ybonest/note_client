import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link, Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import './index.scss';
import ArticleContent from '../content';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer, Sider } = Layout;

export default class SubMenuCom extends React.Component {
  constructor(){
    super();
    this.state = {
      styles: null
    }
  }
  handleClick = (e) => {
    console.log('click ', e);
  }

  render(){
    let { child, arg, history } = this.props;
    let defaultUri = '';
    let flag = false;
    let defaltSelectKey = ''

    child = child && child.map(item => {
      if(history && history.location.pathname.includes(item.arg)){
        item.child && item.child.forEach(innerItem => {
          if(history.location.pathname.includes(innerItem.arg)){
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
    
    return (
      <div className='note-sub-menu' style={this.state.styles}>
        <Menu
          onClick={this.handleClick}
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
                  return <Menu.Item key={itemChild.arg}><Link to={`/submenu/${arg}/${item.arg}/${itemChild.arg}`}>{itemChild.name}</Link></Menu.Item>
                })}
              </SubMenu>
            );
          })}
        </Menu>
        <Layout>
          <Content style={{ margin: '0 210px 0 220px', backgroundColor: '#fff' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                <Route exact path='/submenu/:type' render={() => {
                  return (
                    <Redirect to={defaultUri}/>
                  )
                }}/>
                <Route path='/submenu/:arg/:arg1/:arg2' render={props => (<ArticleContent {...props}/>)}/>      
              </Switch>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}