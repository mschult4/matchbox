import React, { Component } from 'react';
import './App.css';
import './Signups.css';

class Signups extends Component {

    constructor(main_app) {
        super();
        this.getSignups();
        this.state = {
            day: "Monday",
            date: "5/14",
            date_format: "2018-05-14"
        };
        this.switchDay = this.switchDay.bind(this);
        this.isActive = this.isActive.bind(this);
        this.sign_up = this.sign_up.bind(this);
        this.un_sign_up = this.un_sign_up.bind(this);
        this.main = main_app;
    }

    getWeek() {
        var date = new Date();
        var this_week = {};
        var n = date.getDay();
        var newdate = new Date(date);
        if (n===0) {
            newdate.setTime(date.getTime() + 1000*60*60*24*1);
            this_week["Monday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Monday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Tuesday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Tuesday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Wednesday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Wednesday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Thursday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Thursday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Friday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Friday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
        } else if (n===1) {
            newdate.setTime(date.getTime() + 1000*60*60*24*0);
            this_week["Monday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Monday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Tuesday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Tuesday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Wednesday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Wednesday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Thursday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Thursday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Friday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Friday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
        } else if (n===2) {
            newdate.setTime(date.getTime() - 1000*60*60*24*1);
            this_week["Monday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Monday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Tuesday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Tuesday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Wednesday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Wednesday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Thursday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Thursday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Friday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Friday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
        } else if (n===3) {
            newdate.setTime(date.getTime() - 1000*60*60*24*2);
            this_week["Monday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Monday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Tuesday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Tuesday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Wednesday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Wednesday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Thursday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Thursday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Friday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Friday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
        } else if (n===4) {
            newdate.setTime(date.getTime() - 1000*60*60*24*3);
            this_week["Monday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Monday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Tuesday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Tuesday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Wednesday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Wednesday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Thursday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Thursday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Friday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Friday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
        } else if (n===5) {
            newdate.setTime(date.getTime() - 1000*60*60*24*4);
            this_week["Monday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Monday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Tuesday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Tuesday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Wednesday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Wednesday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Thursday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Thursday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Friday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Friday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
        } else if (n===6) {
            newdate.setTime(date.getTime() - 1000*60*60*24*5);
            this_week["Monday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Monday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Tuesday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Tuesday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Wednesday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Wednesday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Thursday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Thursday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
            newdate.setTime(newdate.getTime() + 1000*60*60*24*1);
            this_week["Friday"] = newdate.getMonth().toString()+"/"+newdate.getDate().toString()
            this_week["Friday_formal"] = newdate.getYear().toString()+"-"+newdate.getMonth().toString()+"-"+newdate.getDate().toString()
        }
        this.setState({"this_week": this_week});
        this.setState({"date": this_week["Monday"]});
        this.setState({"date_format": this_week["Monday_formal"]});
    }

	getSignups() {
		var URL = "https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/signups";
		
		fetch(URL)
        .then(results => {
            return results.json();
        }).then(data => {

            this.setState({"signups": data});
            console.log("state", this.state.signups);
        })
	}

    sign_up(slot, day, ring, thisisahack) {
		var data = {
			slot: slot,
			day: day,
			ring: ring,
            boxer_id: sessionStorage.identity,
		}
		
        var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/signups";

        var put_dict = {
			body : JSON.stringify(data), 
            method: 'PUT',
            headers : {"Content-Type": "text/plain"}
		};
    
        fetch(URL, put_dict)
        .then(results => {
            return results.json();
        }).then(datum => {
            if (datum['issue'] === 'zero') {
                alert("Cannot sign up - please update your weight in your profile");
            } else if (datum['issue'] === 'weight') {
                alert("Cannot sign up - your opponent's weight cannot differ from yours by more than 10 pounds");
            } else if (datum['issue'] === 'day') {
                alert("Cannot sign up - you cannot spar more than once in two days");
            } else if (datum['issue'] === 'full') {
                alert("This dialogue should never appear. If you are reading this you are a wizard and a heretic.");
            } else if (datum['issue'] === 'none') {
                this.getSignups();
            }
        })  

    }

    un_sign_up(slot, day, ring, thisisahack) {
		var data = {
			slot: slot,
			day: day,
			ring: ring,
            boxer_id: sessionStorage.identity,
		}
		
        var URL="https://okp1u501a5.execute-api.us-east-2.amazonaws.com/test/signups";

        var post_dict = {
			body : JSON.stringify(data), 
            method: 'POST',
            headers : {"Content-Type": "text/plain"}
		};
    
        fetch(URL, post_dict)
        .then(results => {
            return results.json();
        }).then(datum => {
            this.getSignups();
            console.log("datum", datum)
        })  

    }

    renderTable(day) {
        var rows = [];
        for (var i=1; i<=15; i++) {
            var newRow = [];
            newRow.push(<td className="slot" key={i}>{i}</td>);
                for (var ring=1; ring<=2; ring++) {
                    var found = false;
                    var full = false;
                    for (var item in this.state.signups) {
                        if (this.state.signups[item]["spar_slot"]===i && this.state.signups[item]["date"]===day && this.state.signups[item]["ring"]==ring) {
                            if (this.state.signups[item]["boxer"]==sessionStorage.identity) {
                                newRow.push(<td className="cancel" key={i+day+ring+found} onClick={this.un_sign_up.bind(i, i, day, ring)}>{this.state.signups[item]["mixed_first"]} {this.state.signups[item]["mixed_last"]}, {this.state.signups[item]["weight"]}, {this.state.signups[item]["experience"]}, {this.state.signups[item]["handedness"]}</td>);
                            } else {
                                newRow.push(<td className="full" key={i+day+ring+found}>{this.state.signups[item]["mixed_first"]} {this.state.signups[item]["mixed_last"]}, {this.state.signups[item]["weight"]}, {this.state.signups[item]["experience"]}, {this.state.signups[item]["handedness"]}</td>);
                            }
                            if (found) {
                                full = true;
                            } else {
                                found = true;
                            }
                        }
                    }
                    if (!full) {
                        newRow.push(<td key={i+day+ring+"-1"} className="open" onClick={this.sign_up.bind(i, i, day, ring)}>Open</td>);
                    }
                    if (!found) {
                        newRow.push(<td key={i+day+ring+"-2"} className="open" onClick={this.sign_up.bind(i, i, day, ring)}>Open</td>);
                    }
                }
            rows.push(<tr key={i}>{newRow}</tr>);
        }
        return rows;
    }


    switchDay(day, date, date_format) {
        this.setState({"day": day});
        this.setState({"date": date});
        this.setState({"date_format": date_format});
    }

    isActive(day) {
        if (this.state.day === day) {
            return " active";
        } else {
            return "";
        }
    }

	render() {
        var rows = this.renderTable(this.state.date_format);
        return (
            <div className="signupscontainer">
                <h1>Spar Signups - Week of 5/14/18</h1>
                <p>Click an open slot to sign up. Click one of your current signups to remove yourself from that spar slot.</p>
                <div className="tab">
                  <button className={"tablinks"+this.isActive("Monday")} onClick={() => this.switchDay("Monday", "5/14", "2018-05-14")}>Monday</button>
                  <button className={"tablinks"+this.isActive("Tuesday")} onClick={() => this.switchDay("Tuesday", "5/15", "2018-05-15")}>Tuesday</button>
                  <button className={"tablinks"+this.isActive("Wednesday")} onClick={() => this.switchDay("Wednesday", "5/16", "2018-05-16")}>Wednesday</button>
                  <button className={"tablinks"+this.isActive("Thursday")} onClick={() => this.switchDay("Thursday", "5/17", "2018-05-17")}>Thursday</button>
                  <button className={"tablinks"+this.isActive("Friday")} onClick={() => this.switchDay("Friday", "5/18", "2018-05-18")}>Friday</button>
                </div>
                <table className="signups" cellSpacing="10">
                <tbody>
                    <tr>
                        <th></th>
                        <th colSpan="4">{this.state.day}<br/>{this.state.date}</th>
                    </tr>
                    <tr>
                        <th>Slot #</th>
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
