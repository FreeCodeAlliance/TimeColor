import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isArray } from 'lodash';
import { TreeSelect, Mention } from 'antd';
import "./index.less"

const { toString, toContentState } = Mention;


const users = ['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai'];

const TreeNode = TreeSelect.TreeNode;

export default class SearchMention extends PureComponent {
    static propTypes = {
        data: PropTypes.array,
        onSelected: PropTypes.func,
    };

    static defaultProps ={
        data: []
      };

    constructor(props) {
        super(props);
    }
    state = {
        value: "",
        loading: false,
    }

    onChange = (value, key) => {
        const { onSelected } = this.props;
        if (onSelected) { onSelected(value) };
    }

    render() {
        const { data } = this.props;
        return (
            <div className="search-content">
                <p className="search-content-title">搜索</p>
                <TreeSelect
                    showSearch
                    style={{ width: 300 }}
                    value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={this.onChange}
                >
                    {
                        data.map( (info, key) => <TreeNode value={`${info.name}`} title={info.name} key={key}/>)
                    }
                </TreeSelect>
            </div>
        );

    }
}

