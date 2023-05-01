import React from "react";

function InputPer(props){
    return (
        <div >
          <label className="formulario__label" htmlFor={props.name} >{props.name}:</label>
          <input
          className="formulario__input"
            value={props.value}
            name={props.name}
            placeholder={props.name}
            type={props.type}
            onChange={props.onInputChange}
          />
        </div>
      );
}

export default InputPer

