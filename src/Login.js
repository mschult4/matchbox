import React, { Component } from 'react';
import './App.css';
import './Login.css';
import md5 from 'md5';
import logo from './boxing-gloves.png';

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
                    sessionStorage.usertype = datum['usertype'];
                    sessionStorage.identity = datum['boxer_id'];
                    console.log(sessionStorage);
                    console.log("sessionStorage.authenticated: ", sessionStorage.authenticated);
                    if (md5(this.state.password) === '5f4dcc3b5aa765d61d8327deb882cf99') 
                        alert("For security, please change your password from the default assigned to you. Thank you.");
                    if (datum['usertype'] === 'boxer') { 
                        console.log("boxer");
                        this.props.changePage("profile");
                    }
                    else if (datum['usertype'] === 'coach') {
                        console.log("coach");
                        this.props.changePage("boxers");
                    }
                }
                else {
                    alert("Username and/or password are incorrect or not yet updated in system.");
                }
            })

    }

	

    render() {
		return(
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to MatchBox</h1>
                </header>
                <div className="imgcontainer">
                    <img src={logo} alt="Avatar" className="avatar" />
                </div>
                <div className="container">
                    <form>
                        <label htmlFor="username"><b>Username</b></label>
                        <br />
                        <input type="text" placeholder="Enter Username" name="username" onChange={(evt) => this.update_state(evt)}/>
                        <br />
                        <label htmlFor="password"><b>Password</b></label>
                        <br />
                        <input type="password" placeholder="Enter Password" name="password" onChange={(evt) => this.update_state(evt)}/>
                        <br />
                    </form>
                    <button className="loginbtn" onClick={() => this.authenticate_user()}> Login </button>
                </div>
            </div>
		);
	}

}

export default Login;
