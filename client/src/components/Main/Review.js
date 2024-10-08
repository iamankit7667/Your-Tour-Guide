import React, { useState, useEffect } from "react";
import Axios from "../../AxiosConfig";
import { useNavigate } from "react-router-dom";
import ReviewComp from "./ReviewComp";
import { Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

import "swiper/css";

const Review = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    Axios.get("index/fd").then((resp) => {
      if (resp.status === 200) {
        return setFeedback(resp.data);
      } else {
        navigate("/error");
      }
    });
  }, []);
  SwiperCore.use([Autoplay]);
  return (
    <div className="section">
      <div className="review" id="review">
        <h1 className="heading">
          <span>R</span>
          <span>E</span>
          <span>V</span>
          <span>I</span>
          <span>E</span>
          <span>W</span>
        </h1>

        <Swiper
          autoplay={{ delay: 3000 }}
          className="review-slider"
          style={{ height: "55%" }}
          modules={[Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
        >
          {feedback &&
            feedback.map((item, key) => {
              return (
                <SwiperSlide key={key}>
                  <ReviewComp
                    link={item.userDetails.image}
                    name={item.userDetails.username}
                    data={item.feedback}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default Review;
