import React from 'react';
import {NavBarItem} from "./NavBarItem";
import styles from './NavBarItem.module.css';

export const NavBar: React.FunctionComponent = () => (
    <div className={styles.navbar}>
        <div className={styles.logo}>
            <h1>BB Scheduler</h1>
            <h2>2020-2021</h2>
        </div>
        <div className={styles.navbarNavbar}>
            <NavBarItem location={"/import"} name={"Import Schedule"}/>
            <NavBarItem location={"/manual"} name={"Manually Enter Schedule"}/>
            <NavBarItem location={"/about"} name={"About"}/>
        </div>
    </div>
);
