import React, { Component } from "react";
import {hot} from "react-hot-loader";


class Three extends Component {
    render() {
        return (
            <div>
                <h2>Three</h2>
                <p>some content</p>
                <ul>
                    <li>one</li>
                    <li>two</li>
                    <li>three</li>
                </ul>
            </div>
        );
    }
}

export default hot(module)(Three);