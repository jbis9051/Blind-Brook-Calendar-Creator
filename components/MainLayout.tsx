import React from 'react';
import {NavBar} from "./NavBar/NavBar";

export const MainLayout: React.FunctionComponent = ({children}) => (
    <div className={"main-layout"}>
        <NavBar/>
        <div className={"main-layout--connect"}>
            {children}
        </div>
    </div>
);


