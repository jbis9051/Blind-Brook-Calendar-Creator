import React from 'react';
import './NavItem.css';
import  {Link} from "react-router-dom";

interface NavItemProps {
    text: string,
    link?: string
}

export const NavItem: React.FunctionComponent<NavItemProps> = ({text, link}) => {
    return (
        <li className={"nav-item"}>
            {link ?
                <Link to={link}>{text}</Link> :
                <span>text</span>
            }
        </li>
    );
}
