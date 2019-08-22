import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Main extends Component {
    /**
     * A Class to display all options to search teams, roaster and players  
     */

    constructor() {
        super();
        this.state = {
            searchPlayer: "",
            searchRoster: ""
        };
    }

    updateRosterSearch(event) {
        this.setState({ searchRoster: event.target.value.substring(0, 20) });
    }

    updatePlayerSearch(event) {
        this.setState({ searchPlayer: event.target.value.substring(0, 20) });
    }


    render() {
        return (
            <div className="MainPage">
                <img alt="logo" src="https://www.mlbstatic.com/team-logos/141.svg" />

                <div class="row Selection">
                    <div class="col-4">
                        <div class="list-group" id="list-tab" role="tablist" style={{ width: '350%' }}>
                            <a class="list-group-item list-group-item-action active" href="home" >Home</a>
                            <Link to='/teams'>
                                <a class="list-group-item list-group-item-action" href="teams">Teams</a>
                            </Link>
                            <div class="input-group mb-3">
                                <Link to={'/rosters/' + this.state.searchRoster}>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button">Search Rosters</button>
                                    </div>
                                </Link>
                                <input type="text" class="form-control" placeholder="Team Name" value={this.state.searchRoster} onChange={this.updateRosterSearch.bind(this)} />
                            </div>
                            <div class="input-group mb-3">
                                <Link to={'/players/' + this.state.searchPlayer}>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button">Search Players</button>
                                    </div>
                                </Link>
                                <input type="text" class="form-control" placeholder="Player Name" value={this.state.searchPlayer} onChange={this.updatePlayerSearch.bind(this)} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Main;