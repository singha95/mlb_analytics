import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ViewRecipes extends Component {
    /**
     * A Class to view all avaliable recipes. Users can select one of the 
     * recipes to view the ingredients and the steps required. 
     */

    constructor() {
        super();
        this.state = {
            search: ""
        };
    }


    render() {
        return (
            <div className="MainPage">
                <img alt="logo" src="https://www.mlbstatic.com/team-logos/141.svg"/> 

                <div class="row Selection">
                    <div class="col-4">
                        <div class="list-group" id="list-tab" role="tablist" style={{width: '350%'}}>
                            <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Home</a>
                            <Link to='/teams'>
                                <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="teams">Teams</a>
                            </Link>
                            <Link to='/rosters'>
                                <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="rosters">Rosters</a>
                            </Link>
                            <Link to='/players'>
                            <   a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="players">Players</a>
                            </Link>
                        </div>
                    </div>
                    {/* <div class="col-8">
                        <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
                        <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
                        <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                        <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}


export default ViewRecipes;