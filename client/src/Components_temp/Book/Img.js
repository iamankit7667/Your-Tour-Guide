import React from "react";

function Img(props) {
    return (
        <div>
            <div className="place-pic">
                <img src={props.photo} alt={props.alt} />
            </div>
        </div>
    );
}
export default Img;