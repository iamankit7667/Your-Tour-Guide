import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import "./LoginForm.css";
import InputBox from "./InputBox";
import Btn from "../Btn";
import Axios from "../../AxiosConfig";

function ForgotPassword(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState([false, ""]);
  const [userinfo, setUserinfo] = useState({
    password1: "",
    password2: "",
  });

  const closeLoginError = () => {
    setLoginError([false, ""]);
  };

  const onUpdateField = (e) => {
    const nextFieldState = {
      ...userinfo,
      [e.target.name]: e.target.value,
    };
    setUserinfo(nextFieldState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (userinfo.password1.trim().length < 6) {
      setLoginError([true, "Password length must be greater than 6"]);
      return;
    } else if (userinfo.password1 !== userinfo.password2) {
      setLoginError([true, "Passwords do not match"]);
      return;
    }

    try {
      // Reset login error state
      setLoginError([false, ""]);

      // Send the request to update the password
      const response = await Axios.post("users/forgotpassword", {
        email: id,
        password: userinfo.password1,
      });

      if (response.status === 200) {
        // Set user data in local storage and cookies
        localStorage.setItem("user", JSON.stringify(response.data));
        Cookies.set("user", response.data.token, { expires: 1 });

        // Call the updated method and navigate
        props.updated();
        navigate("/index");
      } else {
        // Set the error message from the response
        setLoginError([true, response.data.error]);
      }
    } catch (error) {
      console.error(error);
      setLoginError([true, "An error occurred while resetting the password."]);
    }
  };

  return (
    <div>
      <div className="top-btn">
        <h2>FORGOT PASSWORD</h2>
      </div>
      <form className="loginForm" onSubmit={submitHandler}>
        {loginError[0] && (
          <div className="log-error">
            <p>{loginError[1]}</p>
            <span onClick={closeLoginError} className="close-error">
              X
            </span>
          </div>
        )}
        <InputBox
          placeholder={"password"}
          leftIcon={"bi bi-key-fill"}
          type={"password"}
          name={"password1"}
          value={userinfo.password1}
          onChange={onUpdateField}
        />
        <InputBox
          placeholder={"confirm password"}
          leftIcon={"bi bi-key-fill"}
          type={"password"}
          name={"password2"}
          value={userinfo.password2}
          onChange={onUpdateField}
        />
        <Btn type={"submit"} value={"Submit"} />
        <br />
      </form>
    </div>
  );
}

export default ForgotPassword;
