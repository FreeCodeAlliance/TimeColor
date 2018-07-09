import React, { Component } from 'react';
import "./index.less"
import { TreeSelect, Button, message } from 'antd';
import {fetchLotteryStatus, fetchLotterResult} from  '../../../actions/lottery'
import {modifyResult} from  '../../../actions/master'
import {format} from  '../../../component/utils'
import {connect} from "react-redux";
const TreeNode = TreeSelect.TreeNode;

const LotteryState = ["服務器異常", "下注階段", "封盤階段", "停滯開獎"]

class MasterSetting extends Component {
  state = {
      value: [undefined, undefined, undefined, undefined, undefined],
      leftTime: "-- --"
  };
  constructor(props) {
      super(props);
      this.loopHanle = undefined;
      this.leftTimeValue = -1
  }


  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchLotteryStatus()).then((res)=>{
      if (res.response && !res.response.errorCode) {
        const data = res.response.data;
        if (data.time > 0) {
          this.leftTimeValue = data.time;
          this.setState({leftTime: this.formatLeftTime(data.time)})
        }
      }
    });
    this.syncOpenNumber()

    this.loopHanle = setInterval(()=>{
      if (this.leftTimeValue > 0) {
        this.leftTimeValue--;
        this.formatLeftTime(this.leftTimeValue)
        this.setState({leftTime: this.formatLeftTime(this.leftTimeValue)})
      }
    }, 1000)
  }

  componentWillUnmount() {
    if (this.loopHanle) {
      clearInterval(this.loopHanle)
    }
  }

  formatLeftTime(time) {
    const m = Math.floor(time/60);
    const s = format("%02d", time % 60);
    let formatTime = `${m}:${s}`;
    return formatTime
  }

  syncOpenNumber() {
    let result = "隨機";
    const { dispatch } = this.props;
    dispatch(fetchLotterResult())
    return result
  }

  onChange = (key, value) => {
    console.log(key, value);
    let data = this.state.value;
    data[key] = value
    this.setState({ value: data });
  };

  handleSetting() {
    for(let k in this.state.value) {
      if (this.state.value[k] === undefined) {
        message.warn("信息不完整")
        return
      }
    }
    const {dispatch} = this.props;
    dispatch(modifyResult(this.state.value)).then((res)=>{
      if (res.response) {
        if (res.response.error) {
          message.error(res.response.error)
        }
        this.syncOpenNumber();
      }
    })
  }


  renderLineSelector(key, text) {
       const placeholder = `設置開獎號碼 (${text})`
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
      const {lotteryResult, status} = this.props;
      console.log(status,LotteryState[status.state]);
        //let floatView = `floatView-${tab}`;
        return (
            <div className="masterSetting">
              <h4>
                當前處於{LotteryState[status.state]}  <br/>
                下次開獎結果: {lotteryResult.toString()}
                <p>剩餘開獎時間: {this.state.leftTime}</p>
              </h4>
              {this.renderLineSelector(0, "万")}
              {this.renderLineSelector(1, "千")}
              {this.renderLineSelector(2, "百")}
              {this.renderLineSelector(3, "十")}
              {this.renderLineSelector(4, "个")}
              <div className="buttonPanel">
                <Button type="danger" size="large" onClick={this.handleSetting.bind(this)}>改變開獎號碼</Button>
              </div>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
  const { master, lottery} = state;
  return {
    status : lottery.status,
    lotteryResult: lottery.lotteryResult,
    loading : master.loading
  };
})(MasterSetting);