import React, { Component } from "react";
import {hot} from "react-hot-loader";

class OptionsButton extends Component {

    render() {
        return(
            <button className="button options" role="button" onMouseDown={this.props.handleMouseDown}>
                Give me some options yo.
            </button>
        )
    }

}

export default hot(module)(OptionsButton);