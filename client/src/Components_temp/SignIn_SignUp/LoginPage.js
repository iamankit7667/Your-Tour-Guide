import React from "react";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import VerificationForm from "./Verification";
import ForgotPasswordForm from "./ForgotPassword";

function LoginPage(props) {
  const navigate = useNavigate()
  return (
    <div className="modal">
      <div className="login-container">
        <div className="total-form-container">
          <div className="login-form-close">
            <span
              className="login-form-close-btn"
              onClick={() => {
                navigate("/index")
              }}
            >
              X
            </span>
          </div>
          <>
            {props.formType === "login" && <LoginForm updated={props.updated}/>}
            {props.formType === "register" && <RegisterForm updated={props.updated}/>}
            {props.formType === "verify" && <VerificationForm />}
            {props.formType === "forgot" && <ForgotPasswordForm updated={props.updated}/>}
          </>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
