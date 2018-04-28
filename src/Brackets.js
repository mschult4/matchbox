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

	return_bracket(rank_set) {
		//console.log("rank set");
		//console.log(rank_set);

		var ordered_bracket = {};

		for (var person in rank_set) {
			console.log("rank set person");
			console.log(person, rank_set[person], rank_set[person].seed);

			ordered_bracket[rank_set[person].seed] = rank_set[person];
		}

		for (var i=1; i<=8; i++) {	//hard coded to 8!
			if (!ordered_bracket[i]) {
				ordered_bracket[i] = null;
			}
		}

		console.log("ordered bracket");
		console.log(ordered_bracket);


//<div id="testing" className="hovering">Test data</div>
	return(


<table rules="rows">
<tbody>


<tr>
<td>{this.concat(ordered_bracket[1])}</td>
<td rowSpan='2'>Winner 1/2</td>
<td rowSpan='4'>Winner 1/2/3/4</td>
<td rowSpan='8'>Winner 1/2/3/4/5/6/7/8</td>
</tr>
<tr>
<td id="testing2" onMouseOver={() => this.boxer_hover(10)} onMouseOut={() => this.boxer_unhover(10)}> {this.concat(ordered_bracket[8])}</td>
</tr>
<tr>
<td>{this.concat(ordered_bracket[4])}</td><td rowSpan='2'>Winner 3/4</td>
</tr>
<tr>
<td>{this.concat(ordered_bracket[5])}</td>
</tr>
<tr>
<td>{this.concat(ordered_bracket[3])}</td><td rowSpan='2'>Winner 5/6</td><td rowSpan='4'>Winner 5/6/7/8</td>
</tr>
<tr>
<td>{this.concat(ordered_bracket[6])}</td>
</tr>
<tr>
<td>{this.concat(ordered_bracket[2])}</td><td rowSpan='2'>Winner 7/8</td>
</tr>
<tr>
<td>{this.concat(ordered_bracket[7])}</td>
</tr>
</tbody>
</table>);

	}

	boxer_hover(b_id) {
		console.log("made it");
		document.getElementById("fixedElement").append(<p>"HOWDY THERE"</p>);
		
	}

	boxer_unhover(b_id) {
		console.log("unhover");
		document.getElementById("fixedElement").innerHTML = this.hover_box_default();
	
	}

	hover_box_default() {
		return "Spar Data\n";
	}

	concat(boxer) {
		if (boxer) {
			return "("+boxer.seed+")  "+boxer.first+" "+boxer.last;
		} else {
			return "[bye]";
		}
	}

	render() {
		console.log("top of render: ", this.state.rankings);
		let headings = ["boxer_id", "seed", "first", "last", "weight", "score", "av_score", "num_spars", "num_scored"];

		var rows = [];
		var values = [];

		//console.log("length: ", this.state.rankings.length);
		var row_num = 0;
		var top_row = []
		var top_row_num = 0;
		for (var high in this.state.rankings) {
			rows = []
			rows.push(headings.map((str) => <th key={str}>{str}</th>));
			for (var key in this.state.rankings[high]) {
				values = [];
				//console.log("key", key);
				//console.log(this.state.rankings[high][key]);
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

		var brackets = [];
		for (var bracket in this.state.rankings) {
			brackets.push(this.return_bracket(this.state.rankings[bracket]));
			brackets.push(<br />);
			//break;
		}


		//document.getElementById("testing2").onmouseenter = function() { this.boxer_hover(45) };

		return (
            <div className="App">
            <header className="App-header">
            <h1 className="App-title">Welcome to MatchBox</h1>
            </header>

			<div id="fixedElement">{this.hover_box_default()}</div>

            	<h2>Brackets</h2>
				{brackets}

				{top_row}
            </div>	
		)
	}

}

export default Brackets;
