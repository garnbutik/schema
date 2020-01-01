import React from 'react';
import '../App.css';
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className='navbar'>
            <h1>Schema</h1>
            <ul>
                <li>
                    <Link to={"/"}>Start</Link>
                </li>
                <li>
                    <Link to={"/skapa-schema"}>Skapa schema</Link>
                </li>
                <li>
                    <Link to={"/hantera-schema"}>Hantera schema</Link>
                </li>
            </ul>
        </nav>
    )
};

export default NavBar;