import React from 'react';
import './Footer.css';

export const Footer: React.FunctionComponent = ({}) => {
    return (
        <footer className="footer-container">
            <span className="copyright">
                <a target="_blank" href="https://joshbrown.info">Copyright © 2020  Josh Brown</a> &amp; Johnny Ramirez
            </span>
        </footer>
    );
}
