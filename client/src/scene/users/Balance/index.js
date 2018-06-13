import React, { Component } from 'react';


import "./index.less"

export default class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {tab: 1};
  }

  onClickTabByKey(key) {
    this.setState({tab: key})
  }


  renderTextInput(name) {
    return(
      <div className="inputPanel">
        {name}
        <input type="text" name="单价" />
        <input type="submit" value="保存" />
      </div>
    )
  }

  renderSelect(){
    return(
      <select>
        <option value ="volvo3">哈密瓜</option>
        <option value ="saab">榴莲</option>
        <option value="opel">樱桃</option>
        <option value="audi">甘蔗</option>
      </select>
    )
  }

  render() {
    //let tab = this.state.tab;
    //let floatView = `floatView-${tab}`;
    return (
      <div className="balanceRoot">

      </div>
    );
  }
}