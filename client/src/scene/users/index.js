import React, { Component } from 'react';

import { Menu, Icon } from 'antd';

import {Link } from 'react-router'
import "./index.less"
//require "../../lib/qrcode.min"
//import {Table} from 'antd'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
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

    state = {
        current: 'mail',
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });

        const {router} = this.props;
        router.push("/user/Example2");
    };


    renderUserInfo() {
      return (
          <div className="user-info">
              <p>皇冠国际</p>
              <table border="0">
                  <tbody>
                      <tr>
                          <th>会员账号</th>
                          <th style={{float: "right"}}>dd3i6</th>
                      </tr>
                      <tr>
                          <td>盘类</td>
                          <td>D盘</td>
                      </tr>
                      <tr>
                          <td>可用额度</td>
                          <td>100</td>
                      </tr>
                      <tr>
                          <td>下注期数</td>
                          <td>0613101</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      );
    }

    renderAwardRecods() {
      const data = [1, 2, 3, 8, 5];
      return (
          <div className="award-record">
              <table border="1">
                  <tbody>
                      <tr>
                          <th>时间</th>
                          <th>内容</th>
                          <th>赔率</th>
                          <th>金额</th>
                      </tr>
                      {data.map((v, k)=>{
                          return (
                              <tr key={{k}}>
                                  <td>1</td>
                                  <td>2</td>
                                  <td>3</td>
                                  <p>4</p>
                              </tr>
                          )
                      })}
                  </tbody>
              </table>
          </div>
      );
    }

    renderHeadNavigation() {
      return(
          <Menu
              style={{display: 'flex', justifyContent: 'space-around'}}
              onClick={this.handleClick.bind(this)}
              selectedKeys={[this.state.current]}
              mode="horizontal"
          >
              <SubMenu title={<span><Icon type="setting" />时时彩</span>}>
                  <Menu.Item key="number1">新疆</Menu.Item>
                  <Menu.Item key="number2">重庆</Menu.Item>
              </SubMenu>
              <Menu.Item key="1" style={{marginLeft: 0}}>
                  <Icon type="mail" />主盘势
              </Menu.Item>
              <Menu.Item key="mail">
                  <Icon type="mail" />双面盘口
              </Menu.Item>
              <Menu.Item key="app" >
                  <Icon type="appstore" />总和龙虎
              </Menu.Item>
          </Menu>
      );
    }

    render() {
    let data = {id:666 ,name: "shenl", age:23};
    return (
      <div className="user">
        <div className="user-leftPanel">
            {this.renderUserInfo()}
            {this.renderAwardRecods()}
          <div className="award-results">
            award-results
          </div>
        </div>
        <div className="user-rightPanel">
            {
                this.renderHeadNavigation()
                /*
                   <div className="user-navigation">
                      <Link to="/user/Balance">标签页1</Link>
                      <Link to="/user/Example2">标签页2</Link>
                      <Link to="/user/trainRecords">标签页3</Link>
                      <Link to= {"/user/Example/" + data.id}>标签页4</Link>
                  </div>
                 */
            }
          {this.props.children}
        </div>
      </div>
    )
    }
}
