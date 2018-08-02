import React from 'react';
import { Modal, Button, Form, Select, InputNumber, Switch, Radio,
  Slider, Upload, Icon, Rate, Input } from 'antd';
import { uploadNotes } from 'services/index.js';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@Form.create()
export default class UploadNote extends React.Component {
  constructor(){
    super();
  }
  
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      console.log(values);
      
    });
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.props;
    console.log(data);
    
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>上传笔记</Button>
        <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="上传"
            cancelText="取消"
          >
          <Form>
            <FormItem
              {...formItemLayout}
              label="笔记名称"
            >
              {getFieldDecorator('username', {
                rules: [{
                  required: true,
                  message: 'Please input your name',
                }],
              })(
                <Input placeholder="Please input your name" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="笔记分类"
              hasFeedback
            >
              {getFieldDecorator('select', {
                rules: [
                  { required: true, message: 'Please select your country!' },
                ],
              })(
                <Select placeholder="Please select a country">
                  {data.map(item => <Option key={item.id} value={item.id}>{item.title}</Option>)}
                  <Option value="create">新建笔记类别</Option>
                </Select>
              )}
            </FormItem>
    
            <FormItem
              {...formItemLayout}
              label="Dragger"
            >
              <div className="dropbox">
                {getFieldDecorator('dragger', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload.Dragger name="files"
                    showUploadList={false}
                    customRequest={() => {}} // 覆盖默认的上传行为
                    action="/"
                  >
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                  </Upload.Dragger>
                )}
              </div>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}