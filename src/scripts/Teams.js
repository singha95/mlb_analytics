import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Teams extends Component {

    constructor() {
        super();

        this.state = {
            search: "",
            teams: [],
            isLoading: true
        };

    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substring(0, 20) });
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
                        console.log(jsonData.teams[i]['id']);
                        var temp = {
                            id: jsonData.teams[i]['id'],
                            name: jsonData.teams[i]['name'],
                            link: jsonData.teams[i]['link']
                        };

                        this.state.teams.push(temp);
                    }
                }
                setTimeout(() => this.setState({ isLoading: false }), 500);
            });
    }

    render() {
        let teamsList = this.state.teams.filter(
            (team) => {
                return team.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        if (this.state.isLoading) {
            return (
                <div class="d-flex align-items-center">
                    <strong>Loading...</strong>
                    <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                </div>
            )
        }
        return (
            <div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Enter Team Name..." value={this.state.search} 
                        onChange={this.updateSearch.bind(this)} />
                </div>
                <div className="container">
                    <div className="row">
                        {teamsList.map((team) => {
                            return <Link to={'/rosters/' + team.id} className="active item">
                                <div className="card" style={{ width: "150px", height: "250px"}}>
                                    <div className="card-body">
                                        <img alt={team.link} 
                                            src={"https://www.mlbstatic.com/team-logos/" + team.id + ".svg"} />
                                        <p className="card-text">{team.name}</p>
                                    </div>
                                </div>
                            </Link>
                        })}
                    </div>

                </div>
            </div>
        );
    }
}


export default Teams;