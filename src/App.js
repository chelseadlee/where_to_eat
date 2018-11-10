import React, {Component} from "react";
import Axios from "axios";

import axiosInstance from "./actions";

import Header from "./Header";
import SubmitButton from "./SubmitButton";
import OptionsButton from "./OptionsButton";
import Menu from "./Menu";
import ErrorMessage from "./ErrorMessage";

import {hot} from "react-hot-loader";
import "./App.scss";

class App extends Component {

    constructor(props, state) {
        super(props);

        this.state = {
            // location: {
            //     loading: true,
            //     receivedData: false,
            //     latitude: '',
            //     longitude: '',
            //     locationEntity: '',
            //     locationId: ''
            // },
            // establishments: {
            //     loading: true,
            //     receivedData: false,
            //     establishmentTypes: []
            // },
            // userPreferences: {
            //     radius: 0.5,
            //     categoryId: 10,
            //     establishmentId: 16,
            //     rating: 3
            // },
            // rSearchQuery: {
            //     loading: false,
            //     received: false
            // },
            menuVisible: false,
            loading: true,
            hasLocation: false,
            userCoords: {
                latitude: '',
                longitude: ''
            },
            locationDetails: {
                entityType: '',
                title: '',
                entityId: ''
            },
            restaurants: [],
            randomRestaurant: {},
            errorMessage: '',
            radius: 0.1,
            categoryId: 10,
            establishmentType: 16,
            randomNumber: 0,
            establishmentTypes: [] //location-specific. get from api
        };


        this.availableCategories = [
            {
                "categories": {
                    "id": 1,
                    "name": "Delivery"
                }
            },
            {
                "categories": {
                    "id": 2,
                    "name": "Dine-out"
                }
            },
            {
                "categories": {
                    "id": 3,
                    "name": "Nightlife"
                }
            },
            {
                "categories": {
                    "id": 4,
                    "name": "Catching-up"
                }
            },
            {
                "categories": {
                    "id": 5,
                    "name": "Takeaway"
                }
            },
            {
                "categories": {
                    "id": 6,
                    "name": "Cafes"
                }
            },
            {
                "categories": {
                    "id": 7,
                    "name": "Daily Menus"
                }
            },
            {
                "categories": {
                    "id": 8,
                    "name": "Breakfast"
                }
            },
            {
                "categories": {
                    "id": 9,
                    "name": "Lunch"
                }
            },
            {
                "categories": {
                    "id": 10,
                    "name": "Dinner"
                }
            },
            {
                "categories": {
                    "id": 11,
                    "name": "Pubs & Bars"
                }
            },
            {
                "categories": {
                    "id": 13,
                    "name": "Pocket Friendly Delivery"
                }
            },
            {
                "categories": {
                    "id": 14,
                    "name": "Clubs & Lounges"
                }
            }
        ];


        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.updateUserCoordinates = this.updateUserCoordinates.bind(this);
        this.setLocationDetails = this.setLocationDetails.bind(this);
        this.getLocationDetails = this.getLocationDetails.bind(this);
        this.handleCatChange = this.handleCatChange.bind(this);
        this.handleEstablishmentChange = this.handleEstablishmentChange.bind(this);

        this.getEstablishmentTypes = this.getEstablishmentTypes.bind(this);

        this.getRestaurant = this.getRestaurant.bind(this);
        this.milesToMeters = this.milesToMeters.bind(this);
        this.getRandRestaurant = this.getRandRestaurant.bind(this);
        this.setRandomNumber = this.setRandomNumber.bind(this);
    }

    milesToMeters(mi) {
        return mi *  1609.344;
    }

    toggleMenu() {
        this.setState({
            menuVisible: !this.state.menuVisible
        });
    }

    updateUserCoordinates(lat, long) {
        this.setState({
            userCoords: {
                latitude: lat,
                longitude: long
            }
        });
    }

    handleCatChange(e) {
        this.setState({
            categoryId: e.target.value
        });
        console.log(this.state.categoryId);
    }

    handleEstablishmentChange(e) {
        this.setState({
            establishmentType: e.target.value
        });
        console.log(this.state.establishmentType);
    }

    handleMouseDown(e) {
        this.toggleMenu();

        console.log('clicked');
        e.stopPropagation();
    }

    componentWillMount() {
        function geoErr() {
            console.log('error occurred');
        }
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.updateUserCoordinates(position.coords.latitude, position.coords.longitude);
                console.log(this.state.userCoords);
                this.getLocationDetails();
            }, geoErr, { enableHighAccuracy: true });
        } else {
            this.setState({
                errorMessage: 'Please allow geolocation!'
            });
        }
    }

    getEstablishmentTypes() {
        axiosInstance.get('/establishments', {
            params: {
                lat: this.state.userCoords.latitude,
                lon: this.state.userCoords.longitude
            }
        }).then((response) => {
            this.setState({
                establishmentTypes: response.data['establishments']
            });
            console.log(this.state.establishmentTypes);
        });
    }

    setLocationDetails(data) {
        this.setState({
            locationDetails: {
                entityType: data['location']['entity_type'],
                title: data['location']['title'],
                entityId: data['location']['entity_id']
            }
        });
        console.log(this.state.locationDetails);
    }

    getLocationDetails() {
        axiosInstance.get('/geocode?', {
            params: {
                lat: this.state.userCoords.latitude,
                lon: this.state.userCoords.longitude,
            }
        }).then((response) => {
            this.setLocationDetails(response.data);
            this.getEstablishmentTypes();
        });
    }

    getRestaurant() {
        axiosInstance.get('/search?', {
            params: {
                entity_type: this.state.locationDetails.entityType,
                entity_id: this.state.locationDetails.entityId,
                category: this.state.categoryId,
                radius: this.milesToMeters(this.state.radius),
            }
        }).then((response) => {
            console.log(response);
            let totalRestaurants = response.data['results_found'];
            this.setRandomNumber(totalRestaurants);
        }).finally(() => {
            this.getRandRestaurant();
        });
    }

    setRandomNumber(total) {
        let rand = (total < 100) ? Math.floor(Math.random() * total) : Math.floor(Math.random() * 100);
        this.setState({
            randomNumber: rand
        });
        console.log(this.state.randomNumber);
    }

    getRandRestaurant() {
        axiosInstance.get('/search?', {
            params: {
                entity_type: this.state.locationDetails.entityType,
                entity_id: this.state.locationDetails.entityId,
                category: this.state.categoryId,
                radius: this.milesToMeters(this.state.radius),
                start: this.state.randomNumber,
                count: 1
            }
        }).then((response) => {

            console.log(response.data['restaurants'][0]['restaurant']);
            this.setState({
                randomRestaurant: response.data['restaurants'][0]['restaurant']
            })

        });
    }

    render() {
        return (
            <div className="App">
                <div className="wrapper">
                    <Header handleMouseDown={this.handleMouseDown}
                            menuVisibility={this.state.menuVisible} />

                    <Menu handleMouseDown={this.handleMouseDown}
                          menuVisibility={this.state.menuVisible}
                          availableCategories={this.availableCategories}
                          handleCatChange={this.handleCatChange}
                          category={this.state.categoryId}
                          handleSubmit={this.getRestaurant}
                          establishmentTypes={this.state.establishmentTypes}
                          establishmentType={this.state.establishmentType}
                          handleEstablishmentChange={this.handleEstablishmentChange}/>

                    <div id="main" className="main-content">
                        <div className="result">
                            {this.state.randomRestaurant['name']}
                        </div>
                        <br />
                        <div className="buttons">
                            <SubmitButton handleSubmit={this.getRestaurant}/>
                            <OptionsButton handleMouseDown={this.handleMouseDown}/>
                        </div>
                        {this.state.errorMessage && <ErrorMessage message={this.state.errorMessage}/>}
                    </div>
                    <footer className="footer">
                        <div className="footer-content">I'm a footer!</div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default hot(module)(App);