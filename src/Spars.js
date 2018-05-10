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
			"num_spar_i_a" : "",
			"date_i_a" : "",
			"boxer_id_i_a" : "",
			"boxer_first_i_a" : "",
			"boxer_last_i_a" : "",
			"opp_id_i_a" : "",
			"opp_first_i_a" : "",
			"opp_last_i_a" : "",
			"num_rounds_i_a" : "",
			"len_rds_i_a" : "",
			"commments_i_a" : "",
			"score_i_a" : "",
			"coach_initials_i_a" : "",
			"season_i_a" : "",
			"spars.gender_i_a" : "",
			"med_comm_i_a" : "",
			"num_spar_i_b" : "",
			"date_i_b" : "",
			"boxer_id_i_b" : "",
			"boxer_first_i_b" : "",
			"boxer_last_i_b" : "",
			"opp_id_i_b" : "",
			"opp_first_i_b" : "",
			"opp_last_i_b" : "",
			"num_rounds_i_b" : "",
			"len_rds_i_b" : "",
			"commments_i_b" : "",
			"score_i_b" : "",
			"coach_initials_i_b" : "",
			"season_i_b" : "",
			"spars.gender_i_b" : "",
			"med_comm_i_b" : "",
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
			var thingie=document.getElementById("starspar");
			thingie.innerHTML = "Loaded -- Scroll Down";
        })
    }

	insert() {
		if (!this.state.date_i_b.match(/^[12][0-9][0-9][0-9]-[0123][0-9]-[0123][0-9]$/) || !this.state.date_i_a.match(/^[12][0-9][0-9][0-9]-[0123][0-9]-[0123][0-9]$/)) {
			alert("Please enter both spar's dates in YYYY-MM-DD format.");
			return;	
		}
        console.log("in insert", this.state);
		var i_keys = ["num_spar_i_a", "date_i_a", "boxer_id_i_a", "boxer_first_i_a", "boxer_last_i_a", "opp_id_i_a", "opp_first_i_a", "opp_last_i_a", "num_rounds_i_a", "len_rds_i_a", "commments_i_a", "score_i_a", "coach_initials_i_a", "season_i_a", "spars.gender_i_a", "med_comm_i_a", "num_spar_i_b", "date_i_b", "boxer_id_i_b", "boxer_first_i_b", "boxer_last_i_b", "opp_id_i_b", "opp_first_i_b", "opp_last_i_b", "num_rounds_i_b", "len_rds_i_b", "commments_i_b", "score_i_b", "coach_initials_i_b", "season_i_b", "spars.gender_i_b", "med_comm_i_b"]

                var data = {};
                for (var i in i_keys) {
                        if (this.state[i_keys[i]] !== "") {
                                data[i_keys[i]] = this.state[i_keys[i]];
                        }
                }
                console.log("body: ", data);

                var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/spars";

                var post_dict = {body : JSON.stringify(data), 
                        method: 'POST',
                        headers : {"Content-Type": "text/plain",
                                                //"Access-Control-Allow-Headers" : "*",
                                                //"Access-Control-Allow-Origin" : "*"
                                                //"host" : "apigateway.us-east-2.amazonaws.com",
                                                } };
                
                console.log("post_dict", post_dict);
                fetch(URL, post_dict)
                .then(results => {
            return results.json();
        }).then(datum => {
			this.setState({"spars": datum});	
            console.log("insert", datum);
//                        this.setState({"boxers": datum});
//            console.log("state", this.state.boxers);
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
	    <p className="selectall">
			<button id="starspar" className="selectallbtn" onClick={() => this.sparQuery()} >See All Spars</button>
		</p> 
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
			<br />
			<form>
				Insert Boxer 1<br /><br />
				<label>
				Num Spar <b>(Required)</b>:
				<input type="text" name="num_spar_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Spardate <b>(Required)</b>:
				<input type="text" name="date_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Boxer ID <b>(Required)</b>:
				<input type="text" name="boxer_id_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Boxer First:
				<input type="text" name="boxer_first_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Boxer Last:
				<input type="text" name="boxer_last_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Opponent ID:
				<input type="text" name="opp_id_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Opponent First:
				<input type="text" name="opp_first_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Opponent Last:
				<input type="text" name="opp_last_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Num Rounds:
				<input type="text" name="num_rounds_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Length of Rounds:
				<input type="text" name="len_rds_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Comments:
				<input type="text" name="comments_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Score:
				<input type="text" name="score_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Coach Initials:
				<input type="text" name="coach_initials_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Year:
				<input type="text" name="season_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Gender:
				<input type="text" name="spars.gender_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Medical Comments:
				<input type="text" name="med_comm_i_a" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<br />
				<br />
				<br />
				Insert Boxer 2<br /><br />
				<label>
				Num Spar <b>(Required)</b>:
				<input type="text" name="num_spar_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Spardate <b>(Required)</b>:
				<input type="text" name="date_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Boxer ID <b>(Required)</b>:
				<input type="text" name="boxer_id_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Boxer First:
				<input type="text" name="boxer_first_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Boxer Last:
				<input type="text" name="boxer_last_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Opponent ID:
				<input type="text" name="opp_id_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Opponent First:
				<input type="text" name="opp_first_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Opponent Last:
				<input type="text" name="opp_last_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Num Rounds:
				<input type="text" name="num_rounds_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Length of Rounds:
				<input type="text" name="len_rds_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Comments:
				<input type="text" name="comments_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Score:
				<input type="text" name="score_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Coach Initials:
				<input type="text" name="coach_initials_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Year:
				<input type="text" name="season_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Gender:
				<input type="text" name="spars.gender_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<label>
				Medical Comments:
				<input type="text" name="med_comm_i_b" onChange={(evt) => this.update_state(evt)}/>
				</label>
				<br />
				<button className="littlebtn" type="button" onClick={() => this.insert()}>Submit</button>
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
