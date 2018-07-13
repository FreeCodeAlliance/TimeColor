import React, { Component } from 'react';
import "./index.less"

import { TreeSelect, Button, Popconfirm, message } from 'antd';
import {connect} from "react-redux";
import {fetchLotteryStatus, bet} from "../../../actions/lottery";
import {format} from "../../../component/utils";
const TreeNode = TreeSelect.TreeNode;

class Zhupansi extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tab: 1,
        value: 0,
        lotteryLeftTime: "-- --",
        fpLeftTime: "-- --",
        currLotteryNumber: "0000"
    };
    this.leftTimeValue = -1;
    this.numberBets = {};
    this.inputData =0;
    this.sizeBets = undefined
    //this.betsDate = {"0":{},"1":{},"2":{},"3":{},"4":{},"5":0,"6":0,"7":0,"8":0};
  }

  componentWillMount() {
    this.refreshLotteryStatus();

    this.loopHanle = setInterval(()=>{
      if (this.leftTimeValue > 0) {
          this.leftTimeValue--;
          this.formatLeftTime(this.leftTimeValue)
          this.setState({lotteryLeftTime: this.formatLeftTime(this.leftTimeValue),
            fpLeftTime: this.formatpyLeftTime( this.leftTimeValue)})
      } else {
        this.refreshLotteryStatus();
      }
    }, 1000)
  }

  componentWillUnmount() {
    if (this.loopHanle) {
      clearInterval(this.loopHanle)
    }
  }

  refreshLotteryStatus(){
    const { dispatch } = this.props;
    dispatch(fetchLotteryStatus()).then((res)=>{
      if (res.response && !res.response.errorCode) {
        const data = res.response.data;
        if (data.time > 0) {
          this.leftTimeValue = data.time;
          this.setState({lotteryLeftTime: this.formatLeftTime(data.time), currLotteryNumber: data.no})
        }
      }
    });
  }

  formatLeftTime(time) {
    const m = Math.floor(time/60);
    const s = format("%02d", time % 60);
    let formatTime = `${m}:${s}`;
    return formatTime
  }
  formatpyLeftTime(time) {
    if (time > 120) {
        const m = Math.floor((time - 120)/60);
        const s = format("%02d", time % 60);
        let formatTime = `${m}:${s}`;
        return formatTime
    } else {
      return "已封盤"
    }
  }

  renderTitle() {
      //const data = [6,5,5,3,5];
      const {userInfo} = this.props;
      return (
          <div className="zps-title">
              <div className="zps-title-panel1">
                    <p>時時彩餘額: {userInfo.quota} </p>
                    <p style={{color:'#e62727'}}>今日輸贏</p>
                    <p style={{color:'blue'}}>{userInfo.value}</p>
              </div>
              {
                /*
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
                 */
              }
              <div className="zps-title-panel3">
                  <p style={{color:'green'}}>{this.state.currLotteryNumber}</p>
                  <p>期 </p>
                  <p>距离封盘</p>
                  <p style={{color:'#e6695a'}}>{this.state.fpLeftTime}</p>
                  <p>距离开奖</p>
                  <p style={{color:'#e6695a'}}>{this.state.lotteryLeftTime}</p>
              </div>
          </div>
      );
  }
  handleChange(evt){
    this.inputData = evt.target.value
  }

  handleBet() {
    if (this.inputData <= 0) {
      message.info("請輸入金額")
      return
    }
    if (this.getBetCounts() <= 0) {
      message.info("請選擇需要購買的號碼")
      return
    }
    let data = {}
    for (let key in this.numberBets) {
      const infoArrays = this.numberBets[key];
      let info = {}
      infoArrays.map((v) => {
        info[v] = this.inputData;
      });
      Object.assign(data, {
        [key]: info
      });
    }
    if (this.sizeBets !== undefined) {
      Object.assign(data, {[this.sizeBets]: this.inputData})
    }
    this.props.dispatch(bet(data)).then((res)=>{
      if (res.response.errorCode) {
        message.warn(res.response.errorCode)
      } else {
        message.success("購買成功！")
      }
    });
  }

  getBetCounts() {
    var count = 0;
    for(let k in this.numberBets) {
      let array = this.numberBets[k];
      count = count + array.length;
    }
    if (this.sizeBets !== undefined) {
      count++;
    }
    return count;
  }

  renderBetPanel() {
      const numbers = this.getBetCounts();
      let title = `是否要花費${numbers * this.inputData} 購買這${numbers}個數嗎？`;
      return (
          <div className="touzhuPanel">
              <p>單個數字下注金額</p>
              <input type="number" name="points" min="1" max="100" onChange={this.handleChange.bind(this)}/>
              <Popconfirm title={title} onConfirm={() => this.handleBet()}>
                <Button type="primary" style={{width: "60px"}} onClick={()=>{this.forceUpdate()}}>确定</Button>
              </Popconfirm>
          </div>
      )
  }

  handleNumberSelector = (key, value) => {
    this.numberBets[key]=value;
  }

  handleBigAndSmallSelector= (key, value) => {
    this.sizeBets = value;
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
          onChange={this.handleNumberSelector.bind(this, key)}
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
          onChange={this.handleBigAndSmallSelector.bind(this, key)}
        >
          <TreeNode value="big" title="大" key="big" />
          <TreeNode value="small" title="小" key="small" />
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
          {this.renderMultiSelector("tth", "萬(賠率：9.98)")}
          {this.renderMultiSelector("tho", "千(賠率：9.98)")}
          {this.renderMultiSelector("hun", "百(賠率：9.98)")}
          {this.renderMultiSelector("ten", "十(賠率：9.98)")}
          {this.renderMultiSelector("ind", "個(賠率：9.98)")}
          {this.renderSizeSelector("size", "大小(賠率：1.99)")}
          {this.renderBetPanel()}
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  const { user} = state;
  return {
    userInfo: user.userInfo
  };
})(Zhupansi);
