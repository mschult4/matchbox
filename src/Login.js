import React, { Component } from 'react';
import './App.css';

class Login extends Component {

    constructor() {
        super();
        this.state = {
			"username" : "",
            "password" : "",
        };
    }

	update_state(evt) {
		var temp = {};
		temp[evt.target.name] = evt.target.value;
		this.setState(temp);
		console.log("state from test: ", evt.target.name);
	}

    authenticate_user() {
        var data = {};
        data['username'] = this.state.username;
        data['password'] = this.state.password;
        console.log("body: ", data);

        var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/signin";

        var post_dict = {body : JSON.stringify(data), 
            method: 'POST',
            headers : {"Content-Type": "application/json"}
        };

        console.log("post_dict", post_dict);
        fetch(URL, post_dict)
            .then(results => {
                return results.json();
            }).then(datum => {
                console.log("datum: ", datum);
                console.log("datum: ", datum['verified'] === 'true');
                if (datum['verified'] === 'true') {
                    sessionStorage.authenticated = true;
                    console.log("sessionStorage.authenticated: ", sessionStorage.authenticated);
                    this.props.changePage("boxers");
                }
            })

    }

	

    render() {
		return(
            <div className="App">
            <header className="App-header">
            <h1 className="App-title">Welcome to MatchBox</h1>
            </header>
            <form>
                Login<br/>
                <label>
                Username:
                <input type="text" name="username" onChange={(evt) => this.update_state(evt)}/>
                </label>
        <br />
                <label>
                Password:
                <input type="password" name="password" onChange={(evt) => this.update_state(evt)}/>
                </label>
        <br />
            </form>
            <button onClick={() => this.authenticate_user()}> Login </button>
            </div>
		);
	}

}

export default Login;
