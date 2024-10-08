import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LoginForm.css";
import InputBox from "./InputBox";
import Btn from "../Btn";
import Axios from "../../AxiosConfig";

function Verification(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loginError, setLoginError] = useState([false, ""]);
  const closeLoginError = () => {
    setLoginError([false, "", ""]);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      email.trim().length < 1 || // eslint-disable-next-line
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setLoginError([true, "Invalid Email"]);
    }
    Axios
      .post("users/verify", { email: email, otp: otp })
      .then((res) => {
        if (res.status === 200) {
          navigate(`/${res.data.keyword}/${email}`);
        } else {
          setLoginError([true, res.data.msg]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="top-btn">
        <h2>EMAIL VERIFICATION</h2>
      </div>
      {loginError[0] && (
        <div
          className={`${
            loginError[2] === "error" ? "log-error" : "log-success"
          }`}
        >
          <p>{loginError[1]}</p>
          <span onClick={closeLoginError} className="close-error">
            X
          </span>
        </div>
      )}
      <form className="loginForm" onSubmit={submitHandler}>
        <InputBox
          placeholder={"Enter Your Email"}
          leftIcon={"bi bi-key-fill"}
          type={"text"}
          name={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Btn
          type={"button"}
          value={"Send OTP"}
          onClick={() => {
            Axios
              .post("users/generateOTP", {
                email: email,
                keyword: id,
              })
              .then((resp) => {
                if (resp.status === 200) {
                  setLoginError([true, resp.data.msg, "success"]);
                } else {
                  setLoginError([true, resp.data.msg, "error"]);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        />
        <InputBox
          placeholder={"Enter OTP"}
          leftIcon={"bi bi-person-fill"}
          type={"text"}
          name={"otp"}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Btn type={"submit"} value={"Verify"} onClick={props.closeRegister} />
      </form>
    </div>
  );
}

export default Verification;
