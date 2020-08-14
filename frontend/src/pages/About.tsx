import React from 'react';
import './About.css';

export const About: React.FunctionComponent = () => {
    return (
        <div className={"about-wrapper"}>
            <h1 className={"about-title"}>About</h1>
            <p>Blind Brook Scheduler was created to help Blind Brook students and teacher with their schedule. BB Scheduler generates iCal files and a printable schedule in
                accordance with the letter day schedule and bell times.</p>
            <p>Blind Brook Schedule Creator is completely open source and is on GitHub: <a
                href="https://github.com/jbis9051/Blind-Brook-Calendar-Creator/">https://github.com/jbis9051/Blind-Brook-Calendar-Creator/</a>
            </p>
            <p>Blind Brook Schedule Creator was created by Josh Brown and Johnny Ramirez. It is released under
                the <a href="https://github.com/jbis9051/Blind-Brook-Calendar-Creator/blob/master/LICENSE">MIT
                    License</a>.</p>
            <p>If you encounter any issue with the website please <a
                href="https://github.com/jbis9051/Blind-Brook-Calendar-Creator/issues/new">open an issue</a> on
                GitHub or contact me directly.</p>
            <p>Josh's website is <a href="https://joshbrown.info">https://joshbrown.info</a>.</p>
        </div>
    );
}
