import React from 'react';
import './NavBar.css';
import {NavItem} from "./NavItem";

export const NavBar: React.FunctionComponent = ({}) => {
    return (
        <nav>
            <ul className="nav-bar">
                <NavItem text={"Create"} link={"/"}/>
                <NavItem text={"About"} link={"/about"}/>
            </ul>
        </nav>
    );
}
