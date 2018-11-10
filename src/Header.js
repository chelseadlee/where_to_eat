import React, {Component} from "react";
import {hot} from "react-hot-loader";
import "./Header.scss";
import MenuToggleButton from "./MenuToggleButton";

class Header extends Component {
    render() {
        return(
            <header className="app-header">
                <div className="main-heading">logo</div>
                <MenuToggleButton handleMouseDown={this.props.handleMouseDown}/>
            </header>
        )
    }
}

export default hot(module)(Header);