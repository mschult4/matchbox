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
		console.log("OPTIONS", this.state.options);
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

		console.log("ordered bracket");
		console.log(ordered_bracket);

		var id_1 = bracket_letter+"_1"
		var id_2 = bracket_letter+"_2"
		var id_3 = bracket_letter+"_3"
		var id_4 = bracket_letter+"_4"
		var id_5 = bracket_letter+"_5"
		var id_6 = bracket_letter+"_6"
		var id_7 = bracket_letter+"_7"
		var id_8 = bracket_letter+"_8"


//<div id="testing" className="hovering">Test data</div>
	return(

<div class="brackdiv">
Bracket {bracket_letter}

<table class="bracket">
<tbody>


<tr>
<td id={id_1} onMouseOver={() => this.boxer_hover(ordered_bracket[1])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_1, [bracket_letter, ordered_bracket[1].boxer_id ])}><p>{this.concat(ordered_bracket[1])} </p></td>
<td rowSpan='2'><p></p></td>
<td rowSpan='4'><p></p></td>
<td rowSpan='8'><p></p></td>
</tr>
<tr>
<td id={id_8} onMouseOver={() => this.boxer_hover(ordered_bracket[8])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_8,[bracket_letter, ordered_bracket[8].boxer_id ])}><p>{this.concat(ordered_bracket[8])} </p></td>
</tr>
<tr>
<td id={id_4} onMouseOver={() => this.boxer_hover(ordered_bracket[4])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_4,[bracket_letter, ordered_bracket[4].boxer_id ])}><p>{this.concat(ordered_bracket[4])} </p></td>< td rowspan='2'><p></p>< /td>
</tr>
<tr>
<td id={id_5} onMouseOver={() => this.boxer_hover(ordered_bracket[5])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_5,[bracket_letter, ordered_bracket[5].boxer_id ])}><p>{this.concat(ordered_bracket[5])} </p></td>
</tr>
<tr>
<td id={id_3} onMouseOver={() => this.boxer_hover(ordered_bracket[3])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_3,[bracket_letter, ordered_bracket[3].boxer_id ])}><p>{this.concat(ordered_bracket[3])} </p></td>
<td rowSpan='2'><p></p></td><td rowSpan='4'><p></p></td>
</tr>
<tr>
<td id={id_6} onMouseOver={() => this.boxer_hover(ordered_bracket[6])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_6,[bracket_letter, ordered_bracket[6].boxer_id ])}><p>{this.concat(ordered_bracket[6])} </p></td>
</tr>
<tr>
<td id={id_2} onMouseOver={() => this.boxer_hover(ordered_bracket[2])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_2,[bracket_letter, ordered_bracket[2].boxer_id ])}><p>{this.concat(ordered_bracket[2])} </p></td><td rowSpan='2'><p></p></td>
</tr>
<tr>
<td id={id_7} onMouseOver={() => this.boxer_hover(ordered_bracket[7])} onMouseOut={() => this.boxer_unhover()} onClick={() =>this.select_func(id_7,[bracket_letter, ordered_bracket[7].boxer_id ])}><p>{this.concat(ordered_bracket[7])} </p></td></tr>
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

		console.log(keys, item1, item2);

		var td1 = document.getElementById(item1);
		var td2 = document.getElementById(item2);

		var tdtemp = document.createElement("td");
		var tempid = td1.id; 
		/*console.log("old td1", td1.id);
		console.log("old td2", td2.id);
		td1.setAttribute("id", td2.id);
		td2.setAttribute("id", tempid);
		console.log("before set onclick null", td1.onclick);
		td1.onclick = function() {return false};
		td2.onclick = function() {return false};
		console.log("after", td1.onclick);
		console.log("new td1", td1.id);
		console.log("new td2", td2.id);
		td1.onclick= () =>this.select_func(td1.id,[to_swap[item2][0], to_swap[item2][1]]);
		//td2.onclick= null;
		td2.onclick= () =>this.select_func(td2.id,[to_swap[item1][0], to_swap[item1][1]]);
		//td1.onclick = function() { alert(this);};//this.select_func(td1.id, [to_swap[item1][0], to_swap[item1][1]]); };*/

		/*td1.parentNode.insertBefore(tdtemp, td1);
		td2.parentNode.insertBefore(td1, td2);
		tdtemp.parentNode.insertBefore(td2, tdtemp);
		tdtemp.parentNode.removeChild(tdtemp);*/

		/*console.log(td1, td2);
		var tdtemp = td1.firstChild;
		td1.firstChild = td2.firstChild;
		td2.firstChild = tdtemp;*/
		
		//console.log(td1, td2);

		var first, second, place1, place2;
		for (var element in this.state.rankings[to_swap[item1][0]]) {
			//console.log(this.state.rankings[item1[0]][element].boxer_id);
			//console.log(to_swap[item1][1]);
			if (this.state.rankings[to_swap[item1][0]][element].boxer_id === to_swap[item1][1]) {
				first = this.state.rankings[to_swap[item1][0]][element];
				place1 = element;
				break;
			}
		}

		for (var element in this.state.rankings[to_swap[item2][0]]) {
			//console.log(this.state.rankings[item2[0]][element].boxer_id);
			//console.log(to_swap[item2][1]);
			if (this.state.rankings[to_swap[item2][0]][element].boxer_id === to_swap[item2][1]) {
				second = this.state.rankings[to_swap[item2][0]][element];
				place2 = element;
				break;
			}
		}

		var temp_rank = first;
		var old1_seed = first.seed;
		var old2_seed = second.seed;
		console.log("old1", old1_seed, "old2", old2_seed);
		temp_rank.seed = old2_seed;
		second.seed = old1_seed;
		this.state.rankings[to_swap[item1][0]][place1] = second;
		this.state.rankings[to_swap[item2][0]][place2] = temp_rank;

		td1.style.border = "none";
		td2.style.border = "none";
		this.setState( {"selected" : {}});
		console.log(first, place1, second, place2);


		console.log("SWAP", this.state.rankings);
	}

	select_func(bracket_slot, args) {
		console.log(bracket_slot, args);
		if (Object.keys(this.state.selected).length === 2 && !this.state.selected[bracket_slot]) {
			return;
		}
		
		var selec = document.getElementById(bracket_slot);

		if (this.state.selected[bracket_slot]) {
			var copyState = {...this.state.selected};
			console.log("copy", copyState);
			delete copyState[bracket_slot];
			console.log("copy deleted", copyState);
			this.setState( {"selected" : copyState});
			selec.style.border= "none";

		} else {
			console.log("select: ", this.state.selected);
			this.state.selected[bracket_slot] = args;
			selec.style.border= "solid #55aadd";
			selec.style["border-radius"] = "10px";
		}

		console.log(selec);

		console.log("selected: ", this.state.selected);
	}

	boxer_hover(b_id) {
		if (b_id == null) {
			return;
		}
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
		console.log("state from test: ", evt.target.value);
	}

	save_bracket() { // this is set up wrong
		console.log("in save bracket");

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
		console.log(bracket_dict);

		var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/loadSavedBracket";

		var put_dict = {body : JSON.stringify(bracket_dict),
				method : 'PUT',
				headers : {"Content-Type": "text/plain"} };

		console.log("put_dict", put_dict);
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
		console.log("top of load_saved");
		var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/putBracket";

		var bracket_dict = {"name" : this.state.bracket_load};

		var put_dict = {body : JSON.stringify(bracket_dict),
				method : 'PUT',
				headers : {"Content-Type": "text/plain"} };

		console.log("put_dict", put_dict);
		fetch(URL, put_dict)
		.then(results => {
			return results.json();
		}).then (data => {
			console.log("From put", data);
			this.setState({"rankings":data["ranks"]});
			this.setState({"boxers": data["person_data"]});
			console.log("state rankings", this.state.rankings);
			console.log("state people", this.state.boxers);
		})

	}

	options() {
		console.log("top of options");
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
		console.log("top of render: ", this.state.rankings);
		let headings = ["boxer_id", "seed", "first", "last", "weight", "score", "av_score", "num_spars", "num_scored"];

		var rows = [];
		var values = [];

		//console.log("length: ", this.state.rankings.length);
		var row_num = 0;
		var top_row = []
		//var top_row_num = 0;
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
			//top_row_num++;
			//break;
		}

		var brackets = [];
		for (var bracket in this.state.rankings) {
			//console.log("this state rankings [bracket]", this.state.rankings[bracket], bracket);
			brackets.push(this.return_bracket(bracket, this.state.rankings[bracket]));
			//break;
		}
		//document.getElementById("testing2").onmouseenter = function() { this.boxer_hover(45) };
	
		var options = [];
		console.log(this.state.bracket_list);
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
