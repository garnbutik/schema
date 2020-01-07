import React from 'react';
import '../App.css';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className='navbar'>
            <div style={{display:"flex", alignItems: 'center'}}>
                <i style={{margin: '0.25rem'}} className="fas fa-calendar-day"/>
                <h1>Schema</h1>
            </div>
            <ul>
                <li>
                    <NavLink
                        to={"/"}
                        exact
                        className={'navLink-default'}
                        activeClassName={'isActiveRoute'}>
                        Start
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={"/skapa-schema"}
                        exact
                        className={'navLink-default'}
                        activeClassName={'isActiveRoute'}>
                        Skapa schema
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={"/hantera-schema"}
                        exact
                        className={'navLink-default'}
                        activeClassName={'isActiveRoute'}>
                        Hantera schema
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
};

export default NavBar;