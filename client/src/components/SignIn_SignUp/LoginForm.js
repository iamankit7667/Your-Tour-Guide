import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./LoginForm.css";
import InputBox from "./InputBox";
import Btn from "../Btn";
import Axios from "../../AxiosConfig";

function Form(props) {
  const [loginError, setLoginError] = useState([false, ""]);
  const [userinfo, setUserinfo] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();

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

  const submitHandler = (e) => {
    e.preventDefault();
    if (/\s/.test(userinfo.username || userinfo.username.trim().length < 1)) {
      setLoginError([true, "Invalid username"]);
    } else if (userinfo.password.trim().length < 6) {
      setLoginError([true, "Invalid password"]);
    } else {
      setLoginError([false, ""]);
      Axios.post("users/login", userinfo).then((resp) => {
        if (resp.status === 200) {
          localStorage.setItem("user", JSON.stringify(resp.data.user));
          Cookies.set("user", resp.data.token, { expires: 1 });
          if (
            resp.data.user.role === "admin" ||
            resp.data.user.role === "root"
          ) {
            navigate("/admin");
          } else {
            if (Cookies.get("redirectLink")) {
              navigate(Cookies.get("redirectLink"));
            } else {
              props.updated();
              navigate("/index");
            }
          }
        } else {
          setLoginError([true, resp.data.error]);
        }
      });
    }
  };

  return (
    <div className="login-form-container">
      <div className="top-btn">
        <h2>SIGN IN</h2>
      </div>
      {loginError[0] && (
        <div className="log-error">
          <p>{loginError[1]}</p>
          <span onClick={closeLoginError} className="close-error">
            X
          </span>
        </div>
      )}
      <form className="loginForm" onSubmit={submitHandler}>
        <InputBox
          placeholder={"username"}
          leftIcon={"bi bi-person-fill"}
          type={"text"}
          name={"username"}
          value={userinfo.username}
          onChange={onUpdateField}
        />
        <InputBox
          placeholder={"password"}
          leftIcon={"bi bi-key-fill"}
          type={"password"}
          name={"password"}
          value={userinfo.password}
          onChange={onUpdateField}
        />
        <Btn type={"submit"} value={"Sign In"} />
        <br></br>
        <h2
          onClick={() => {
            navigate("/verification/forgotpassword");
          }}
        >
          Forgot Password?
        </h2>
        <p>Don't have an account?</p>
        <Btn
          type={"button"}
          value={"Sign Up"}
          onClick={() => {
            navigate("/verification/registration");
          }}
        />
        <br></br>
        <p>contact : packyourbagsofficial@gmail.com</p>
      </form>
    </div>
  );
}

export default Form;
