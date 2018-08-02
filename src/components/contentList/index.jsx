import React from 'react';
import { List } from 'antd';

export default class ContentList extends React.Component {
  constructor() {
    super()
  }
  render() {
    const { data } = this.props;
    return (
      <List
        itemLayout="vertical"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={data}
        renderItem={item => (
          <List.Item
            key={item.title.text}
            // actions={[<IconText type="star-o" text={item.star} />, <IconText type="like-o" text={item.like} />, <IconText type="message" text={item.message} />]}
            extra={<img className='img-style' src={item.img}/>}
          >
            <List.Item.Meta
              title={<a href={item.title.href} target="_blank">{item.title.text}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    )
  }
}