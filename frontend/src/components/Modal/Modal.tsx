import React from 'react';
import './Modal.css';


export const Modal: React.FunctionComponent = ({children}) => {
    return (
        <div className={"modal-container"}>
            {children}
        </div>
    );
}
