import React, { Component } from 'react';
import { isArray } from 'lodash';
import PropTypes from 'prop-types';
//import {Tabs , Popconfirm, Button, Modal, message} from 'antd';
import "./index.less"

export default class ImageViewer extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        title: PropTypes.string,
        talent: PropTypes.string,
        src: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.inputData = [];
        this.state = {
            userInfo: {},
        }
    }

    componentWillMount() {
        // const { dispatch } = this.props;
        // dispatch(getGiftUserList());
        // dispatch(getUserGifts());
    }

    render() {
        const { title, talent, src} = this.props;
        return(
            <div className='image-viewer-content'>
                <span className="image-title">{title}</span>
                <span className="image-talent">{`天赋: ${talent}`}</span>
                <img
                    width="100%"
                    src={src}
                />
            </div>
        )
    }
}