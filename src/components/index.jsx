import React from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import LayoutComponent from 'components/layout';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Page from 'components/page';
moment.locale('zh-cn');

export default class Main extends React.Component {
  render(){
    return (
      <LocaleProvider locale={zhCN}>
        <div className='markdown-body' key='content'>
          <Switch>
            <Route exact path='/' component={Page}/>
            <Route path='/:page' component={LayoutComponent}/>
          </Switch>
        </div>
      </LocaleProvider>
    )
  }
}