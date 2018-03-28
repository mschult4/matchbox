import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            "boxers": {},
			"year": "",
			"first": "",
			"last": "",
			"hall": "",
			"year_i" : "",
			"first_i" : "",
			"last_i" : "",
			"hall_i" : "",
			"goes_by_i" : "",
			"eligible_i" : "",
			"experience_i" : "",
			"vet_years_i" : "",
			"weight_i" : "",
			"handedness_i" : "",
			"captain_i" : "",
			"gender_i" : "",
			"year_u" : "",
			"first_u" : "",
			"last_u" : "",
			"hall_u" : "",
			"goes_by_u" : "",
			"eligible_u" : "",
			"experience_u" : "",
			"vet_years_u" : "",
			"weight_u" : "",
			"handedness_u" : "",
			"captain_u" : "",
			"gender_u" : "",
        	"boxer_id_u" : "",
			"year_d" : "",
			"first_d" : "",
			"last_d" : "",
			"hall_d" : "",
			"goes_by_d" : "",
			"eligible_d" : "",
			"experience_d" : "",
			"vet_years_d" : "",
			"weight_d" : "",
			"handedness_d" : "",
			"captain_d" : "",
			"gender_d" : "",
			"boxer_id_d" : "",
			"display" : "Pending",
			"username" : "password"
        };
    }

	starQuery() {
		var URL = "https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/boxers";
		
		fetch(URL)
        .then(results => {
            return results.json();
        }).then(data => {

            this.setState({"boxers": data});
            console.log("state", this.state.boxers);
        })
	}

    simpleQuery() {
		console.log("top of simple: ", this.state.year);	
		var querylist = [];
		var bad_keys = ["hall_i", "last_i", "year_i", "first_i", "goes_by_i",  "eligible_i", "experience_i", "vet_years_i", "weight_i", "handedness_i", "captain_i", "gender_i", "experience_i", "hall_u", "last_u", "goes_by_u", "year_u", "first_u", "eligible_u", "experience_u", "vet_years_u", "weight_u", "handedness_u", "captain_u", "gender_u", "experience_u", "boxer_id_u", "hall_u", "last_u", "goes_by_u", "year_u", "first_u", "eligible_u", "experience_u", "vet_years_u", "weight_u", "handedness_u", "captain_u", "gender_u", "experience_u", "boxer_id_u"]
		for (var key in this.state) {
			console.log("key: ", key);
			console.log("value: ", this.state[key]);
			if (key !== "boxers" && this.state[key] !== "" && !bad_keys.includes(key)) {
				var querystr = key;
				querystr += "=";
				querystr += this.state[key];
				querylist.push(querystr);
				console.log(querylist);
			}
		}

		var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/boxers";

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

            this.setState({"boxers": data});
            console.log("state", this.state.boxers);
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
			this.setState({"boxers": datum});
            console.log("state", this.state.boxers);
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
			this.setState({"boxers": datum});
            console.log("state", this.state.boxers);
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
			this.setState({"boxers": datum});
            console.log("state", this.state.boxers);
        })
		
	}

	checkPass() {
		var URL="";

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

	set_pword(evt) {
		if (evt.target.name === "username") {
			this.props.user = evt.target.value;
		}
		if (evt.target.name === "password") {
			this.props.pass = evt.target.value;
		}

		console.log("pword: ", this.props.user);
		console.log("pword: ", this.props.pass);
		
	}

    render() {
        let headings = ["boxer_id", "mixed_first","mixed_last","mixed_goes_by","year","hall","eligible","experience","vet_years","weight","handedness","captain","gender"];
        let heading_disp = ["Boxer ID", "First Name", "Last Name", "Nickname", "Year", "Hall", "Eligible", "Experience", "Vet Years", "Weight", "Handedness", "Captain", "Gender"];
        var rows = [];
        rows.push(heading_disp.map((str) => <th key={str}>{str}</th>));
        for (var row_num = 0; row_num < this.state.boxers.length; row_num++) {
            var values = [];

			if (this.state.boxers[row_num]["eligible"]) {
            	for (var i=0; i < headings.length; i++) {
               		values.push(<td key={i}>{this.state.boxers[row_num][headings[i]]}</td>);
            	}
            	rows.push(<tr key={row_num}>{values}</tr>);
			}
        }
		if (this.state['display'] === "True") { 
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
			<form>
				Query<br/>
				<label>
				First:
				<input type="text" name="first" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Last:
				<input type="text" name="last" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Year:
				<input type="text" name="year" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Hall:
				<input type="text" name="hall" onChange={(evt) => this.make_query(evt)}/>
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
				{/* <br />
				<label>
				First:
				<input type="text" name="first_d" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Last:
				<input type="text" name="last_d" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Nickname:
				<input type="text" name="goes_by_d" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Year:
				<input type="text" name="year_d" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Hall:
				<input type="text" name="hall_d" onChange={(evt) => this.make_query(evt)}/>
				</label>
				
				Experience:
				<select name="experience_d" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="novice">Novice</option>
					<option value="veteran">Veteran</option>
				</select>


				Eligible:
				<select name="eligible_d" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="Y">Y</option>
					<option value="N">N</option>
				</select>

				Vet_years:
				<select name="vet_years_d" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="0">0</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>

				<label>
				Weight:
				<input type="text" name="weight_d" onChange={(evt) => this.make_query(evt)}/>
				</label>

				Handedness:
				<select name="handedness_d" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="L">L</option>
					<option value="R">R</option>
				</select>

				Captain:
				<select name="captain_d" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="Y">Y</option>
					<option value="N">N</option>
				</select>


				Gender:
				<select name="gender_d" onChange={(evt) => this.make_query(evt)}>
					<option value=""></option>
					<option value="W">W</option>
					<option value="M">M</option>
				</select> */}


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
		} else if (this.state["display"] === "Pending") {
			return(
			<div className="App">
            	<header className="App-header">
            	<h1 className="App-title">Welcome to MatchBox</h1>
				<br />
				<h2>Please sign in</h2>
            	</header>

				<form>
				<br/><br />
				<label>
				Username:
				<input type="text" name="username" onChange={(evt) => this.set_pword(evt)}/>
				</label>
				&emsp;&emsp;
				<label>
				Password:
				<input type="text" name="password" onChange={(evt) => this.set_pword(evt)}/>
				</label>
				<button type="button" onClick={() => this.checkPass()}>Submit</button>
				</form>
			</div>
		);
		}
    }
}

export default App;
