import React from 'react';
import Link from 'next/Link'
import styles from './NavBar.module.css'

interface NavBarItemProps {
    location: string,
    name: string
}

export const NavBarItem: React.FunctionComponent<NavBarItemProps> = ({location, name}) => (
    <Link href={location}>
        <span className={styles.navBarItem}>{name}</span>
    </Link>
)


