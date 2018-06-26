import React from 'react';
import { mdRequest, sideBarData, cancel } from 'services/index.js';
import 'github-markdown-css/github-markdown.css';
import 'prismjs/themes/prism-tomorrow.css'
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import TreeList from 'components/tree-list';


class ArticleContent extends React.Component {
  constructor(){
    super()
  }
  static contextTypes = {
    treeData: PropTypes.array
  }

  state = {
    data: null,
    tree: null
  }

  getData(props){
    const { params } = props.match;
    const that = this;
    mdRequest(params).then(function(response){
      that._isMounted && that.setState({
        data: response.data.html,
        tree: response.data.tree
      })
      Prism.highlightAll();
    })
  }
  componentDidMount(){
    this._isMounted = true;  // 解决异步请求结果返回时，组件被卸载warning
    this.getData(this.props);
  }
  componentWillReceiveProps(nextProps){
    this.getData(nextProps);
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  render(){
    return [
      <TreeList data={this.state.tree} key='treelist'/>,
      <div key='content' dangerouslySetInnerHTML={{__html: this.state.data}}/>
    ]
  }
}

export default ArticleContent;