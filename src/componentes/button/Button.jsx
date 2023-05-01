import React from "react";

export function ButtonChild (props){
    return(
        <button
        onClick={props.onClick}
        className="btn"
        >
            {props.children}
        </button>
    )
}