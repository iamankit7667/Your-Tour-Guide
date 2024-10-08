import React from "react";
function Heading(props) {
  return (
    <div className="Heading">
      <h1 style={{ textAlign: "center", fontSize: "50px" }}>
        {props.category}
      </h1>
    </div>
  );
}
export default Heading;
