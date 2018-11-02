import React, { Component } from "react";
import {hot} from "react-hot-loader";


class Two extends Component {
    render() {
        return (
            <div>
                <h2>Two</h2>
                <p>some content</p>
                <p>two two two two two</p>
            </div>
        );
    }
}

export default hot(module)(Two);