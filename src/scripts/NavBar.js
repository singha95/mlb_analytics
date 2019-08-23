import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            <nav class="navbar navbar-expand-lg fixed-top navbar-dark" style={{backgroundColor: "#00003f"}}>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class={"nav-item active"}>
                            <Link to="/">
                                <a class="nav-link" href="#Home">Home <span class="sr-only">(current)</span></a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}


export default NavBar;