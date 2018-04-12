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
		console.log("top of render: ", this.state.rankings);
		let headings = ["boxer_id", "first", "last", "weight", "score", "av_score", "num_spars", "num_scored"];

		var rows = [];
		var values = [];

		console.log("length: ", this.state.rankings.length);
		var row_num = 0;
		var top_row = []
		var top_row_num = 0;
		for (var high in this.state.rankings) {
			rows = []
			rows.push(headings.map((str) => <th key={str}>{str}</th>));
			for (var key in this.state.rankings[high]) {
				values = [];
				console.log("key", key);
				console.log(this.state.rankings[high][key]);
				//values.push(<td key={headings.length}>{key}</td>);
				for (var i=0; i< headings.length; i++) {
					values.push(<td key={i}>{this.state.rankings[high][key][headings[i]]}</td>);
					//console.log("value" , values);
				}
				rows.push(<tr key={row_num}>{values}</tr>);
				//console.log("rows", rows);
				//break;
				row_num++;
			}
			top_row.push(<table key={high}><tbody key={high}>{rows}</tbody></table>);
			top_row_num++;
			//break;
		}

		return (
            <div className="App">
            <header className="App-header">
            <h1 className="App-title">Welcome to MatchBox</h1>
            </header>
            <h2>Boxers</h2>
				{top_row}
            </div>	
		)
	}

}

export default Brackets;
