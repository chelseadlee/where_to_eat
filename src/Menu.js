import React, {Component} from "react";
import {hot} from "react-hot-loader";
import "./Menu.scss";
import SubmitButton from "./SubmitButton";


class Menu extends Component {
    render() {
        const renderCategories = this.props.availableCategories.map((cat)=> {
            return (
                <option value={cat['categories']['id']} key={cat['categories']['id']}>
                    {cat['categories']['name']}
                </option>
            );
        });

        const renderEstablishments = this.props.establishmentTypes.map((est) => {
            return(
                <option value={est['establishment']['id']} key={est['establishment']['id']}>
                    {est['establishment']['name']}
                </option>
            );
        });

        let visibility = "flyout-menu hide";

        if (this.props.menuVisibility) {
            visibility = 'flyout-menu show';
        }

        return(
            <div id="flyoutMenu" className={visibility}>
                <button className="close-button" onMouseDown={this.props.handleMouseDown}>&times;</button>
                <span>Filter that.</span>
                <p>categories:</p>
                <select value={this.props.category} onChange={this.props.handleCatChange}>
                    <option value={''}>All</option>
                    {renderCategories}
                </select>

                <br />
                <p>establishments:</p>
                <select value={this.props.establishmentType} onChange={this.props.handleEstablishmentChange}>
                    <option value={''}>All</option>
                    {renderEstablishments}
                </select>
                <ul>
                    <li>add 'all' option to selects</li>
                    <li>filter by rating</li>
                    <li>filter by price</li>
                    <li>change radius</li>
                    <li>change location</li>
                </ul>
                <br />
                <SubmitButton handleSubmit={this.props.handleSubmit}/>
            </div>
        )
    }
}

export default hot(module)(Menu);