import React from "react";
import "./main.css";

const ReviewComp = (props) => {
  return (
    <div className="swiper-slide slide">
      <img src={props.link} alt="" />
      <h3>{props.name}</h3>
      <div className="stars">
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star-half-alt"></i>
      </div>
      <p>{props.data}</p>
    </div>
  );
};

export default ReviewComp;
