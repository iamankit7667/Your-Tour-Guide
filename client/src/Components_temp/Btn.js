import React from "react";
import "./Btn.css";

function Btn(props) {
  return (
    <button className="btn" type={props.type} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
export default Btn;
