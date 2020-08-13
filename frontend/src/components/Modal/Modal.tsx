import React from 'react';
import './Modal.css';

interface ModalProps {
    onClose: () => void
}

export const Modal: React.FunctionComponent<ModalProps> = ({onClose,children}) => {
    return (
        <div onClick={onClose} className={"modal-container"}>
            <div onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
