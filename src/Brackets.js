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
			this.setState({"rankings":data["ranks"]});
			this.setState({"boxers": data["person_data"]});
			console.log("state rankings", this.state.rankings);
			console.log("state people", this.state.boxers);
		})

	}

	return_bracket(bracket_letter, rank_set) {
		//console.log("rank set");
		//console.log(rank_set);

		var ordered_bracket = {};

		for (var person in rank_set) {
			//console.log("rank set person");
			//console.log(person, rank_set[person], rank_set[person].seed);

			ordered_bracket[rank_set[person].seed] = rank_set[person];
		}

		for (var i=1; i<=8; i++) {	//hard coded to 8!
			if (!ordered_bracket[i]) {
				ordered_bracket[i] = null;
			}
		}

		//console.log("ordered bracket");
		//console.log(ordered_bracket);


//<div id="testing" className="hovering">Test data</div>
	return(

<div class="brackdiv">
Bracket {bracket_letter}

<table class="bracket">
<tbody>


<tr>
<td id="testing1" onMouseOver={() => this.boxer_hover(ordered_bracket[1])} onMouseOut={() => this.boxer_unhover()}> <p>{this.concat(ordered_bracket[1])}</p></td>
<td rowSpan='2'><p></p></td>
<td rowSpan='4'><p></p></td>
<td rowSpan='8'><p></p></td>
</tr>
<tr>
<td id="testing8" onMouseOver={() => this.boxer_hover(ordered_bracket[8])} onMouseOut={() => this.boxer_unhover()}> <p>{this.concat(ordered_bracket[8])}</p></td>
</tr>
<tr>
<td id="testing4" onMouseOver={() => this.boxer_hover(ordered_bracket[4])} onMouseOut={() => this.boxer_unhover()}> <p>{this.concat(ordered_bracket[4])}</p></td><td rowSpan='2'><p></p></td>
</tr>
<tr>
<td id="testing5" onMouseOver={() => this.boxer_hover(ordered_bracket[5])} onMouseOut={() => this.boxer_unhover()}> <p>{this.concat(ordered_bracket[5])}</p></td>
</tr>
<tr>
<td id="testing3" onMouseOver={() => this.boxer_hover(ordered_bracket[3])} onMouseOut={() => this.boxer_unhover()}> <p>{this.concat(ordered_bracket[3])}</p></td>
<td rowSpan='2'><p></p></td><td rowSpan='4'><p></p></td>
</tr>
<tr>
<td id="testing6" onMouseOver={() => this.boxer_hover(ordered_bracket[6])} onMouseOut={() => this.boxer_unhover()}> <p>{this.concat(ordered_bracket[6])}</p></td>
</tr>
<tr>
<td id="testing2" onMouseOver={() => this.boxer_hover(ordered_bracket[2])} onMouseOut={() => this.boxer_unhover()}> <p>{this.concat(ordered_bracket[2])}</p></td><td rowSpan='2'><p></p></td>
</tr>
<tr>
<td id="testing7" onMouseOver={() => this.boxer_hover(ordered_bracket[7])} onMouseOut={() => this.boxer_unhover()}> <p>{this.concat(ordered_bracket[7])}</p></td></tr>
</tbody>
</table></div>);

	}

	boxer_hover(b_id) {
		if (b_id == null) {
			return;
		}
		console.log("made it");
		var internal = document.createElement("p");
		internal.innerHTML = "Boxer ID: "+b_id.boxer_id+"<br/>";
		//document.getElementById("fixedElement").appendChild(internal);
		internal.append("Boxer: "+b_id.first+" "+b_id.last);
		internal.innerHTML += "<br/>";
		internal.append("Weight: "+b_id.weight+" lbs");
		internal.innerHTML += "<br/>";	
		internal.append("Number of Spars: "+b_id.num_spars);
		internal.innerHTML += "<br/>";
		internal.append("Max Score: "+b_id.max_score);
		internal.innerHTML += "<br/>";
		document.getElementById("fixedElement").appendChild(internal);

		var comment = document.createElement("p");	
		var boxer_info = this.state.boxers[b_id.boxer_id]
		if (boxer_info && boxer_info["comments"]) {
			console.log("HERE", boxer_info)
			comment.innerHTML += "Spar Comments<br/>";
			for (var com in boxer_info["comments"]) {
				if (boxer_info["comments"][com] === null) {
					continue;
				}
				comment.innerHTML += com;
				comment.innerHTML += "&#8594; ";
				comment.innerHTML += boxer_info["comments"][com];
				comment.innerHTML += "<br/>";
			}
		}
		document.getElementById("fixedElement").appendChild(comment);
		
	}

	boxer_unhover() {
		console.log("unhover");
		document.getElementById("fixedElement").innerHTML = this.hover_box_default();
	
	}

	hover_box_default() {
		return "Spar Data";
	}

	concat(boxer) {
		if (boxer) {
			return "("+boxer.seed+")  "+boxer.first+" "+boxer.last;
		} else {
			return "[bye]";
		}
	}

	update_state(evt) {
		var temp = {};
		temp[evt.target.name] = evt.target.value;
		this.setState(temp);
		console.log("state from test: ", evt.target.value);
	}

	save_bracket() {
		console.log("in save bracket");

		var bracket_dict = {}
		bracket_dict["name"] = this.state.save_as;
		bracket_dict["bracket"] = {}

		for (var bracket in this.state.rankings) {
			//console.log(bracket);
			bracket_dict["bracket"][bracket] = {}
			for (var boxer in this.state.rankings[bracket]) {
				//console.log("HERE", this.state.rankings[bracket][boxer]["seed"]);
				bracket_dict["bracket"][bracket]["seed"+this.state.rankings[bracket][boxer]["seed"]] = this.state.rankings[bracket][boxer]["boxer_id"];
			}
		}
		console.log(bracket_dict);
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
			//console.log("this state rankings [bracket]", this.state.rankings[bracket], bracket);
			brackets.push(this.return_bracket(bracket, this.state.rankings[bracket]));
			//break;
		}


		//document.getElementById("testing2").onmouseenter = function() { this.boxer_hover(45) };



		return (
            <div className="App">
            <header className="App-header">
            <h1 className="App-title">MatchBox</h1>
            </header>

			<div id="fixedElement">{this.hover_box_default()}</div>

            	<h2>Brackets</h2>
	
			<div id="save">
			<form>
				<label>
				Save as:
				<input type="text" name="save_as" onChange={(evt) => this.update_state(evt)}/>
				</label>

				<button type="button" onClick={() => this.save_bracket()}>Save</button>
			</form>

			</div>
				{brackets}

            </div>	
		)
	}

}

export default Brackets;
