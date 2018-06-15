import React, { Component } from 'react';
import "./index.less"

export default class Zonghelonghu extends Component {
    constructor(props) {
        super(props);
        this.state = {tab: 1};
    }

    render() {
        //let tab = this.state.tab;
        //let floatView = `floatView-${tab}`;
        return (
            <div className="balanceRoot">
                Zonghelonghu
            </div>
        );
    }
}