import React, { Component } from 'react';
import './App.css';
import Boxers from './Boxers';
import Spars from './Spars';
import Login from './Login';

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
			return (<Boxers changePage={this.change_page}/>);
		} else if (this.state["page"] === "spars") {
			return (<Spars changePage={this.change_page}/>);
		} else {
            console.log("page", this.state["page"]);
            return (<h2>Sorry, page not found</h2>);
        }

	}

}

export default App;
