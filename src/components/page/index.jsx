import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class Page extends React.Component {
  constructor() {
    super();
  }
 
  render() {
    const height = document.body.clientHeight;
    return (
      <div className="page" style={{ height }}><Link className='animate' to='/home'>进入主页</Link></div>
    )
  }
}