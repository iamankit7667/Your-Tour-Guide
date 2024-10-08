import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const TourReviews = (props) => {
  return (
    <>
      <div className="profileTourReviews">
        <h5>
          {props.from}-{props.to}
        </h5>
        <br />
        <h3 style={{ fontSize: "18px" }}>
          Rating: {props.rating}{" "}
          <i className="bi bi-star-fill" style={{ color: "#fac102" }}></i>
        </h3>
        <p>Review: {props.review}</p>
      </div>
    </>
  );
};

export default TourReviews;
