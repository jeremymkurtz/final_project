import React from "react";
import { useNavigate } from "react-router-dom";

export default function Button(props: {
    children?: React.ReactNode,
    onClick?: () => void,
    navigateTo?: string,
    className?: string}) {
    const navigate = useNavigate();
    let tempOnClick = props.onClick;
    if (props.navigateTo) {
        const navigateTo = props.navigateTo; // Ensure navigateTo is defined
        tempOnClick = () => navigate(navigateTo);
    }
    return (
        <button
            className={props.className +" text-white text-lg font-bold py-2 px-4 rounded-lg"}
            onClick={tempOnClick}
        >
            {props.children}
        </button>
    );
}