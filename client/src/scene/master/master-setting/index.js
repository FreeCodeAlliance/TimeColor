import React, { Component } from 'react';
import "./index.less"
import { TreeSelect, Button } from 'antd';
import {fetchLotteryStatus} from  '../../../actions/lottery'

import {connect} from "react-redux";
const TreeNode = TreeSelect.TreeNode;


class MasterSetting extends Component {
    state = {
        value: [undefined, undefined, undefined, undefined, undefined],
    }
    constructor(props) {
        super(props);
    }


  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchLotteryStatus())
  }

    onChange = (key, value) => {
      console.log(key, value);
      let data = this.state.value;
      data[key] = value
      this.setState({ value: data });
    };



  handleSetting() {
    console.log("fetch setting");
  }

    renderLineSelector(key, text) {
       const placeholder = `设置开奖号码 (${text})`
       return (
         <div className= "lineSelector">
             <p>{text}</p>
           <TreeSelect
             showSearch = {false}
             style={{ flexGrow: "1", alignSelf:"center", margin:"0 5px"}}
             value={this.state.value[key]}
             dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
             placeholder = {placeholder}
             allowClear
             treeDefaultExpandAll
             onChange={this.onChange.bind(this, key)}
           >
             <TreeNode value="0" title="0" key="0" />
             <TreeNode value="1" title="1" key="1" />
             <TreeNode value="2" title="2" key="2" />
             <TreeNode value="3" title="3" key="3" />
             <TreeNode value="4" title="4" key="4" />
             <TreeNode value="5" title="5" key="5" />
             <TreeNode value="6" title="6" key="6" />
             <TreeNode value="7" title="7" key="7" />
             <TreeNode value="8" title="8" key="8" />
             <TreeNode value="9" title="9" key="9" />
           </TreeSelect>
         </div>
       )
    }
    render() {
        //let tab = this.state.tab;
        //let floatView = `floatView-${tab}`;
        return (
            <div className="masterSetting">
              <h4>
                下次开奖设置: 9 7 5 6 0
                <p>剩余开奖时间: 00:06</p>
              </h4>
              {this.renderLineSelector(0, "万")}
              {this.renderLineSelector(1, "千")}
              {this.renderLineSelector(2, "百")}
              {this.renderLineSelector(3, "十")}
              {this.renderLineSelector(4, "个")}
              <div className="buttonPanel">
                <Button type="danger" size="large" onClick={this.handleSetting.bind(this)}>确定开奖</Button>
              </div>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
  const { master, lottery} = state;
  return {
    status : lottery.status,
    loading : master.loading
  };
})(MasterSetting);