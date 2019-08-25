import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mlblogo from "../styles/mlb.png";

class Main extends Component {
    /**
     * A className to display all options to search teams, roaster and players  
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


    render() {
        return (
            <div className="MainPage">
                <img alt="logo" src={mlblogo}  style={{margin: "0px", maxWidth: "300px", height:"auto"}}/>
                <div className="row Selection">
                    <div className="col-4">
                        <div className="list-group" id="list-tab" role="tablist" style={{ width: '350%' }}>
                            <h5 className="list-group-item list-group-item-action active mb-1" style={{textAlign: "center"}}>
                                Team and Player Stats Application
                            </h5>
                            <Link className="list-group-item list-group-item-action mb-1" style={{textAlign: "left"}} 
                                to='/teams'>
                                    Teams
                            </Link>
                            <div className="input-group mb-1">
                                <Link to={'/rosters/' + this.state.searchRoster}>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button">Search Rosters</button>
                                    </div>
                                </Link>
                                <input type="text" className="form-control" placeholder="Enter Team ID" 
                                    name="searchRoster" value={this.state.searchRoster} onChange={this.updateSearch} />
                            </div>
                            <div className="input-group mb-3">
                                <Link to={'/player/' + this.state.searchPlayer}>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button">Search Players</button>
                                    </div>
                                </Link>
                                <input type="text" className="form-control" placeholder="Enter Player ID" 
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