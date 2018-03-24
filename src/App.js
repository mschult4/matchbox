import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            boxers: {}
        };
    }

    simpleQuery() {
        fetch("https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/boxers")
        .then(results => {
            return results.json();
        }).then(data => {
			console.log("data", data);
            this.setState(data);
            console.log("state", this.state);
        })
    }

    render() {
        var headings = [];
        var values = [];
		var item = [];
		
        for (var index in this.state) {
			values = [];
			console.log("index", index, this.state[index]);
			for (var key in this.state[index]) {
				//headings.push(<th key={key}>{key}</th>);
            	values.push(<td key={key+index}>{this.state[index][key]}</td>);
			}
			console.log("values", index, values);
			item.push(<tr key={index}>{values}</tr>);
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
            <table>
                <tbody>
                    <tr>
                        {headings}
                    </tr>
                    {//<tr>
					//	{console.log("item", item)}
                     //   {values}
                    //</tr>
					}
					{item}
                </tbody>
            </table>
            </div>
        );
    }
}

export default App;
