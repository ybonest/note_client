import React from 'react';
import { List, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { categoriesData } from 'services/index.js';
import './index.scss';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default class CateGories extends React.Component {
  constructor() {
    super();
  }
  state = {
    data: [],
  }
  componentDidMount() {
    categoriesData().then((response) => {
      console.log(response);
      this.setState({
        data: response.data  
      })
    })
  }
  render() {
    const { data } = this.state
    return (
      <List
        itemLayout="vertical"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={data}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[<IconText type="star-o" text={item.star} />, <IconText type="like-o" text={item.like} />, <IconText type="message" text={item.message} />]}
            extra={<img className='img-style' width={272} alt={item.image.alt} src={item.image.url} />}
          >
            <List.Item.Meta
              title={<Link to={`/categories/${item.link}`}>{item.title}</Link>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    )
  }
}