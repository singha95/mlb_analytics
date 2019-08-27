import React, { Component } from "react";
import ReactImageAppear from 'react-image-appear';


class RosterCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      };
    }


    render() {
      return (
        <div className="card-body" style={{borderStyle: "solid", borderWidth: "2px", borderColor: "black"}}>
          <ReactImageAppear src={this.props.src} animation="fadeIn" animationDuration="0.1s" showLoader={false}/>
          <p style={{color: "black", textAlign: "center"}}className="card-text">{this.props.player.name}</p>
        </div>
      );
    }
}

export default RosterCard;