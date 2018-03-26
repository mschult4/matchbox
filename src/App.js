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
			"hall_i" : ""
        };
    }

    simpleQuery() {
		//alert("got here");
		//var params = {foo : "bar"};

		console.log("top of simple: ", this.state.year);	
		var querylist = [];	
		for (var key in this.state) {
			console.log("key: ", key);
			console.log("value: ", this.state[key]);
			if (key !== "boxers" && this.state[key] !== "") {
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
		//alert("also here");
    }

	insert() {
		console.log("in insert", this.state);
		var i_keys = ["hall_i", "last_i", "year_i", "first_i"];
		var data = {};
		for (var i in i_keys) {
			if (this.state[i_keys[i]] !== "") {
				data[i_keys[i]] = this.state[i_keys[i]];
			}
		}
		console.log("body: ", data);

		var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/boxers";

		var post_dict = {body : data, 
			method: 'POST',
			headers : {"Content-Type": "application/json"} };
		
		console.log("post_dict", post_dict);
		fetch(URL, post_dict)
		.then(results => {
            return results.json();
        }).then(datum => {

            console.log("state", datum);
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
		//console.log("state from test props: ", this.props);
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
        let headings = ["boxer_id", "mixed_first","mixed_last","mixed_goes_by","year","hall","eligible","experience","vet_years","weight","handedness","captain","gender"];
        let heading_disp = ["Boxer ID", "First Name", "Last Name", "Nickname", "Year", "Hall", "Eligible", "Experience", "Vet Years", "Weight", "Handedness", "Captain", "Gender"];
        var rows = [];
        rows.push(heading_disp.map((str) => <th key={str}>{str}</th>));
        for (var row_num = 0; row_num < this.state.boxers.length; row_num++) {
            var values = [];

			if (this.state.boxers[row_num]["year"]) {
            	for (var i=0; i < headings.length; i++) {
               		values.push(<td key={i}>{this.state.boxers[row_num][headings[i]]}</td>);
            	}
            	rows.push(<tr key={row_num}>{values}</tr>);
			}
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
                <button onClick={() => this.simpleQuery()}>select * from boxers</button>
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
				Year:
				<input type="text" name="year_i" onChange={(evt) => this.make_query(evt)}/>
				</label>
				<label>
				Hall:
				<input type="text" name="hall_i" onChange={(evt) => this.make_query(evt)}/>
				</label>

				<button type="button" onClick={() => this.insert()}>Submit</button>
			</form>

            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
            </div>
        );
    }
}

export default App;
