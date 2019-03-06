import React, { Component } from 'react';
import { isArray } from 'lodash';
//import {Tabs , Popconfirm, Button, Modal, message} from 'antd';
import ImageViewer from './image-viewer';
import "./index.less"

const data = [
    {title:"水强队",talent:"13313 蛇2级", src: require('./image/group1.jpg')},
    {title:"风辅队",talent:" 33133 蛞蝓2级", src: require('./image/group2.jpg')},
    {title:"雷根队",talent:"12233 蛇2级", src: require('./image/group3.jpg')},
];

export default class GroupViewer extends Component {
    constructor(props) {
        super(props);
        this.inputData = [];
        this.state = {
            userInfo: {},
        }
    }
    render() {
        return(
            <div className='group-content'>
                {
                    data.map((val, key) =>
                        <ImageViewer
                            key={key}
                            title={val.title}
                            talent={val.talent}
                            src={val.src}
                        />)
                }
            </div>
        )
    }
}