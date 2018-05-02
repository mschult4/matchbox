import React, { Component } from 'react';
import './Boxer.css';

class Spars extends Component {

    constructor() {
        super();
        this.state = {
			"spars" : {},
			"num_spar" : "",
			"date" : "",
			"boxer_id" : "",
			"boxer_first" : "",
			"boxer_last" : "",
			"opp_id" : "",
			"opp_first" : "",
			"opp_last" : "",
			"num_rounds" : "",
			"len_rds" : "",
			"commments" : "",
			"score" : "",
			"coach_initials" : "",
			"season" : "",
			"spars.gender" : "",
			"med_comm" : "",
        };
    }
		
	update_state(evt) {
		var temp = {};
		temp[evt.target.name] = evt.target.value;
		this.setState(temp);
		console.log("state from test: ", evt.target.name);
	}
	

    sparQuery() {
		console.log("top of simple: ", this.state.spars);	
		var querylist = [];
		var bad_keys = ["num_spar_i", "date_i", "boxer_id_i", "opp_id_i", "num_rounds_i", "len_rds_i", "commments_i", "score_i", "coach_initials_i", "season_i", "gender_i", "med_comm_i", "num_spar_u", "date_u", "boxer_id_u", "opp_id_u", "num_rounds_u", "len_rds_u", "commments_u", "score_u", "coach_initials_u", "season_u", "gender_u", "med_comm_u", "num_spar_d", "date_d", "boxer_id_d", "opp_id_d"]
		for (var key in this.state) {
			console.log("key: ", key);
			console.log("value: ", this.state[key]);
			if (key !== "spars" && this.state[key] !== "" && !bad_keys.includes(key)) {
				var querystr = key;
				querystr += "=";
				querystr += this.state[key];
				querylist.push(querystr);
				console.log(querylist);
			}
		}

		var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/spars";

		var middle = "";
		console.log(querylist);
		if (querylist.length !== 0) { //pretty later
			middle = "?"
			middle += querylist.join("&");
			console.log(middle);
		}
				
        fetch(URL+middle)
        .then(results => {
            return results.json();
        }).then(data => {

            this.setState({"spars": data});
            console.log("SPARZZZZ", this.state.spars);
        })
    }


	render() {

        let headings = ["num_spar", "date", "boxer_first" , "boxer_last", "opp_first", "opp_last", "num_rounds", "len_rds", "comments", "score", "coach_initials", "season", "gender", "med_comm"];
        let heading_disp = ["Spar Number", "Date", "Boxer First" , "Boxer Last","Opponent First", "Opponent Last", "Num Rounds", "Length Rounds", "Comments", "Score", "Coach", "Season", "Gender", "Medical Comments"];
        var rows = [];
		var count = 0;
        for (var row_num = 0; row_num < this.state.spars.length; row_num++) {
			if (count === 0) {
		        rows.push(heading_disp.map((str) => <th className="designated" key={str}>{str}</th>));
			}
			count++;
            var values = [];

            for (var i=0; i < headings.length; i++) {
               		values.push(<td className="designated" key={i}>{this.state.spars[row_num][headings[i]]}</td>);
            	}
            rows.push(<tr className="designated" key={row_num}>{values}</tr>);
        }

		
		return(<div className="App">
			<h2>Spars</h2>
	    <p className="selectall"><button className="selectallbtn" onClick={() => this.sparQuery()} >See All Spars</button></p> 
			<form>
				Lookup<br/>
				<label>
				Num Spar:
				<input type="text" name="num_spar" onChange={(evt) => this.update_state(evt)}/>
				</label>
				{ /*<label>
				Date:
				<input type="text" name="date" onChange={(evt) => this.update_state(evt)}/>
				</label> */ } 
				<label>
				Boxer ID:
				<input type="text" name="boxer_id" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Boxer First:
				<input type="text" name="boxer_first" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Boxer Last:
				<input type="text" name="boxer_last" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Opponent ID:
				<input type="text" name="opp_id" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Opponent First:
				<input type="text" name="opp_first" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Opponent Last:
				<input type="text" name="opp_last" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Score:
				<input type="text" name="score" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<br />
				<button className="littlebtn" type="button" onClick={() => this.sparQuery()}>Submit</button>
			</form>

	
	
			<br />
            <table className="designated">
                <tbody className="designated">
                    {rows}
                </tbody>
            </table>
            </div>

	

		);
	}


}

export default Spars;
