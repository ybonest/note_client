import React from 'react';
import { List } from 'antd';

export default class SubList extends React.Component {
  constructor(){
    super()
  }
  render(){
    const { data, arg } = this.props;
    return (
      <div>
      <List
        header={<div>{data.name}</div>}
        bordered
        dataSource={data}
        renderItem={item => (<List.Item><Link to={`/${arg}/${item.arg}/${itemChild.arg}`}>{itemChild.name}</Link></List.Item>)}
      />
      </div>
    )
  }
}