import React from 'react';
import { Carousel } from 'antd';
import { reptileData } from 'services';
import ContentList from 'components/contentList'
import './index.scss';

export default class Home extends React.Component {
  constructor(props){
    super();
  }

  state = {
    data: []
  }

  componentDidMount() {
    reptileData().then((res) => {
      console.log(res.data);
      this.setState({
        data: res.data
      })
    })
  }
  render() {
    const { data } = this.state;
    return (
      <div className='home-page'>
        <Carousel autoplay>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </Carousel>
        <ContentList data={data}/>
      </div>
    );
  }
}