import React, {CSSProperties, MouseEvent} from 'react';
import './Button.css';

export enum ButtonColor {
    BAD= "bad",
    ALT = "alt"
}

interface ButtonProps {
    onClick?: (e: MouseEvent) => void,
    fullWidth?: boolean,
    buttonColor?: ButtonColor,
    type?: 'submit' | 'reset' | 'button',
    style?: CSSProperties
}

export const Button: React.FunctionComponent<ButtonProps> = ({onClick, fullWidth, buttonColor, type, children, style}) => {
    return (
        <button type={type} className={`button ${buttonColor || ""} ${fullWidth ? "full" : ""}`} onClick={onClick} style={style}>{children}</button>
    );
}
