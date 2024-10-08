import React from "react";
import "./main.css";
import { useNavigate } from "react-router-dom";
import beach from "./img/beach.jpg";
import island from "./img/island.jpg";
import hillstation from "./img/hillStation.jpg";
import forest from "./img/forest.jpg";
import winter from "./img/winter.jpg";
import cultural from "./img/cultural.jpg";
import desert from "./img/Desert.jpg";
import countryside from "./img/countryside.jpg";

import PlacesBox from "./Box";

const Places = () => {
  const navigate = useNavigate();
  return (
    <div className="section">
      <div className="places" id="places">
        <h1 className="heading">
          <span>P</span>
          <span>L</span>
          <span>A</span>
          <span>C</span>
          <span>E</span>
          <span>S</span>
        </h1>

        <button onClick={() => navigate("/places/all")} className="btn"
        style={{ margin: "auto", display: "block", marginBottom: "2rem"}}
        >
          All Places
        </button>

        <div className="box-container">
          <PlacesBox
            img={beach}
            btn={true}
            link="/places/beach"
            place="Beach"
            data="Beach areas are popular types of tourist destinations. Some
            people travel a long way to reach a beach"
            styleName=""
          />

          <PlacesBox
            img={island}
            btn={true}
            link="/places/island"
            place="Islands"
            data="Islands are land masses that are surrounded by water. They are
            separated form the mainland."
            styleName=""
          />

          <PlacesBox
            img={hillstation}
            btn={true}
            link="/places/hillstation"
            place="Hill Stations"
            data="There are many different activities that you can do in the
            mountains, such as hiking, skiing, horse riding, and more."
            styleName=""
          />

          <PlacesBox
            img={forest}
            btn={true}
            link="/places/forest"
            place="Forest"
            data="There are forests all over the world, although the flora and
            fauna differs according to the geographical location."
            styleName=""
          />

          <PlacesBox
            img={winter}
            btn={true}
            link="/places/winter"
            place="Winter"
            data="People travel to destinations with winter conditions for a range
            of winter sport activities."
            styleName=""
          />

          <PlacesBox
            img={cultural}
            btn={true}
            link="/places/cultural"
            place="Cultural"
            data="A type of tourism activity in which the visitor's essential
            motivation is to learn, discover, experience."
            styleName=""
          />

          <PlacesBox
            img={desert}
            btn={true}
            link="/places/desert"
            place="Desert"
            data="Desert is an undulating sand plain covered with sand dunes."
            styleName=""
          />

          <PlacesBox
            img={countryside}
            btn={true}
            link="/places/countryside"
            place="Countryside"
            data="A visit to countryside is a unique and wonderful experience."
            styleName=""
          />
        </div>
      </div>
    </div>
  );
};

export default Places;
