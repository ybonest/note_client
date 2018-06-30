import React from 'react';
import 'antd/dist/antd.min.css';
import 'styles/layout.scss'
import { Layout } from 'antd';
import { sideBarData } from 'services/index.js';
import { Link, Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import SubMenuCom from 'components/subMenu';
import GlobalHeader from 'components/global-header';
import SideBar from 'components/side-bar';
import Home from 'components/home';
import Categories from 'components/categories';
import PageRight from 'components/page-right';
import CalendarDay from 'components/calendar';
import './index.scss';

class LayoutComponent extends React.Component {
  constructor(){
    super();
  }
  state = {
    collapsed: false,
    left :200,
    sideBarData: null,
    rightShow: true,
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
    const { rightShow } = this.state;
    if(this.state.sideBarData){
      child = this.state.sideBarData.child;
      arg = this.state.sideBarData.arg;
    }
    return (
      <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <div>
          <GlobalHeader child={child} arg={arg}/>
          {/*<SideBar child={child} arg={arg}/>*/}
              <Route path='/categories/:type' render={props => (
                <SubMenuCom {...props}  child={child} arg={arg} />
              )}/>
              <Route exact path='/:page' render={({location}) => {
                if (location && location.pathname === '/calendar') {
                  return <Route exact path='/calendar' component={CalendarDay}/>;
                }
                return (
                  <div className='page-layout'>
                    <div className='page-left'>
                      <Switch>
                        <Route path='/home' component={Home}/>
                        <Route exact path='/categories' component={Categories}/>
                      </Switch>
                    </div>
                    <div className='page-right'>
                      <PageRight />
                    </div>
                  </div>
                )
              }} />
        </div>
      </Layout>
      </Router>
    );
  }
}

export default LayoutComponent;