import React, { Component } from 'react';
import './App.css';
import './Navigationbar.css';

class NavigationBar extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

	render() {
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

}

export default App;
