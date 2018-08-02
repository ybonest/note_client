import React from 'react';
import { Card, Icon, Modal,Form, Select, Input, Button } from 'antd';
import './index.scss';
import { bloglinkData, addbloglink } from 'services';
const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class BlogLink extends React.Component {
  constructor() {
    super();
  }
  state = {
    data: [],
    visible: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        addbloglink(values).then(response => {
          console.log(response);
          if(response.data && response.data.code === 1){
            this.setState({
              data: response.data.data
            }, () => {
              this.hideModal();
            })
          }
        })
      } else {
        console.log(err);
      }
    });
  }

  componentDidMount() {
    bloglinkData().then((response) => {
      this.setState({
        data: response.data
      })
    })
  }

  renderTd() {
    const { data } = this.state;
    let trArr = [];
    data.forEach((item, index) => {
      const td = (
        <td style={{position: 'relative'}} key={item.name}>
          <p>
            <a href={item.href} target="_blank">{item.name}</a>
          </p>
        </td>
      );
      if (index % 4 === 0) {
        trArr.push([td]);
      } else {
        trArr[trArr.length-1].push(td)
      }
    })
    return trArr;
  }

  handlePlus = () => {
    this.setState({
      visible: true,
    });
  }

  hideModal = () => {
    this.setState({
      visible: false,
    }, () => {
      this.props.form.resetFields();
    });
  }

  render() {
    const trArr = this.renderTd();
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='bloglink'>
        <Card bordered title="网站链接" extra={<Icon onClick={this.handlePlus} type="plus" />}>
          <Modal
            className='bloglinkmodal'
            title="添加网站链接"
            bodyStyle={{width: '450px'}}
            visible={this.state.visible}
            onOk={this.handleSubmit}
            onCancel={this.hideModal}
            okText="确认"
            cancelText="取消"
          >
            <Form onSubmit={this.handleSubmit} hideRequiredMark>
              <FormItem
                label="网站名称"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 18 }}
              >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '网站名称不能为空!' }],
                })(
                  <Input autoComplete="off" placeholder="请输入网站名称"/>
                )}
              </FormItem>
              <FormItem
                label="网站链接"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 18 }}
              >
                {getFieldDecorator('href', {
                  rules: [{ required: true, message: '网站链接不能为空！' }],
                })(
                  <Input autoComplete="off" placeholder="请输入网站链接"/>
                )}
              </FormItem>
            </Form>
          </Modal>
          <table className='table'>
            <tbody>
              {trArr && trArr.map((item, index) => {
                  return (<tr key={index}>{item}</tr>)
                })}
            </tbody>
          </table>
        </Card>
      </div>
    );
  }
}