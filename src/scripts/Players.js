import React, { Component } from 'react';

class Players extends Component {
    /**
     * A page that represents the each of the players. Displays their stats along 
     * with any details about the players 
     * bio. Such as age, number, weight, height. 
     * 
     * @param {*} props PATHNAME - used to determine which team roster to display
     */

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            playerId: this.props.location.pathname.split("/")[2],
            player: {},
            stats: [{ stats: {} }],
            isLoading: true,
            allowed: ["caughtStealing", "gamesPlayed",
                "groundOuts", "hits", "homeRuns", "numberOfPitches",
                "runs", "stolenBasePercentage", "strikeOuts"]
        };
    }

    componentDidMount() {
        var url = "https://statsapi.mlb.com/api/v1/people/" + this.state.playerId +
            "?hydrate=stats(group=[hitting,pitching,fielding],type=[yearByYear])";

        //Use fetch to get the spreadsheet data
        fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                //Parse player details and save to object state 
                if (jsonData != null && jsonData.people != null) {
                    var temp = {
                        Name: jsonData.people[0]['fullName'],
                        Number: jsonData.people[0]['primaryNumber'],
                        Age: jsonData.people[0]['currentAge'],
                        "Birth Country": jsonData.people[0]['birthCountry'],
                        Height: jsonData.people[0]['height'],
                        Weight: jsonData.people[0]['weight'], 
                        "Debut Date": jsonData.people[0]["mlbDebutDate"]
                    };
                    this.setState({ player: temp });

                    //Parse player stats and store in state 
                    temp = [];

                    var raw = {};
                    for (var i in jsonData.people[0].stats[1].splits) {
                        raw = jsonData.people[0].stats[1].splits[i].stat;
                        var split = {
                            year: jsonData.people[0].stats[1].splits[i].season,
                        }
                        for (var item of this.state.allowed) {
                            split[item] = raw[item];
                        }
                        temp.push(split)
                    }
                    this.setState({ stats: temp });
                }
                setTimeout(() => this.setState({ isLoading: false }), 500);
            });
    }


    render() {
        var count = 0;
        return (
            <div className="Background">
                <div className="container" 
                    style={{ margin: "0px", height: "100%"}}>
                    <div className="row">
                        <img alt={this.state.player.Id}
                            src={"https://securea.mlb.com/mlb/" + 
                            "images/players/head_shot/" + this.state.playerId + 
                            ".jpg"}
                            className="playerProfile" />
                        <div className="playerDetails">
                            <table className="table">
                                <tbody>
                                    {Object.keys(this.state.player).map((key) => 
                                    {
                                        return <tr key={key}>
                                            <th>{key}</th>
                                            <td>{this.state.player[key]}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <table className="table table-dark stats">
                            <thead>
                                <tr>
                                    {Object.keys(this.state.stats[0]).map(
                                    (key) => {
                                        return <th scope="col" key={key}>
                                                {key}
                                            </th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.stats.map((key) => {
                                    count += 1; 
                                    return <tr key={count}>
                                        <th scope="row" key={key.year}>
                                            {key.year}
                                        </th>
                                        {this.state.allowed.map((item) => {
                                            return <td key={item}>
                                                {key[item]}
                                            </td>
                                        })}
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}


export default Players;