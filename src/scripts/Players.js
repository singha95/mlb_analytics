import React, { Component } from 'react';


class Players extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            playerId: this.props.location.pathname.split("/")[2],
            player: {}
        };
    }

    componentDidMount() {
        var url = "https://statsapi.mlb.com/api/v1/people/" + this.state.playerId +
            "?hydrate=stats(group=[hitting,pitching,fielding],type=[yearByYear])";

        //Use fetch to get the spreadsheet data
        fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                //add the jsonData to the arrays of teams and details 
                if (jsonData != null && jsonData.people != null) {
                    var temp = {
                        id: jsonData.people[0]['id'],
                        name: jsonData.people[0]['fullName'],
                        link: jsonData.people[0]['link'],
                        primaryNumber: jsonData.people[0]['primaryNumber'],
                        age: jsonData.people[0]['currentAge'],
                        birthday: jsonData.people[0]['birthDate'],
                        birthCountry: jsonData.people[0]['birthCountry'],
                        birthCity: jsonData.people[0]['birthCity'],
                        height : jsonData.people[0]['height'],
                        weight : jsonData.people[0]['weight']
                    };
                    this.setState({ player: temp });
                }
                console.log(this.state.player);
                setTimeout(() => this.setState({ isLoading: false }), 500);
            });
    }


    render() {
        return (
            <div style={{ backgroundColor: "white", height: "100%", minHeight: "100vh" }}>
                <div className="container" style={{ margin: "0px", height: "100%" }}>
                    <div className="row" style={{}}>
                        <img alt={this.state.playerId}
                            src={"https://securea.mlb.com/mlb/images/players/head_shot/" + this.state.playerId + ".jpg"}
                            className="playerProfile" />
                        <div className="playerDetails">
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <td>{this.state.playerId}</td>
                                    </tr>
                                    <tr>
                                        <th>Full Name</th>
                                        <td>{this.state.player.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Number</th>
                                        <td>{this.state.player.primaryNumber}</td>
                                    </tr>
                                    <tr>
                                        <th>Age</th>
                                        <td>{this.state.player.age}</td>
                                    </tr>
                                    <tr>
                                        <th>Origin</th>
                                        <td>{this.state.player.birthCountry}</td>
                                    </tr>
                                    <tr>
                                        <th>Height</th>
                                        <td>{this.state.player.height}</td>
                                    </tr>
                                    <tr>
                                        <th>Weight</th>
                                        <td>{this.state.player.weight}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>

        );
    }
}


export default Players;