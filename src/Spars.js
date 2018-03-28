import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Spars extends Component {

    constructor() {
        super();
        this.state = {
            "spars": {},
			"num_spar" : "",
			"date" : "",
			"boxer_id" : "",
			"opp_id" : "",
			"num_rounds" : "",
			"len_rds" : "",
			"commments" : "",
			"score" : "",
			"coach_initials" : "",
			"season" : "",
			"gender" : "",
			"med_comm" : "",

			"num_spar_i" : "",
			"date_i" : "",
			"boxer_id_i" : "",
			"opp_id_i" : "",
			"num_rounds_i" : "",
			"len_rds_i" : "",
			"commments_i" : "",
			"score_i" : "",
			"coach_initials_i" : "",
			"season_i" : "",
			"gender_i" : "",
			"med_comm_i" : "",

			"num_spar_u" : "",
			"date_u" : "",
			"boxer_id_u" : "",
			"opp_id_u" : "",
			"num_rounds_u" : "",
			"len_rds_u" : "",
			"commments_u" : "",
			"score_u" : "",
			"coach_initials_u" : "",
			"season_u" : "",
			"gender_u" : "",
			"med_comm_u" : "",

			"num_spar_d" : "",
			"date_d" : "",
			"boxer_id_d" : "",
			"opp_id_d" : "",
        };
    }

	starQuery() {
		var URL = "https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/boxers";
		
		fetch(URL)
        .then(results => {
            return results.json();
        }).then(data => {

            this.setState({"spars": data});
            console.log("state", this.state.spars);
        })
	}

    simpleQuery() {
		console.log("top of simple: ", this.state.year);	
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

	insert() {
		console.log("in insert", this.state);
		var i_keys = ["hall_i", "last_i", "goes_by_i", "year_i", "first_i", "eligible_i", "experience_i", "vet_years_i", "weight_i", "handedness_i", "captain_i", "gender_i", "experience_i"];
		var data = {};
		for (var i in i_keys) {
			if (this.state[i_keys[i]] !== "") {
				data[i_keys[i]] = this.state[i_keys[i]];
			}
		}
		console.log("body: ", data);

		var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/boxers";

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

            console.log("insert", datum);
			this.setState({"spars": datum});
            console.log("state", this.state.spars);
        })
		
	}

	update() {
		console.log("in insert", this.state);
		var u_keys = ["hall_u", "last_u", "goes_by_u", "year_u", "first_u", "eligible_u", "experience_u", "vet_years_u", "weight_u", "handedness_u", "captain_u", "gender_u", "experience_u", "boxer_id_u"];
		var data = {};
		for (var i in u_keys) {
			if (this.state[u_keys[i]] !== "") {
				data[u_keys[i]] = this.state[u_keys[i]];
			}
		}
		console.log("body: ", data);

		var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/boxers";

		var put_dict = {body : JSON.stringify(data), 
			method: 'PUT',
			headers : {"Content-Type": "text/plain"} };
		
		console.log("put_dict", put_dict);
		fetch(URL, put_dict)
		.then(results => {
            return results.json();
        }).then(datum => {

            console.log("update", datum);
			this.setState({"spars": datum});
            console.log("state", this.state.spars);
        })
		
	}

	delete_func() {
		console.log("in delete", this.state);
		var d_keys = ["hall_d", "last_d", "goes_by_d", "year_d", "first_d", "eligible_d", "experience_d", "vet_years_d", "weight_d", "handedness_d", "captain_d", "gender_d", "experience_d", "boxer_id_d"];
		var data = {};
		for (var i in d_keys) {
			if (this.state[d_keys[i]] !== "") {
				data[d_keys[i]] = this.state[d_keys[i]];
			}
		}
		console.log("body: ", data);

		var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/boxers";

		var delete_dict = {body : JSON.stringify(data), 
			method: 'DELETE',
			headers : {"Content-Type": "text/plain"} };
		
		console.log("put_dict", delete_dict);
		fetch(URL, delete_dict)
		.then(results => {
            return results.json();
        }).then(datum => {

            console.log("update", datum);
			this.setState({"spars": datum});
            console.log("state", this.state.spars);
        })
		
	}



	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		console.log("thingie: ", event.target.value);	
		//event.preventDefault();
	}

	make_query(evt) {
		var temp = {};
		temp[evt.target.name] = evt.target.value;
		this.setState(temp);
		console.log("state from test: ", evt.target.name);
	}

	make_insert(evt) {
		var temp = {};
		temp[evt.target.name] = evt.target.value;	
		this.setState(temp);
		console.log("state from test: ", evt.target.name);
	}

	print() {
		console.log("in print", this.state);
	}


    render() {
        var ConditionalLink = "div";//(this.state['username'] && this.state['password'] === 'gordonramsay') ? Link : "div";
        let headings = ["num_spar", "date", "boxer_id", "opp_id", "num_rounds", "len_rds", "comments", "score", "coach_initials", "season", "gender", "med_comm"];
        let heading_disp = ["Spar Number", "Date", "Boxer ID", "Opponent ID", "Num Rounds", "Length Rounds", "Comments", "Score", "Coach", "Season", "Gender", "Medical Comments"];
        var rows = [];
        rows.push(heading_disp.map((str) => <th key={str}>{str}</th>));
        for (var row_num = 0; row_num < this.state.spars.length; row_num++) {
            var values = [];

            for (var i=0; i < headings.length; i++) {
               		values.push(<td key={i}>{this.state.spars[row_num][headings[i]]}</td>);
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
                <button onClick={() => this.starQuery()}>select * from boxers</button>
            </p>
	    <Link to="/boxers">Boxers</Link><br />
	    <Link to="/signups">Signups</Link><br />
	    <Link to="/bracket">Bracket</Link><br />
	    <Link to="/stats">Stats</Link><br />
			<form>
				Query<br/>
				<label>
				Num Spar:
				<input type="text" name="num_spar" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Date:
				<input type="text" name="date" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Boxer ID:
				<input type="text" name="boxer_id" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Opponent ID:
				<input type="text" name="opp_id" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Score:
				<input type="text" name="score" onChange={(evt) => this.make_query(evt)}/>
				</label>

				<button type="button" onClick={() => this.simpleQuery()}>Submit</button>
			</form>
			<br />
			<form>
				Insert<br/>
				<label>
				First:
				<input type="text" name="first_i" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Last:
				<input type="text" name="last_i" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Nickname:
				<input type="text" name="goes_by_i" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Year:
				<input type="text" name="year_i" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Hall:
				<input type="text" name="hall_i" onChange={(evt) => this.make_query(evt)}/>
				</label>
				
				Experience:
				<select name="experience_i" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="novice">Novice</option>
					<option value="veteran">Veteran</option>
				</select>


				Eligible:
				<select name="eligible_i" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="Y">Y</option>
					<option value="N">N</option>
				</select>

				Vet_years:
				<select name="vet_years_i" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="0">0</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>

				<label>
				Weight:
				<input type="text" name="weight_i" onChange={(evt) => this.make_query(evt)}/>
				</label>

				Handedness:
				<select name="handedness_i" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="L">L</option>
					<option value="R">R</option>
				</select>

				Captain:
				<select name="captain_i" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="Y">Y</option>
					<option value="N">N</option>
				</select>


				Gender:
				<select name="gender_i" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="W">W</option>
					<option value="M">M</option>
				</select>


				<button type="button" onClick={() => this.insert()}>Submit</button>
			</form>
		

			<br />
			<form>
				Update<br/>
				<label>
				Boxer Id <strong>(Required)</strong>:
				<input type="text" name="boxer_id_u" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<br />
				<label>
				First:
				<input type="text" name="first_u" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Last:
				<input type="text" name="last_u" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Nickname:
				<input type="text" name="goes_by_u" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Year:
				<input type="text" name="year_u" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Hall:
				<input type="text" name="hall_u" onChange={(evt) => this.make_query(evt)}/>
				</label>
				
				Experience:
				<select name="experience_u" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="novice">Novice</option>
					<option value="veteran">Veteran</option>
				</select>


				Eligible:
				<select name="eligible_u" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="Y">Y</option>
					<option value="N">N</option>
				</select>

				Vet_years:
				<select name="vet_years_u" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="0">0</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>

				<label>
				Weight:
				<input type="text" name="weight_u" onChange={(evt) => this.make_query(evt)}/>
				</label>

				Handedness:
				<select name="handedness_u" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="L">L</option>
					<option value="R">R</option>
				</select>

				Captain:
				<select name="captain_u" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="Y">Y</option>
					<option value="N">N</option>
				</select>


				Gender:
				<select name="gender_u" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="W">W</option>
					<option value="M">M</option>
				</select>


				<button type="button" onClick={() => this.update()}>Submit</button>
			</form>

			<br />
			<form>
				Delete<br/>
				<label>
				Boxer Id:
				<input type="text" name="boxer_id_d" onChange={(evt) => this.make_query(evt)}/>
				</label>

				<button type="button" onClick={() => this.delete_func()}>Submit</button>
			</form>
		

	
			<br />
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
            </div> 

        );
    }
}

export default Spars;
