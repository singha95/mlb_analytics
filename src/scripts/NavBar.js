import React, { Component } from 'react';

class NavBar extends Component {

    constructor() {
        super();
        this.state = {
            selected: "Home",
            items: ["Home"]
        };
    }

    render() {
        return (
            <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class={"nav-item active"}>
                            <a class="nav-link" href="#Home">Home <span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}


export default NavBar;