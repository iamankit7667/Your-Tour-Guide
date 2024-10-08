import React from "react";

function Img(props) {
  return (
      <div className="place-pic">
        <img src={props.photo} alt={props.alt} />
      </div>
  );
}
export default Img;
