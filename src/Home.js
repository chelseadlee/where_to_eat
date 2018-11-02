import React, { Component } from "react";
import {hot} from "react-hot-loader";

class Home extends Component {
    render() {
        return (
            <div>
                <h2>Hello</h2>
                <p>Some front page content.</p>
                <p>here's another paragraph.</p>
            </div>
        );
    }
}

export default hot(module)(Home);