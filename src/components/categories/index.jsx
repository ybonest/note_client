import React from 'react';
import { List, Icon, Form, Input, Button, Upload, AutoComplete } from 'antd';
import { Link } from 'react-router-dom';
import { categoriesData, uploadFiles } from 'services/index.js';
import UploadNote from 'components/upload-note';
import styles from 'styled-components';
import './index.scss';

const FormItem = Form.Item;
const { TextArea } = Input;

const ListPanel = styles(List)`
  margin-bottom: 150px;
  padding-bottom: 10px;
`;

const ItemPanel = styles(List.Item)`
  height: 220px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e8e8e8!important;
  position: relative;
`
const IconPanel = styles(Icon)`
  font-size: 50px;
`

const VerticalDiv = styles.div`
  height: 150px;
  width: 2px;
  background-color: #e8e8e8;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const HerilzolDiv = styles.div`
  width: 150px;
  height: 2px;
  background-color: #e8e8e8;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const FormItemPanel = styles(FormItem)`
  height: 176px;
  width: 272px;
  margin-left: 58px;
`

const UploadPanel = styles(Upload)`
  height: 176px;
  width: 272px;
`

const FormItemPPanel = styles(FormItem)`
  position: absolute;
  width: 230px;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
`

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

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

@Form.create()
class CateGories extends React.Component {
  constructor() {
    super();
  }
  state = {
    data: [],
    imageUrl: '',
    panelShow: false
  }
  componentDidMount() {
    categoriesData().then((response) => {
      this.setState({
        data: response.data  
      })
    })
  }

  handleClick = () => {
    this.setState({
      panelShow: true
    })
  }

  handleClickHide = () => {
    this.setState({
      panelShow: false
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { imageUrl } = this.state;
        const { img, ...rest } = values;
        console.log('Received values of form: ', values);
        uploadFiles({...rest, imageUrl, imgName: img.file.name }).then(res => {
          console.log(res);
          this.setState({
            panelShow: false,
            data: res.data.content,
            imageUrl: '',
          })
        })
      }
    });
  }

  handleChange = (info) => {
    getBase64(info.file.originFileObj, imageUrl => this.setState({
      imageUrl,
      loading: false,
    }));
  }

  render() {
    const { data } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { panelShow } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return [
      <ListPanel
        itemLayout="vertical"
        key='list'
        dataSource={data}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[<IconText type="star-o" text={item.star} />, <IconText type="like-o" text={item.like} />, <IconText type="message" text={item.message} />]}
            extra={<img className='img-style' alt={item.image.alt} src={item.image.url} />}
          >
            <List.Item.Meta
              title={<Link to={`/categories/${item.link}`}>{item.title}</Link>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      >
      <UploadNote data={data}/>
        {/*
          panelShow ? (
            <ItemPanel>
              <Form onSubmit={this.handleSubmit} className="login-form" style={{display: 'flex',position: 'relative'}} autoComplete='off'>
                <FormItem style={{width: '50%', flex: '1'}}>
                  {getFieldDecorator('name', {
                  })(
                    <Input placeholder="some thing in english like react" />
                  )}
                  {getFieldDecorator('title', {
                  })(
                    <Input placeholder="something like react日常笔记" />
                  )}
                  {getFieldDecorator('content', {
                  })(
                    <TextArea rows={5} placeholder="输入描述" />
                  )}
                </FormItem>
                <FormItemPanel>
                  {getFieldDecorator('img', {
                    rules: [{ required: true, message: '输入标题' }],
                  })(
                    <UploadPanel
                      accept="image/png, image/jpeg, image/gif"
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      customRequest={() => {}} // 覆盖默认的上传行为
                      action="/"
                      beforeUpload={beforeUpload}
                      onChange={this.handleChange}
                    >
                      {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                    </UploadPanel>
                  )}
                </FormItemPanel>
                <FormItemPPanel>
                  <Button style={{width: '100px',marginRight: '20px'}} onClick={this.handleClickHide} className="login-form-button">
                    取消
                  </Button>
                  <Button style={{width: '100px'}} type="primary" htmlType="submit" className="login-form-button">
                    提交
                  </Button>
                </FormItemPPanel>
              </Form>
            </ItemPanel>
          ) : (
            <ItemPanel onClick={this.handleClick}>
              <VerticalDiv />
              <HerilzolDiv />
          </ItemPanel>)*/}
      </ListPanel>
    ]
  }
}

export default CateGories;