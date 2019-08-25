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
                        Id: jsonData.people[0]['id'],
                        Name: jsonData.people[0]['fullName'],
                        Number: jsonData.people[0]['primaryNumber'],
                        Age: jsonData.people[0]['currentAge'],
                        "Birth Country": jsonData.people[0]['birthCountry'],
                        Height: jsonData.people[0]['height'],
                        Weight: jsonData.people[0]['weight']
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
                            <table className="table">
                                <tbody>
                                    {Object.keys(this.state.player).map((key) => {
                                        return <tr key={key}>
                                            <th>{key}</th>
                                            <td>{this.state.player[key]}</td>
                                        </tr>
                                    })}
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