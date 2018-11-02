import React, { Component } from "react";
import {hot} from "react-hot-loader";

class One extends Component {
    render() {
        return (
            <div>
                <h2>One</h2>
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

export default hot(module)(One);