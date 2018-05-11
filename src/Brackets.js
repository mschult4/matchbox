import React, { Component } from 'react';
import './App.css';

class Brackets extends Component {

    constructor() {
        super();
        this.state = {
			"rankings" : {},
			"boxers" : {},
			"selected" : {},
			"save_as" : "",
			"load_from" : ["friday"],
			"bracket_load" : "",
			"bracket_list" : {},
			"options" : [],
        };
		this.query_rank();
		this.options();
    }

	query_rank() {
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

		var ordered_bracket = {};

		for (var person in rank_set) {
			ordered_bracket[rank_set[person].seed] = rank_set[person];
		}

		for (var i=1; i<=8; i++) {	
			if (!ordered_bracket[i]) {
				ordered_bracket[i] = null;
			}
		}


		var id_1 = bracket_letter+"_1"
		var id_2 = bracket_letter+"_2"
		var id_3 = bracket_letter+"_3"
		var id_4 = bracket_letter+"_4"
		var id_5 = bracket_letter+"_5"
		var id_6 = bracket_letter+"_6"
		var id_7 = bracket_letter+"_7"
		var id_8 = bracket_letter+"_8"


	return(

<div class="brackdiv">
Bracket {bracket_letter}

<table class="bracket">
<tbody>


<tr>
<td id={id_1} onMouseOver={() => this.boxer_hover(ordered_bracket[1])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_1, [bracket_letter, ordered_bracket[1] ])}><p>{this.concat(ordered_bracket[1])} </p></td>
<td rowSpan='2'><p></p></td>
<td rowSpan='4'><p></p></td>
<td rowSpan='8'><p></p></td>
</tr>
<tr>
<td id={id_8} onMouseOver={() => this.boxer_hover(ordered_bracket[8])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_8,[bracket_letter, ordered_bracket[8]])}><p>{this.concat(ordered_bracket[8])} </p></td>
</tr>
<tr>
<td id={id_4} onMouseOver={() => this.boxer_hover(ordered_bracket[4])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_4,[bracket_letter, ordered_bracket[4]])}><p>{this.concat(ordered_bracket[4])} </p></td>< td rowspan='2'><p></p>< /td>
</tr>
<tr>
<td id={id_5} onMouseOver={() => this.boxer_hover(ordered_bracket[5])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_5,[bracket_letter, ordered_bracket[5]])}><p>{this.concat(ordered_bracket[5])} </p></td>
</tr>
<tr>
<td id={id_3} onMouseOver={() => this.boxer_hover(ordered_bracket[3])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_3,[bracket_letter, ordered_bracket[3]])}><p>{this.concat(ordered_bracket[3])} </p></td>
<td rowSpan='2'><p></p></td><td rowSpan='4'><p></p></td>
</tr>
<tr>
<td id={id_6} onMouseOver={() => this.boxer_hover(ordered_bracket[6])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_6,[bracket_letter, ordered_bracket[6] ])}><p>{this.concat(ordered_bracket[6])} </p></td>
</tr>
<tr>
<td id={id_2} onMouseOver={() => this.boxer_hover(ordered_bracket[2])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_2,[bracket_letter, ordered_bracket[2] ])}><p>{this.concat(ordered_bracket[2])} </p></td><td rowSpan='2'><p></p></td>
</tr>
<tr>
<td id={id_7} onMouseOver={() => this.boxer_hover(ordered_bracket[7])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_7,[bracket_letter, ordered_bracket[7] ])}><p>{this.concat(ordered_bracket[7])} </p></td></tr>
</tbody>
</table></div>);

	}

	swap_func() {

		var to_swap = this.state.selected;
		var item1, item2;
		var keys = Object.keys(to_swap);
		if (keys.length !== 2) {
			alert("Two boxers must be selected to swap");
			return;
		}
		item1 = keys[0];
		item2 = keys[1];


		var td1 = document.getElementById(item1);
		var td2 = document.getElementById(item2);

		var tdtemp = document.createElement("td");
		var tempid = td1.id; 


		var first, second, place1, place2;
		for (var element in this.state.rankings[to_swap[item1][0]]) {
			if (this.state.rankings[to_swap[item1][0]][element].boxer_id === to_swap[item1][1]) {
				first = this.state.rankings[to_swap[item1][0]][element];
				place1 = element;
				break;
			}
		}

		for (var element in this.state.rankings[to_swap[item2][0]]) {
			if (this.state.rankings[to_swap[item2][0]][element].boxer_id === to_swap[item2][1]) {
				second = this.state.rankings[to_swap[item2][0]][element];
				place2 = element;
				break;
			}
		}

		var temp_rank = first;
		var old1_seed = first.seed;
		var old2_seed = second.seed;
		temp_rank.seed = old2_seed;
		second.seed = old1_seed;
		this.state.rankings[to_swap[item1][0]][place1] = second;
		this.state.rankings[to_swap[item2][0]][place2] = temp_rank;

		td1.style.border = "none";
		td2.style.border = "none";
		this.setState( {"selected" : {}});


	}

	select_func(bracket_slot, args) {
		var new_args = args;
		if (args[1] !== null) {
			new_args[1] = args[1].boxer_id;
		} else {
			alert("Moving byes is not supported at this time");
			return;
		}
		if (Object.keys(this.state.selected).length === 2 && !this.state.selected[bracket_slot]) {
			return;
		} 

	
		
		var selec = document.getElementById(bracket_slot);

		if (this.state.selected[bracket_slot]) {
			var copyState = {...this.state.selected};
			delete copyState[bracket_slot];
			this.setState( {"selected" : copyState});
			selec.style.border= "none";

		} else {
			this.state.selected[bracket_slot] = new_args;
			selec.style.border= "solid #55aadd";
			selec.style["border-radius"] = "10px";
		}


	}

	boxer_hover(b_id) {
		if (b_id == null) {
			return;
		}
		var internal = document.createElement("p");
		internal.innerHTML = "Boxer ID: "+b_id.boxer_id+"<br/>";
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
	}

	save_bracket() { 

		if (this.state.save_as === "") {
			alert("Save As must have a bracket name");
			return;
		}

		var bracket_dict = {}
		bracket_dict["name"] = this.state.save_as;
		bracket_dict["bracket"] = {}

		for (var bracket in this.state.rankings) {
			bracket_dict["bracket"][bracket] = {}
			for (var boxer in this.state.rankings[bracket]) {
				bracket_dict["bracket"][bracket]["seed"+this.state.rankings[bracket][boxer]["seed"]] = this.state.rankings[bracket][boxer]["boxer_id"];
			}
		}

		var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/loadSavedBracket";

		var put_dict = {body : JSON.stringify(bracket_dict),
				method : 'PUT',
				headers : {"Content-Type": "text/plain"} };

		fetch(URL, put_dict)
		.then(results => {
			return results.json();
		}).then (data => {
			console.log("From save_brack", data);
			this.options();
		})

	}

	load_saved() {
		if (this.state.bracket_load === "") {
			alert("A bracket must be selected");
			return;
		}
		var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/putBracket";

		var bracket_dict = {"name" : this.state.bracket_load};

		var put_dict = {body : JSON.stringify(bracket_dict),
				method : 'PUT',
				headers : {"Content-Type": "text/plain"} };

		fetch(URL, put_dict)
		.then(results => {
			return results.json();
		}).then (data => {
			this.setState({"rankings":data["ranks"]});
			this.setState({"boxers": data["person_data"]});
			console.log("state rankings", this.state.rankings);
			console.log("state people", this.state.boxers);
		})

	}

	options() {
		var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/loadSavedBracket";

		fetch(URL)
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({"bracket_list": data});
			console.log("bracket_list", data);
		})

	}

	render() {
		let headings = ["boxer_id", "seed", "first", "last", "weight", "score", "av_score", "num_spars", "num_scored"];

		var rows = [];
		var values = [];

		var row_num = 0;
		var top_row = []
		for (var high in this.state.rankings) {
			rows = []
			rows.push(headings.map((str) => <th key={str}>{str}</th>));
			for (var key in this.state.rankings[high]) {
				values = [];
				for (var i=0; i< headings.length; i++) {
					values.push(<td key={i}>{this.state.rankings[high][key][headings[i]]}</td>);
				}
				rows.push(<tr key={row_num}>{values}</tr>);
				row_num++;
			}
			top_row.push(<table key={high}><tbody key={high}>{rows}</tbody></table>);

		}

		var brackets = [];
		for (var bracket in this.state.rankings) {
			brackets.push(this.return_bracket(bracket, this.state.rankings[bracket]));
		}
	
		var options = [];
		options.push(<option value=""></option>);
		for (var j in this.state.bracket_list) {
			options.push(<option value={this.state.bracket_list[j]}>{this.state.bracket_list[j]}</option>);
		}

		return (
            <div className="App">

				<div id="fixedswap">
				<button className="swapbtn" type="button" onClick={() => this.swap_func()}>Swap Boxers</button>
				</div>

			<div id="fixedElement">{this.hover_box_default()}</div>
            	<h2>Brackets</h2>
	
			<div id="save">
			<form>
				<label>
				Save as:
				<input type="text" name="save_as" onChange={(evt) => this.update_state(evt)}/>
				</label>

				<button className="smallerbtn" type="button" onClick={() => this.save_bracket()}>Save</button>
			</form>
				
			<br />

<form>
				<div className="select">
				<label>
				Load Bracket:
				<select name="bracket_load" onChange={(evt) => this.update_state(evt)}>
					{options}
				</select>
				</label>
				</div>

			<button className="smallerbtn" type="button" onClick={() => this.load_saved()}>Submit</button>
			</form>


			</div>
			
				{brackets}

            </div>	
		)
	}

}

export default Brackets;
