import React, { Component } from 'react';
import "./index.less"

import { TreeSelect, Button } from 'antd';
const TreeNode = TreeSelect.TreeNode;

export default class Zhupansi extends Component {
  constructor(props) {
    super(props);
    this.state = {tab: 1, value: 0, gameData: [[], [], [], [], [], undefined] };

  }

  renderTitle() {
      const data = [6,5,5,3,5];
      return (
          <div className="zps-title">
              <div className="zps-title-panel1">
                    <p>時時彩餘額: 100 </p>
                    <p style={{color:'#e62727'}}>今日輸贏</p>
                    <p style={{color:'blue'}}>0.0</p>
              </div>
              <div className="zps-title-panel2">
                  <p>1234期開獎結果:</p>
                  {
                      data.map((v) => {
                          return (
                            <div className="zps-title-panel2-circle">
                                {v}
                            </div>
                          );
                      })
                  }
              </div>
              <div className="zps-title-panel3">
                  <p style={{color:'green'}}>04</p>
                  <p>期</p>
                  <p>距离封盘</p>
                  <p style={{color:'#e6695a'}}>00:06</p>
                  <p>距离开奖</p>
                  <p style={{color:'#e6695a'}}>00:11</p>
              </div>
          </div>
      );
  }

  renderTouzhuPanel() {
      return (
          <div className="touzhuPanel">
              <p>下注金額</p>
              <input type="number" name="points" min="1" max="100" />
              <Button type="primary" style={{width: "60px"}}>确定</Button>
              <Button style={{width: "60px"}}>取消</Button>
          </div>
      )
  }

  onChange = (key, value) => {
    console.log(key, value);
    // let data = this.state.value;
    // data[key] = value
    // this.setState({ value: data });
  };

  renderMultiSelector(key, text) {
    const placeholder = `購買開獎號碼 (${text})`
    return (
      <div className= "userSelector">
        <p>{text}</p>
        <TreeSelect
          showSearch = {false}
          style={{ margin:"0 0"}}
          //value={this.state.value[key]}
          dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
          placeholder = {placeholder}
          allowClear
          multiple
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

  renderSizeSelector(key, text) {
    const placeholder = `購買開獎號碼 (${text})`
    return (
      <div className= "userSelector">
        <p>{text}</p>
        <TreeSelect
          showSearch = {false}
          style={{ flexGrow: "1", margin:"0 0"}}
          //value={this.state.value[key]}
          dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
          placeholder = {placeholder}
          allowClear
          treeDefaultExpandAll
          onChange={this.onChange.bind(this, key)}
        >
          <TreeNode value="0" title="大" key="0" />
          <TreeNode value="1" title="小" key="1" />
        </TreeSelect>
      </div>
    )
  }


  render() {
    //let tab = this.state.tab;
    //let floatView = `floatView-${tab}`
    return (
      <div className="zhupansi-content">
          {this.renderTitle()}
          <h3>下注區</h3>
          {this.renderMultiSelector(1, "萬(賠率：9.98)")}
          {this.renderMultiSelector(2, "千(賠率：9.98)")}
          {this.renderMultiSelector(3, "百(賠率：9.98)")}
          {this.renderMultiSelector(4, "十(賠率：9.98)")}
          {this.renderMultiSelector(5, "個(賠率：9.98)")}
          {this.renderSizeSelector(6, "大小(賠率：1.99)")}
          {this.renderTouzhuPanel()}
      </div>
    );
  }
}
