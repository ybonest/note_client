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
    const { location } = nextProps;
    const { location: preLocation } = this.props;
    if(location && preLocation && location.pathname !== preLocation.pathname){
      this.getData(nextProps);
    }
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  render(){
    // return [
    //   <TreeList data={this.state.tree} key='treelist'/>,
    //   <div key='content' dangerouslySetInnerHTML={{__html: this.state.data}}/>
    // ]
    return (
      <div style={{display:'flex'}}>
        <div style={{flex: 1}} key='content' dangerouslySetInnerHTML={{__html: this.state.data}}/>
        <div style={{width: 200, height: '100vh'}}>
          <TreeList data={this.state.tree} key='treelist'/>
        </div>
      </div>
    );
  }
}

export default ArticleContent;