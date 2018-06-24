import React from 'react';
import 'antd/dist/antd.min.css';
import 'styles/layout.scss'
import { Layout, Menu, Breadcrumb, Icon, Avatar, Calendar } from 'antd';
import { mdRequest, sideBarData } from 'services/index.js';
import ArticleContent from '../content';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import SubMenuCom from 'components/subMenu';
import SideBar from 'components/side-bar';
const { Header, Content, Footer, Sider } = Layout;


class LayoutComponent extends React.Component {
  constructor(){
    super();
  }
  state = {
    collapsed: false,
    left :200,
    sideBarData: null
  };
  static childContextTypes = {
    treeData: PropTypes.array
  }
  getChildContext(){
    return {
      treeData: ['1']
    }
  }
  componentDidMount(){
    const that = this;
    sideBarData().then(function(response){
      that.setState({
        sideBarData: response.data
      })
    })
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
    collapsed ? this.setState({left: 80}) : this.setState({left: 200})
  }
  render(){
    const { children } = this.props;
    let child = null, arg = null;
    if(this.state.sideBarData){
      child = this.state.sideBarData.child;
      arg = this.state.sideBarData.arg;
    } 
    return (
      <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <div>
          <SideBar child={child} arg={arg}/>
          <Route path='/submenu/:type' render={props => (
            <SubMenuCom {...props}  child={child} arg={arg}/>
          )}/>
        </div>
        <Layout>
          <Content style={{ margin: '0 210px 0 350px', backgroundColor: '#fff' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Route path='/:arg/:arg1/:arg2' component={ArticleContent}/>              
            </div>
          </Content>
        </Layout>
      </Layout>
      </Router>
    );
  }
}

export default LayoutComponent;