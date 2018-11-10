import React, { Component } from "react";
import {hot} from "react-hot-loader";

class SubmitButton extends Component {

    render() {
        return(
            <button className="button" role="button" onMouseDown={this.props.handleSubmit}>
                Tell me where to eat.
            </button>
        )
    }

}

export default hot(module)(SubmitButton);