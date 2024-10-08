import React from "react";
import "./main.css";
import img1 from "./img/1.jpg";
import img3 from "./img/2.jpg";
import img4 from "./img/3.jpg";
import img5 from "./img/4.jpg";
import img6 from "./img/5.jpg";
import img7 from "./img/6.jpg";
import img8 from "./img/7.jpg";
import img9 from "./img/8.jpg";
import img10 from "./img/9.jpg";
import img11 from "./img/10.jpg";
import img13 from "./img/11.jpg";
import img14 from "./img/14.jpg";

import GalleryBox from "./Box";

const Gallery = () => {
  return (
    <div className="section">
      <div className="gallery" id="gallery">
        <h1 className="heading ">
          <span>G</span>
          <span>A</span>
          <span>L</span>
          <span>L</span>
          <span>E</span>
          <span>R</span>
          <span>Y</span>
        </h1>

        <div className="box-container">
          <GalleryBox
            img={img1}
            btn={false}
            place="Goa"
            data="The coastal region known as the Konkan, in the western region of India. It is bounded with the Arabian Sea forming its western coast."
            styleName=""
          />

          <GalleryBox
            img={img3}
            btn={false}
            place="chennai"
            data="Capital of the Indian state of Tamil Nadu. Located on the Coromandel Coast off the Bay of Bengal"
            styleName=""
          />

          <GalleryBox
            img={img4}
            btn={false}
            place="Himachal pradesh"
            data="The top things to do in Himachal pradesh are Manali, Shimla,
          Mcleodganj and more..."
            styleName=""
          />

          <GalleryBox
            img={img5}
            btn={false}
            place="Gujarat"
            data="Known for its beaches on the Kathiawar Peninsula and for its mountainous region in the north, part of the Himalayas."
            styleName=""
          />

          <GalleryBox
            img={img6}
            btn={false}
            place="Kodaikanal"
            data="Kodaikanal is a hill town in the southern Indian state of Tamil
          Nadu."
            styleName=""
          />

          <GalleryBox
            img={img7}
            btn={false}
            place="Delhi"
            data="Delhi showcases an ancient culture and a rapidly modernising
          country."
            styleName=""
          />

          <GalleryBox
            img={img8}
            btn={false}
            place="Ooty"
            data="Ooty is a resort town in the Western Ghats mountains, in southern
          India's Tamil Nadu state."
            styleName=""
          />

          <GalleryBox
            img={img9}
            btn={false}
            place="kerla"
            data="Kerala is famous especially for its ecotourism initiatives and
          beautiful backwaters."
            styleName=""
          />

          <GalleryBox
            img={img10}
            btn={false}
            place="Kanyakumari"
            data="Kanyakumari is a coastal town in the state of Tamil Nadu on
          India's southern tip."
            styleName=""
          />

          <GalleryBox
            img={img11}
            btn={false}
            place="Araku Valley"
            data="Araku Valley is a hill station and valley region in the
          southeastern Indian state of Andhra Pradesh."
            styleName=""
          />

          <GalleryBox
            img={img13}
            btn={false}
            place="Agra"
            data="One of the seven wonders of the world, Taj Mahal is located on the
          banks of River Yamuna in Agra..."
            styleName=""
          />

          <GalleryBox
            img={img14}
            btn={false}
            place="Mumbai"
            data="Mumbai is a densely populated city on India's west coast."
            styleName=""
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
