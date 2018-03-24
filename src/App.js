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
        let headings = ["boxer_id", "mixed_first","mixed_last","mixed_goes_by","year","hall","eligible","experience","vet_years","weight","handedness","captain","gender"];
        let heading_disp = ["Boxer ID", "First Name", "Last Name", "Nickname", "Year", "Hall", "Eligible", "Experience", "Vet Years", "Weight", "Handedness", "Captain", "Gender"];
        var rows = [];
        rows.push(heading_disp.map((str) => <th key={str}>{str}</th>));
        for (var row_num = 0; row_num < this.state.boxers.length; row_num++) {
            var values = [];
            for (var i=0; i < headings.length; i++) {
                values.push(<td key={i}>{this.state.boxers[row_num][headings[i]]}</td>);
            }
            rows.push(<tr key={row_num}>{values}</tr>);
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
                    {rows}
                </tbody>
            </table>
            </div>
        );
    }
}

export default App;
