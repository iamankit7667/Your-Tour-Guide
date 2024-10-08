import React from "react";

function Review(props) {
  return (
    <div className="review" id="reviews">
      <div className="content">
        <img src={props.image} alt={props.alt} />
        <h5>{props.username}</h5>
        <br />
        <br />
        <p>{props.review}</p>
      </div>
    </div>
  );
}
export default Review;
