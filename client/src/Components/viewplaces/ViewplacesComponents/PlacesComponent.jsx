import React from "react";
import Img from "./Img";
import Details from "./Details";
import Btn from "../../Btn";
import "../style.css";

function Components(props) {
  return (
    <div className="place-box1">
      <Img photo={props.photo} alt="image related to place" />
      <div className="place-details">
        <div>
        <Details price={props.price} from={props.from} to={props.to} details={props.details} rating={props.rating}/>
        </div>
        <div className="button-holder">
          <div>
              <Btn type="button" value="Book" onClick={props.onClickBook}/>
          </div>
          <div>
            <Btn type="button" value="See more" onClick={props.onClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Components;
