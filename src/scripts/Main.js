import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import mlblogo from "../styles/mlb.png";

class Main extends Component {
    /**
     * A Class to display all options to search teams, roaster and players  
     */

    constructor() {
        super();
        this.state = {
            searchPlayer: "",
            searchRoster: "",
            teams: new Map(),
            players: new Map()
        };
    }

    updateSearch = (e) => {
        const {name, value} = e.target;
    
        this.setState(() => ({
          [name]: value
        }))
    }

    componentDidMount() {
        var url = "https://statsapi.mlb.com/api/v1/teams?sportId=1"

        //Use fetch to get the spreadsheet data
        fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                //add the jsonData to the arrays of teams and details 
                if (jsonData != null && jsonData.teams != null) {
                    for (let i = 0; i < jsonData.teams.length; i++) {
                        var temp = {
                            id: jsonData.teams[i]['id'],
                            name: jsonData.teams[i]['name']
                        };
                        this.setState({
                            teams: update(this.state.teams,  {$add : [ [temp.name, temp.id ] ]  })
                        });
                    }
                }
            });
    }


    render() {
        return (
            <div className="MainPage">
                <img alt="logo" src={mlblogo}  style={{margin: "0px", maxWidth: "300px", height:"auto"}}/>
                <div class="row Selection">
                    <div class="col-4">
                        <div class="list-group" id="list-tab" role="tablist" style={{ width: '350%' }}>
                            <h8 class="list-group-item list-group-item-action active" style={{textAlign: "center"}}>
                                Team and Player Stats Application
                            </h8>
                            <Link to='/teams'>
                                <a class="list-group-item list-group-item-action" href="teams">Teams</a>
                            </Link>
                            <div class="input-group mb-3">
                                <Link to={'/rosters/' + this.state.teams.get(this.state.searchRoster)}>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button">Search Rosters</button>
                                    </div>
                                </Link>
                                <input type="text" class="form-control" placeholder="Team Name" 
                                    name="searchRoster" value={this.state.searchRoster} onChange={this.updateSearch} />
                            </div>
                            <div class="input-group mb-3">
                                <Link to={'/player/' + this.state.searchPlayer}>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button">Search Players</button>
                                    </div>
                                </Link>
                                <input type="text" class="form-control" placeholder="Player ID" 
                                    name="searchPlayer" value={this.state.searchPlayer} 
                                    onChange={this.updateSearch} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Main;