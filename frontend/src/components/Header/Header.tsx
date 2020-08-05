import React from 'react';
import './Header.css';
import {NavBar} from "./NavBar/NavBar";

export const Header: React.FunctionComponent = ({}) => {
    return (
        <div className="header-container">
            <a href="/"><h1 className="title">Blind Brook Schedule Creator</h1></a>
            <span className="year-version">2020 - 2021</span>
            <NavBar/>
        </div>
    );
}
