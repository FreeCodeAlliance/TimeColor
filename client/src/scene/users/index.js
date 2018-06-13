import React, { Component } from 'react';

import {Link } from 'react-router'
import "./index.less"
//require "../../lib/qrcode.min"
var QRCode = require('qrcode.react');

export class Example2 extends Component {

  render() {
    return (
      <QRCode value="http://www.baidu.com" size={256}/>
    );
  }
}


export class Example extends Component {
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {imageSrc: require("../../icon/home.png")};

  }

  componentDidMount() {
    if(this.fileInput){
      //很神奇，必须有这行代码，才能调用图片选择，我也很无奈啊。
     // console.log(this.fileInput); //触发 input传文件事件
      this.fileInput.click()
    }
  }

  fileSelected(data) {
    var file = data.target.files[0];
    let filePath = data.target.value;

    console.log(filePath);

    if (file) {
      var fileSize = 0;
      if (file.size > 1024 * 1024)
        fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
      else
        fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
      document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
      document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
      document.getElementById('fileType').innerHTML = 'Type: ' + file.type;


      var windowURL = window.URL || window.webkitURL;
      var dataURL = windowURL.createObjectURL(file);

      let img = document.getElementById('upLoadImage');
      console.log(dataURL);
      img.setAttribute("src", dataURL);
      this.forceUpdate();
      //this.setState({imageSrc: require(data.target.value)})
    }
  }

  render() {
    //test
    return (
      <div>
        <p>上传图片</p>
        <img id="upLoadImage" src={require("../../icon/home.png")} width={50} height={50}/>
        <input
          ref={(input)=>{this.fileInput = input}}
          className="upLoadInput" type="file" multiple accept='image/*' id="fileToUpload"
          onChange={this.fileSelected.bind(this)}
        />
        <p id="fileName">fileName</p>
        <p id="fileSize">fileSize</p>
        <p id="fileType">fileType</p>
      </div>
    );
  }
}

export default class UserList extends React.Component {
  render() {
    let data = {id:666 ,name: "shenl", age:23};
    return (
      <div className="user">
        <div className="user-leftPanel">
          <div className="user-info">
            useInfo
          </div>
            <div className="award-record">
                award-record
            </div>
          <div className="award-results">
              award-results
          </div>
        </div>
        <div className="user-rightPanel">
          <div className="user-navigation">
              <Link to="/user/Balance">标签页1</Link>
              <Link to="/user/Example2">标签页2</Link>
              <Link to="/user/trainRecords">标签页3</Link>
              <Link to= {"/user/Example/" + data.id}>标签页4</Link>
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
