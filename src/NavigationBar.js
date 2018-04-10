import React, { Component } from 'react';
import './App.css';

class NavigationBar extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    boxer_options() {
        return (
            <ul>
                <li>My Profile</li>
                <li>Spar Signups</li>
            </ul>
        );
    }

    captain_options() {
        return (
            <ul>
              <li>My Profile</li>
              <li>Spar Signups</li>
              <li>Boxer Data</li>
              <li>Spar Data</li>
              <li>Brackets</li>
            </ul>
        );
    }

    coach_options() {
        return (
            <ul>
              <li>Boxer Data</li>
              <li>Spar Data</li>
              <li onClick(() => this.props.changePage("brackets"))>Brackets</li>
              <li>Spar Schedule</li>
            </ul>
        );
    }

	render() {
        if (sessionStorage.usertype) {
            if (sessionStorage.usertype === "coach") {
                return this.coach_options();
            } else if (sessionStorage.usertype === "captain") {
                return this.captain_options();
            } else if (sessionStorage.usertype === "boxer") {
                return this.boxer_options();
            } else {
                return (<p>User type error</p>);
            }
        } else {
            return (<p>Session storage error</p>);
        }
	}

}

export default NavigationBar;
