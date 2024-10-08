import React from "react";

const Info = (props) => {
  return (
    <div className="info">
      <h3>Information:</h3>
      <p>{props.details}</p>
    </div>
  );
};

export default Info;
