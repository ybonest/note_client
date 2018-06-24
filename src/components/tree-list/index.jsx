import React from 'react';
import { Anchor } from 'antd';
import './content-tree.scss';
const { Link } = Anchor;

export default class TreeList extends React.Component {
  constructor(){
    super();
  }
  renderLinkItem(item){
    if(!item.child){
      
      return (
        <Link key={item.id} href={`#${item.id}`} title={item.name} />
      )
    } else {
      return (
        <Link key={item.id} href={`#${item.id}`} title={item.name} >
          {
            item.child.map(ele => {
              return this.renderLinkItem(ele);
            })
          }
        </Link>
      )
    }
  }
  render(){
    const { data } = this.props;
    if (!data) {
      return <div />;
    }
    return (
      <div className='content-tree'>
        <Anchor offsetTop='50'>
          {data.map(item => {
            return this.renderLinkItem(item);
          })}
        </Anchor>
      </div>
    )
  }
}