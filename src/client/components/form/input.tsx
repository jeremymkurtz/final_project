import React from "react";

export default function Input(props: {label?: string, id?: string, name?: string, placeholder?: string, required?: boolean, type?: string, min?: number}) {
    return (
        <input
            aria-label={props.label}
            className="bg-white border border-gray-500 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type={props.type || "text"}
            min={props.min}
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            {...(props.required && { required: true })}
        />
    );
}