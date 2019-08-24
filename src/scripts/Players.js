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
                if (jsonData != null) {
                    var temp = {
                        id: jsonData.people[0]['id'],
                        name: jsonData.people[0]['fullName'],
                        link: jsonData.people[0]['link'],
                        primaryNumber: jsonData.people[0]['primaryNumber'],
                        age: jsonData.people[0]['currentAge'],
                        birthday: jsonData.people[0]['birthDate'],
                        birthCountry: jsonData.people[0]['birthCountry'],
                        birthCity: jsonData.people[0]['birthCity']
                    };
                    this.setState({ player: temp });

                }
                console.log(this.state.player);
                setTimeout(() => this.setState({ isLoading: false }), 500);
            });
    }


    render() {
        return (
            <div style={{ backgroundColor: "rgb(169,169,169)", height:"cacl(200vh - 36px)"}}>
                <div className="container" style={{ margin: "0px", height: "100%" }}>
                    <div className="row" style={{}}>
                        <img alt={this.state.playerId}
                            src={"https://securea.mlb.com/mlb/images/players/head_shot/" + this.state.playerId + ".jpg"}
                            className="playerProfile" />
                        <div className="playerDetails">
                            This is the Players Page {this.state.playerId}
                            <table class="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
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