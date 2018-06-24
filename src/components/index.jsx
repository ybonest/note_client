import React from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import LayoutComponent from 'components/layout';

export default class Main extends React.Component {
  constructor(props){
    super();
    this.state = {
      data: ''
    }
  }
  componentDidMount(){
    
  }
  render(){
    return (
      <div>
        <div className='markdown-body' key='content'>
          <LayoutComponent />
        </div>
      </div>
    )
  }
}