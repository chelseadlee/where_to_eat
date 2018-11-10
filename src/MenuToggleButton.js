import React, {Component} from "react";
import {hot} from "react-hot-loader";

class MenuToggleButton extends Component {
    render() {
        return(
            <button className="toggler" onMouseDown={this.props.handleMouseDown}>
                menu
            </button>
        )
    }
}

export default hot(module)(MenuToggleButton);