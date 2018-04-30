import React, { Component } from 'react';
import './App.css';

class Signups extends Component {

    constructor(main_app) {
        super();
        this.state = {
        };
        this.main = main_app;
        this.getSignups();
    }

    /* Sample query code */
	getSignups() {
		var URL = "https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/signups";
		
		fetch(URL)
        .then(results => {
            return results.json();
        }).then(data => {

            this.setState({"signups": data});
            //console.log("state", this.state.signups);
        })
	}

    sign_up(slot, day, ring, thisisahack) {
		var data = {
			slot: slot,
			day: day,
			ring: ring,
            boxer_id: sessionStorage.identity,
		}
		console.log("sending data to insert", data);
		/*
        var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/signups";

        var post_dict = {
			body : JSON.stringify(data), 
            method: 'POST',
            headers : {"Content-Type": "text/plain"}
		};
    
        console.log("post_dict", post_dict);
        fetch(URL, post_dict)
        .then(results => {
            return results.json();
        }).then(datum => {

            this.setState({"signups": datum});
            //console.log("state", this.state.signups);
        })  
*/
    }

    renderTable() {
        var rows = [];
        for (var i=1; i<=15; i++) {
            var newRow = [];
            newRow.push(<td key={i}>{i}</td>);
            for (var day in {'2018-05-07':0, '2018-05-08':0, '2018-05-09':0, '2018-05-10':0, '2018-05-11':0}) {
                for (var ring=1; ring<=2; ring++) {
                    var found = false;
                    var full = false;
                    for (var item in this.state.signups) {
                        if (this.state.signups[item]["spar_slot"]===i && this.state.signups[item]["date"]===day && this.state.signups[item]["ring"]==ring) {
                            newRow.push(<td key={i+day+ring+found}>{this.state.signups[item]["mixed_first"]} {this.state.signups[item]["mixed_last"]}, {this.state.signups[item]["weight"]}, {this.state.signups[item]["experience"]}, {this.state.signups[item]["handedness"]}</td>);
                            if (found) {
                                full = true;
                            } else {
                                found = true;
                            }
                        }
                    }
                    if (!full) {
                        newRow.push(<td key={i+day+ring+"-1"} onClick={this.sign_up.bind(i, i, day, ring)}>Open</td>);
                    }
                    if (!found) {
                        newRow.push(<td key={i+day+ring+"-2"} onClick={this.sign_up.bind(i, i, day, ring)}>Open</td>);
                    }
                }
            }
            rows.push(<tr key={i}>{newRow}</tr>);
        }
        return rows;
    }

    /* do I need this?
	update_state(evt) {
		var temp = {};
		temp[evt.target.name] = evt.target.value;
		this.setState(temp);
		console.log("state from test: ", evt.target.name);
	}
    */

	render() {
        var rows = this.renderTable();
        return (
            <div>
                <h1>Spar Signups</h1>
                <p>Click an open slot to sign up</p>
                <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th colSpan="4">Mon</th>
                        <th colSpan="4">Tues</th>
                        <th colSpan="4">Wed</th>
                        <th colSpan="4">Thurs</th>
                        <th colSpan="4">Fri</th>
                    </tr>
                    <tr>
                        <th>Slot #</th>
                        <th colSpan="2">Ring 1</th>
                        <th colSpan="2">Ring 2</th>
                        <th colSpan="2">Ring 1</th>
                        <th colSpan="2">Ring 2</th>
                        <th colSpan="2">Ring 1</th>
                        <th colSpan="2">Ring 2</th>
                        <th colSpan="2">Ring 1</th>
                        <th colSpan="2">Ring 2</th>
                        <th colSpan="2">Ring 1</th>
                        <th colSpan="2">Ring 2</th>
                    </tr>
                    {rows}
                </tbody>
                </table>
            </div>
        );
    }

	
}

export default Signups;
