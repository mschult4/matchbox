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
			"hall": ""
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

	tougherQuery() {
		/*let fetchData = {
			method : 'GET',
			body : JSON.stringify({'year' : 'Sophomore'}),
			headers : new Headers()
		}*/
        fetch("https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/boxers") 
        .then(results => {
            return results.json();
        }).then(data => {

            this.setState({"boxers": data});
            console.log("state", this.state.boxers);
        })
	
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		console.log("thingie: ", event.target.value);	
		//event.preventDefault();
	}

	test(evt) {
		var temp = {};
		temp[evt.target.name] = evt.target.value;
		this.setState(temp);
		console.log("state from test: ", evt.target.name);
		//console.log("state from test props: ", this.props);

	}

	//print() {
		//console.log("in print");
	//	alert(this.state.value);
	//}

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
				<input type="text" name="first" onChange={(evt) => this.test(evt)}/>
				</label>
				<label>
				Last:
				<input type="text" name="last" onChange={(evt) => this.test(evt)}/>
				</label>
				<label>
				Year:
				<input type="text" name="year" onChange={(evt) => this.test(evt)}/>
				</label>
				<label>
				Hall:
				<input type="text" name="hall" onChange={(evt) => this.test(evt)}/>
				</label>

				<button type="button" onClick={() => this.simpleQuery()}>Submit</button>
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
