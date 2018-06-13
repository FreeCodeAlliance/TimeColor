import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import "./index.less"
//import {fetchRecords} from "../../actions"
class Authenticate extends Component {
    static propTypes = {
        children: PropTypes.element,
    };
    render() {
        return (
          <div className="authenticate-content">
            { this.props.children }
          </div>
        );
    }
}
export default connect()(Authenticate);
