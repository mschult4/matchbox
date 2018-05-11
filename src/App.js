import React, { Component } from 'react';
import './App.css';
import'./Login.css';
import './Profile.css';
import Boxers from './Boxers';
import Spars from './Spars';
import Login from './Login';
import NavigationBar from './NavigationBar';
import Brackets from './Brackets';
import Profile from './Profile';
import Signups from './Signups';
import Schedule from './Schedule';
import logo from './boxing-gloves.png';

class App extends Component {

    constructor() {
        super();
        this.state = {
			"page" : "login",
        };
        this.change_page = this.change_page.bind(this);
        this.logout = this.logout.bind(this);
        if (sessionStorage.authenticated) {
            if (sessionStorage.page == null || sessionStorage.page === 'undefined') {
                this.state["page"] = "boxers";
                sessionStorage.page = "boxers";
            } else {
                this.state["page"] = sessionStorage.page;
            }
        }
    }

    change_page(page) {
        this.setState({"page":page});
        sessionStorage.page = page;
    }

    logout() {
        sessionStorage.authenticated = false;
        this.change_page("login");
    }

	render() {
		if (this.state["page"] === "login") {
			return (<Login changePage={this.change_page}/>);
        } else if (this.state["page"] === "boxers") {
			return (
                <div>
                    <header className="App-header">
                        <h1 className="App-title">MatchBox</h1>
                    </header>
                    <p className="logout" onClick={() => this.logout()}>Logout</p>
                    <NavigationBar changePage={this.change_page}/>
                    <Boxers changePage={this.change_page}/>
                </div>
            );
		} else if (this.state["page"] === "spars") {
			return (
                <div>
                    <header className="App-header">
                        <h1 className="App-title">MatchBox</h1>
                    </header>
                    <p className="logout" onClick={() => this.logout()}>Logout</p>
                    <NavigationBar changePage={this.change_page}/>
                    <Spars changePage={this.change_page}/>
                </div>
            );
        } else if (this.state["page"] === "brackets") {
            return (
                <div>
                    <header className="App-header">
                        <h1 className="App-title">MatchBox</h1>
                    </header>
                    <p className="logout" onClick={() => this.logout()}>Logout</p>
                    <NavigationBar changePage={this.change_page}/>
                    <Brackets changePage={this.change_page}/>
                </div>
            );
        } else if (this.state["page"] === "profile") {
            return (
                <div>
                    <header className="App-header">
                        <h1 className="App-title">MatchBox</h1>
                    </header>
                    <p className="logout" onClick={() => this.logout()}>Logout</p>
                    <NavigationBar changePage={this.change_page}/>
                    <Profile changePage={this.change_page}/>
                </div>
            );
        } else if (this.state["page"] === "signups") {
            return (
                <div>
                    <header className="App-header">
                        <h1 className="App-title">MatchBox</h1>
                    </header>
                    <p className="logout" onClick={() => this.logout()}>Logout</p>
                    <NavigationBar changePage={this.change_page}/>
                    <Signups changePage={this.change_page}/>
                </div>
            );
        } else if (this.state["page"] === "schedule") {
            return (
                <div>
                    <header className="App-header">
                        <h1 className="App-title">MatchBox</h1>
                    </header>
                    <p className="logout" onClick={() => this.logout()}>Logout</p>
                    <NavigationBar changePage={this.change_page}/>
                    <Schedule changePage={this.change_page}/>
                </div>
            );
		} else {
            return (<h2>Sorry, page not found</h2>);
        }

	}

}

export default App;
