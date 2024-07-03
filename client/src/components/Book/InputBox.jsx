import React from "react";
function InputBox(props) {
  return (
    <div className="inputBox">
      <h3>{props.display}</h3>
      <input
        type={props.type}
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        placeholder={props.holder}
        min={props.min}
        max={props.max}
        required={props.required}
      />
    </div>
  );
}
export default InputBox;
