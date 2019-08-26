import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    /**
     * A static navbar to be displayed on all pages. Allows for easier navigation through all pages.
     */

    constructor() {
        super();
        this.state = {
            selected: "Home",
            items: ["Home"]
        };
    }

    render() {
        return (
            <nav className="navbar navbar-expand fixed-top navbar-dark" style={{backgroundColor: "#00003f"}}>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={"nav-item"}>
                            <Link className="nav-link" to="/">
                                Home 
                            </Link>
                        </li>
                        <li className={"nav-item"}>
                            <Link className="nav-link" to="/teams">
                               Teams 
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}


export default NavBar;