import React, {Component} from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./Home";
import One from "./One";
import Two from "./Two";
import Three from "./Three";
import Four from "./Four";

import {hot} from "react-hot-loader";
import "./Main.css";

class Main extends Component{

    render() {
        return (
            <HashRouter>
                <div className="Main">
                    <div className="wrapper">
                        <header className="header">
                            <NavLink to="/">Home</NavLink>
                            <div className="header-content">Welcome to the Site!</div>
                        </header>
                        <nav className="navigation">
                            <NavLink to="/one">
                                <div id="one" className="nav-box -one"><div className="nav-box-title">One</div></div>
                            </NavLink>
                            <NavLink to="/two">
                                <div id="two" className="nav-box -two"><div className="nav-box-title">Two</div></div>
                            </NavLink>
                            <NavLink to="/three">
                                <div id="three" className="nav-box -three"><div className="nav-box-title">Three</div></div>
                            </NavLink>
                            <NavLink to="/four">
                                <div id="four" className="nav-box -four"><div className="nav-box-title">Four</div></div>
                            </NavLink>
                        </nav>
                        <div id="main" className="main-content">
                            <Route exact path="/" component={Home}/>
                            <Route path="/one" component={One}/>
                            <Route path="/two" component={Two}/>
                            <Route path="/three" component={Three}/>
                            <Route path="/four" component={Four}/>
                        </div>
                    </div>
                </div>
            </HashRouter>

    );
    }
}

export default hot(module)(Main);