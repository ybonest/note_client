import React from 'react';
import { Calendar } from 'antd';
import './index.scss';

export default class PageRight extends React.Component {
  constructor(){
    super()
  }
  onPanelChange = (value, mode) => {
    console.log(value, mode);
  }
  render() {
    return (
      <div className='page-right'>
        <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
          <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
        </div>
      </div>
    )
  }
}