import React from 'react';
import './Layout.css';
import {Header} from "./Header/Header";
import {Footer} from "./Footer";

export const Layout: React.FunctionComponent = ({children}) => {
    return (
        <>
            <Header/>
            <div className={"content-container"}>
                {children}
            </div>
            <Footer/>
        </>
    );
}
