import React, { Component } from "react";
import {hot} from "react-hot-loader";

class Four extends Component {
    render() {
        return (
            <div>
                <h2>Four</h2>
                <p>some content</p>
                <ul>
                    <li>four</li>
                    <li>four</li>
                    <li>four</li>
                </ul>
            </div>
        );
    }
}

export default hot(module)(Four);