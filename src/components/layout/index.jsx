import React from 'react';
import 'antd/dist/antd.min.css';
import 'styles/layout.scss'
import { Layout, Menu, Breadcrumb, Icon, Avatar, Calendar } from 'antd';
import { mdRequest, sideBarData } from 'services/index.js';
import ArticleContent from '../content';
import { Link, Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import SubMenuCom from 'components/subMenu';
import SideBar from 'components/side-bar';
const { Header, Content, Footer, Sider } = Layout;

// <Route path='/submenu/:arg/:arg1/:arg2' component={ArticleContent}/>              

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
  render(){
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
          <Switch>
            <Route path='/submenu/:type' render={props => (
              <SubMenuCom {...props}  child={child} arg={arg} />
            )}/>
          </Switch>
        </div>
      </Layout>
      </Router>
    );
  }
}

export default LayoutComponent;