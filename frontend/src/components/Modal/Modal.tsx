import React from 'react';
import './Modal.css';

interface ModalProps {
    onClose: () => void
}

export const Modal: React.FunctionComponent<ModalProps> = ({onClose,children}) => {
    return (
        <div onClick={onClose} className={"modal-container"}>
            <div className={"modal-wrapper"} onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
