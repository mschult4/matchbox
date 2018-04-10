import React, { Component } from 'react';
import './App.css';

class Brackets extends Component {

    constructor() {
        super();
        this.state = {
			"rankings" : {},
        };
		this.query_rank();
    }

	query_rank() {
		console.log("top of query");
		var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/bracket";

		fetch(URL)
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({"rankings":data});
			console.log("state", this.state.rankings);
		})
	}

	render() {
		let headings = ["boxer_id", "first", "last", "weight", "score", "av_score", "num_spars", "num_scored"];

		var rows = [];
		var values = [];
		rows.push(headings.map((str) => <th key={str}>{str}</th>));

		for (var row_num = 0; row_num < this.state.rankings.length; row_num++) {
			for (var i=0; i< headings.length; i++) {
				values.push(<td key={i}>{this.state.rankings[row_num][headings[i]]}</td>);
			}
			rows.push(<tr key={row_num}>{values}</tr>);
		}
		return (
            <div className="App">
            <header className="App-header">
            <h1 className="App-title">Welcome to MatchBox</h1>
            </header>
            <h2>Boxers</h2>
			<table>
            <tbody>
            	{rows}
            </tbody>
            </table>
            </div>	
		)
	}

}

export default Brackets;
