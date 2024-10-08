import React, { useState, useEffect } from "react";
import Axios from "../../AxiosConfig";
import Header from "../Navbar/Header";
import "./Feedbacks.css";
import Loading from "../Loading/Loading";
import { navItems } from "./NavItems";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("admins/feedbacks").then((resp) => {
      if (resp.status !== 200) {
        alert(resp.data.msg);
      } else {
        setLoading(false);
        console.log(resp.data);
        return setFeedbacks(resp.data);
      }
    });
  }, []);

  return (
    <>
      <Header user={true} navItems={navItems} />
      <h1>Feedbacks</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="feedbacks">
          {feedbacks &&
            feedbacks.map((feedback, index) => {
              const defaultImage = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-symbol-image-default-avatar-profile-icon-vector-social-media-user-symbol-209498286.jpg";
              const image = feedback.userDetails?.image || defaultImage; // Use default image if not available
              const name = feedback.userDetails?.username || "Ankit"; // Use "Ankit" if name is not available

              return (
                <div className="place-box1" key={index}>
                  <div className="feed-pic">
                    <img src={image} alt="User" />
                  </div>
                  <div className="place-details">
                    <h1>{name}</h1>
                    <div>
                      <p>{feedback.feedback}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Feedbacks;
