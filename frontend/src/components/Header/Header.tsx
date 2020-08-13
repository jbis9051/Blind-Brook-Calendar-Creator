import React from 'react';
import './Header.css';
import {NavBar} from "./NavBar/NavBar";

export const Header: React.FunctionComponent = ({}) => {
    return (
        <div className="header-container">
            <div className={"logo"}>
                <a href="/"><h1 className="site-name">BB Scheduler</h1></a>
            </div>
        <NavBar/>
        </div>
    );
}
