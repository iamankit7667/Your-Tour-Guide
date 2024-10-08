import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
function Details(props) {
  return (
    <div className="detail">
      <h2>
        {props.from} - {props.to}
      </h2>
      <h2>₹{props.price} per person</h2>
      {props.rating ? (
        <h3 style={{ fontSize: "20px" }}>
          {props.rating}{" "}
          <i className="bi bi-star-fill" style={{ color: "#fac102" }}></i>
        </h3>
      ) : 
      (
        <h3 style={{ fontSize: "20px" }}>
          No Reviews Yet
        </h3>
      )}
      <p>{props.details}</p>
    </div>
  );
}
export default Details;
