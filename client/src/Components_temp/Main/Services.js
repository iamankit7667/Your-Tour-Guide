import React from "react";
import SericesBox from "./Box";

const Services = () => {
  return (
    <div className="section">
      <section className="services" id="services">
        <h1 className="heading">
          <span>S</span>
          <span>E</span>
          <span>R</span>
          <span>V</span>
          <span>I</span>
          <span>C</span>
          <span>E</span>
          <span>S</span>
        </h1>

        <div className="box-container">
          <SericesBox
            styleName="fa-hotel"
            place="affordable hotels"
            data="People will forget what you said, forget what you did, but people
            will never forget how you made them feel. So, it has been, and
            continues to be, our responsibility to fill the soul with the
            light and warmth of hospitality."
            btn={false}
          />

          <SericesBox
            styleName="fa-utensils"
            place="food and drinks"
            data="We have been partners with wide range of hotels whose top priority
            is to provide quality food to their customers because food is
            culture, habit, craving and identity."
            btn={false}
          />

          <SericesBox
            styleName="fa-bullhorn"
            place="safty guide"
            data="At the end of the day, the goals are safety and security. We go to
            great lengths in order to ensure the safety of our tourists."
            btn={false}
          />

          <SericesBox
            styleName="fa-globe-asia"
            place="around the world"
            data="travel faster:If you wish to travel far and fast, travel light.
            Take off all your envies, jealousies, unforgiveness, selfishness,
            fears to travel and explore the world."
            btn={false}
          />

          <SericesBox
            styleName="fa-plane"
            place="fastest travel"
            data="Travel makes one modest, you see what a tiny place you occupy in
            the world. So just travel without any regrets."
            btn={false}
          />

          <SericesBox
            styleName="fa-hiking"
            place="adventures"
            data="Only those who risk going too far can possibly find out how far
            they can go.Life is either a daring adventure or nothing at
            all..Always say yes to new adventures."
            btn={false}
          />
          <SericesBox
            styleName="fa-archway"
            place="historical tours"
            data="Historical is a place where you can enjoy the nature."
            btn={false}
          />
          <SericesBox
            styleName="fa-map-marked-alt"
            place="tours"
            data="Travel makes one modest, you see what a tiny place you occupy in
            the world. So just travel without any regrets."
            btn={false}
          />
        </div>
      </section>
    </div>
  );
};

export default Services;
