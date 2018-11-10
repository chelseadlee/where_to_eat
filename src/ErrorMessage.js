import React, {Component} from "react";
import {hot} from "react-hot-loader";

class ErrorMessage extends Component {
    render() {
        return(
            <div className="error-msg">something: {this.props.errorMessage}
            </div>
        )
    }
}

export default hot(module)(ErrorMessage);