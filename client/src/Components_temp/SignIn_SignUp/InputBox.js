import React, { useState } from "react";
import "./InputBox.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function InputBox(props) {
  const [passwordType, setPasswordType] = useState(props.type);
  const passwordShower = () => {
    if (passwordType === "password") setPasswordType("text");
    else setPasswordType("password");
  };

  return (
    <div className="input-box">
      <span className="left-icon">
        {props.leftIcon && <i className={props.leftIcon}></i>}
      </span>
      <input
        type={passwordType}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        autoComplete="off"
      ></input>
      <span className="right-icon">
        {props.type === "password" && (
          <i
            className={`bi bi-${
              passwordType === "password" ? "eye-slash" : "eye"
            }`}
            onClick={passwordShower}
          ></i>
        )}
      </span>
    </div>
  );
}

export default InputBox;
