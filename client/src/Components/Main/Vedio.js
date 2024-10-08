import React from "react";
import "./main.css";
import vid from "./vid-1.mp4";

const Vedio = (props) => {
  
  return (
    <div className="home section" id="home">
      <div className="content">
        {props.user ? <h3>Welcome {props.user.username} !</h3> : <p></p>}
        <h3>travelling is worthwhile</h3>
        <p>discover new places with us, adventure awaits</p>
        <a href="#gallery" className="btn">
          discover more
        </a>
      </div>
      <div className="video-container">
        <video src={vid} loop autoPlay muted></video>
      </div>
    </div>
  );
};

export default Vedio;
