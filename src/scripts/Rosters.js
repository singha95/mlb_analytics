import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RosterCard from './RosterCard.js'; 
import '../styles/cards.css';
import "../styles/animate.css"; 


class Rosters extends Component {
    /**
     * A page that displays each of the players on the team. Data is fetched from: 
     * https://statsapi.mlb.com/api/v1/teams/<teamId>/roster 
     * 
     * @param {*} props PATHNAME - used to determine which team roster to display
     */

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
                <div className="d-flex align-items-center">
                    <strong>Loading...</strong>
                    <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                </div>
            )
        }
        var count = 1; 
        return (
            <div className="Background" style={{position:"relative"}}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter Player Name..." value={this.state.search}
                        onChange={this.updateSearch.bind(this)} />
                </div>
                <div className="container">
                    <div className="row myCards">
                        {rosterList.map((player) => {
                            count += 0.1;
                            console.log(count);
                            return <div key={player.id} className="card myCard" style={{animation: "slideInLeft " +  count + "s"}}>
                                <Link to={'/player/' + player.id} className="active item">
                                    <RosterCard src={"https://securea.mlb.com/mlb/images/players/head_shot/" + player.id + ".jpg"}
                                        player={player}/>
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