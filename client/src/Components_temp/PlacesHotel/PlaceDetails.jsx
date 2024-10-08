import React, { useState, useEffect } from "react";
import Axios from "../../AxiosConfig";
import "./style.css";
import "./Itenary.css";
import Cookies from "js-cookie";

import Img from "../viewplaces/ViewplacesComponents/Img";
import Place from "../viewplaces/ViewplacesComponents/Details";
import Info from "./Info";
import Review from "./Review";
import Header from "../Navbar/Header";
import Btn from "../Btn";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

const navItems = [
  {
    title: "Home",
    path: "/index",
  },
  {
    title: "Gallery",
    path: "/index/#gallery",
  },
  {
    title: "Places",
    path: "/places/all",
  },
  {
    title: "Services",
    path: "/index/#services",
  },
];
function App(props) {
  const navigate = useNavigate();
  const [days, setDays] = useState("threeDay");
  const [user, setUser] = useState(null);
  const [placedata, setPlacedata] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    if (userL) {
      Axios.get(`users/loguser/${userL.username}`).then((resp) => {
        return setUser(resp.data);
      });
    }
    Axios.get(`places/placedetails/${id}`).then((resp) => {
      if (resp.status === 200) {
        setPlacedata(resp.data);
        setLoading(true);
      } else {
        navigate("/error");
      }
    });
  }, [id, navigate]);
  const bookFunc = () => {
    if (Cookies.get("user") && user) {
      Axios.get(`book/booking/${id}`).then((resp) => {
        if (resp.status === 200) {
          navigate(`/book/${id}`);
        } else {
          navigate("/error");
        }
      });
    } else {
      var date = new Date();
      date.setTime(date.getTime() + 60 * 1000);
      Cookies.set("redirect", `/book/${id}`, { expires: date });
      navigate("/login");
    }
  };

  const [day1Visible, setDay1Visible] = useState(false);
  const [day2Visible, setDay2Visible] = useState(false);
  const [day3Visible, setDay3Visible] = useState(false);
  const [day4Visible, setDay4Visible] = useState(false);
  const [day5Visible, setDay5Visible] = useState(false);

  const toggleDay1Visibility = () => {
    setDay1Visible(!day1Visible);
  };

  const toggleDay2Visibility = () => {
    setDay2Visible(!day2Visible);
  };

  const toggleDay3Visibility = () => {
    setDay3Visible(!day3Visible);
  };

  const toggleDay4Visibility = () => {
    setDay4Visible(!day4Visible);
  };

  const toggleDay5Visibility = () => {
    setDay5Visible(!day5Visible);
  };

  return (
    <div>
      <Header
        user={user}
        navItems={navItems}
        openLoginForm={props.openLoginForm}
      />
      {loading ? (
        <div>
          {placedata && (
            <div className="single-place-details">
              <div className="place-box">
                <div className="heading">
                  <Img photo={placedata.photo} />
                  <div className="details">
                    <div className="content">
                      <Place
                        from={placedata.from}
                        to={placedata.to}
                        details={placedata.status}
                        price={placedata.price}
                        rating={placedata.rating}
                      />
                    </div>
                    {/* <Btn type="button" onClick={bookFunc} value="Book" /> */}
                  </div>
                </div>
                <Info details={placedata.details} />

                <h1>Itinerary</h1>
                <div>
                  <button
                    className="btn1"
                    onClick={() => {
                      setDays("threeDay");
                    }}
                  >
                    3-day
                  </button>
                  <button
                    className="btn1"
                    onClick={() => {
                      setDays("fiveDay");
                    }}
                  >
                    5-day
                  </button>
                </div>
                {days === "threeDay" && (
                  <div className="itinerary-container">
                    <div className="day-container">
                      <h3 onClick={toggleDay1Visibility}>Day 1</h3>
                      {day1Visible && (
                        <ul>
                          <li>{placedata.threeDay.day1}</li>
                        </ul>
                      )}
                    </div>
                    <div className="day-container">
                      <h3 onClick={toggleDay2Visibility}>Day 2</h3>
                      {day2Visible && (
                        <ul>
                          <li>{placedata.threeDay.day2}</li>
                        </ul>
                      )}
                    </div>
                    <div className="day-container">
                      <h3 onClick={toggleDay3Visibility}>Day 3</h3>
                      {day3Visible && (
                        <ul>
                          <li>{placedata.threeDay.day3}</li>
                        </ul>
                      )}
                    </div>
                    <Btn type="button" onClick={bookFunc} value="Book" />
                  </div>
                )}
                {days === "fiveDay" && (
                  <div className="itinerary-container">
                    <div className="day-container">
                      <h3 onClick={toggleDay1Visibility}>Day 1</h3>
                      {day1Visible && (
                        <ul>
                          <li>{placedata.fiveDay.day1}</li>
                        </ul>
                      )}
                    </div>
                    <div className="day-container">
                      <h3 onClick={toggleDay2Visibility}>Day 2</h3>
                      {day2Visible && (
                        <ul>
                          <li>{placedata.fiveDay.day2}</li>
                        </ul>
                      )}
                    </div>
                    <div className="day-container">
                      <h3 onClick={toggleDay3Visibility}>Day 3</h3>
                      {day3Visible && (
                        <ul>
                          <li>{placedata.fiveDay.day3}</li>
                        </ul>
                      )}
                    </div>
                    <div className="day-container">
                      <h3 onClick={toggleDay4Visibility}>Day 4</h3>
                      {day4Visible && (
                        <ul>
                          <li>{placedata.fiveDay.day4}</li>
                        </ul>
                      )}
                    </div>
                    <div className="day-container">
                      <h3 onClick={toggleDay5Visibility}>Day 5</h3>
                      {day5Visible && (
                        <ul>
                          <li>{placedata.fiveDay.day5}</li>
                        </ul>
                      )}
                    </div>
                    <Btn type="button" onClick={bookFunc} value="Book" />
                  </div>
                )}

                {placedata.reviews.length !== 0 ? (
                  <>
                    <hr
                      style={{
                        width: "95%",
                        height: "5px",
                        backgroundColor: "gray",
                        marginLeft: "2%",
                      }}
                    />
                    <h3 style={{ fontSize: "25px", marginLeft: "30px" }}>
                      Reviews:
                    </h3>
                    {placedata.reviews.map((review, index) => {
                      return (
                        <Review
                          key={index}
                          image={
                            // "profileImgs/" +
                            review.user.image
                          }
                          username={review.user.username}
                          review={review.review}
                        />
                      );
                    })}
                  </>
                ) : (
                  <h1>No reviews yet</h1>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
