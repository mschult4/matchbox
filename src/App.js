import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            "boxers": {}
        };
    }

    simpleQuery() {
        fetch("https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/boxers")
        .then(results => {
            return results.json();
        }).then(data => {
            this.setState({"boxers": data});
            console.log("state", this.state.boxers);
        })
    }

    render() {
        var headings = [];
        var values = [];
        for (var key in this.state.boxers) {
            headings.push(<th key={key}>{key}</th>);
            values.push(<td key={key}>{this.state.boxers[key]}</td>);
        }
        return (
            <div className="App">
            <header className="App-header">
            <h1 className="App-title">Welcome to MatchBox</h1>
            </header>
            <p className="App-intro">
                Click the button to query the database.
            </p>
            <p>
                <button onClick={() => this.simpleQuery()}>select * from boxers</button>
            </p>
            <table>
                <tbody>
                    <tr>
                        {headings}
                    </tr>
                    <tr>
                        {values}
                    </tr>
                </tbody>
            </table>
            </div>
        );
    }
}

export default App;
