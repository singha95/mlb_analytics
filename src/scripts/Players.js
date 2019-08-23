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
        var url = "https://statsapi.mlb.com/api/v1/people/" + this.state.playerId 

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
                    this.setState( {player: temp}); 
                
                }
                console.log(this.state.player);
                setTimeout(() => this.setState({ isLoading: false }), 500);
            });
    }


    render() {
        return (
            <div>
                <img alt={this.state.playerId} 
                    src={"https://securea.mlb.com/mlb/images/players/head_shot/" + this.state.playerId + ".jpg"} /> 
                This is the Players Page {this.state.playerId}
            </div>

        );
    }
}


export default Players;