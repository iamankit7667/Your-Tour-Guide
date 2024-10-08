import React from "react";
import "./error.css";
import { Link } from "react-router-dom";
import vid1 from "./img/boy.mp4";
import vid2 from "./img/dragon.mp4";

const Error = () => {
  return (
    <div className="error">
      <h1>404 ERROR</h1>
      <div className="video-container-error">
        <video src={vid1} loop autoPlay muted className="vid1"></video>
        <video src={vid2} loop autoPlay muted className="vid2"></video>
      </div>
      <h1>
        Looks Like Landed Some Where Else{" "}
        <Link to="/" className="btn new-btn" style={{ margin: "auto" }} onClick={()=>{localStorage.removeItem("user")}}>
          GO BACK
        </Link>
      </h1>
    </div>
  );
};

export default Error;
