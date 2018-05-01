import React, { Component } from 'react';
import './App.css';
import'./Login.css';
import Boxers from './Boxers';
import Spars from './Spars';
import Login from './Login';
import NavigationBar from './NavigationBar';
import Brackets from './Brackets';
import Profile from './Profile';
import Signups from './Signups';

class App extends Component {

    constructor() {
        super();
        this.state = {
			"page" : "login",
        };
        this.change_page = this.change_page.bind(this);
        if (sessionStorage.authenticated) {
            if (sessionStorage.page == null || sessionStorage.page === 'undefined') {
                this.state["page"] = "boxers";
                sessionStorage.page = "boxers";
            } else {
                console.log("restoring page:", sessionStorage.page);
                this.state["page"] = sessionStorage.page;
            }
        }
    }

    change_page(page) {
        console.log("changing page:", page);
        this.setState({"page":page});
        sessionStorage.page = page;
    }

	render() {
		if (this.state["page"] === "login") {
			return (<Login changePage={this.change_page}/>);
        } else if (this.state["page"] === "boxers") {
			return (
                <div>
                    <NavigationBar changePage={this.change_page}/>
                    <Boxers changePage={this.change_page}/>
                </div>
            );
		} else if (this.state["page"] === "spars") {
			return (
                <div>
                    <NavigationBar changePage={this.change_page}/>
                    <Spars changePage={this.change_page}/>
                </div>
            );
        } else if (this.state["page"] === "brackets") {
            return (
                <div>
                    <NavigationBar changePage={this.change_page}/>
                    <Brackets changePage={this.change_page}/>
                </div>
            );
        } else if (this.state["page"] === "profile") {
            return (
                <div>
                    <NavigationBar changePage={this.change_page}/>
                    <Profile changePage={this.change_page}/>
                </div>
            );
        } else if (this.state["page"] === "signups") {
            return (
                <div>
                    <NavigationBar changePage={this.change_page}/>
                    <Signups changePage={this.change_page}/>
                </div>
            );
		} else {
            console.log("page", this.state["page"]);
            return (<h2>Sorry, page not found</h2>);
        }

	}

}

export default App;
