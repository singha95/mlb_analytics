import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/cards.css';
import background from "../styles/2753315.jpg";


class Rosters extends Component {


    constructor(props) {
        super(props);
        this.state = {
            search: "",
            players: [],
            teamId: this.props.location.pathname.split("/")[2],
            isLoading: true
        };
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substring(0, 20) });
    }

    componentDidMount() {
        var url = "https://statsapi.mlb.com/api/v1/teams/" + this.state.teamId + "/roster"

        //Use fetch to get the spreadsheet data
        fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                //add the jsonData to the arrays of teams and details 
                if (jsonData != null && jsonData.roster != null) {
                    for (let i = 0; i < jsonData.roster.length; i++) {
                        var temp = {
                            id: jsonData.roster[i].person['id'],
                            name: jsonData.roster[i].person['fullName'],
                            link: jsonData.roster[i].person['link']
                        };
                        this.state.players.push(temp);
                    }
                }
            });
        setTimeout(() => this.setState({ isLoading: false }), 500);
    }

    render() {
        let rosterList = this.state.players.filter(
            (player) => {
                return player.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
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
            <div className="Background" style={{position:"relative"}}>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Enter Team Name..." value={this.state.search}
                        onChange={this.updateSearch.bind(this)} />
                </div>
                <div className="container">
                    <div className="row myCards">
                        {rosterList.map((player) => {
                            return <div className="card myCard">
                                <Link to={'/player/' + player.id} className="active item">
                                    <div className="card-body">
                                        <img alt={player.id}
                                            src={"https://securea.mlb.com/mlb/images/players/head_shot/" + player.id +
                                                ".jpg"} />
                                        <p className="card-text">{player.name}</p>
                                    </div>
                                </Link>
                            </div>
                        })}
                    </div>
                </div>
            </div>

        );
    }
}


export default Rosters;