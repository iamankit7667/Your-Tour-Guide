import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../AxiosConfig";

import Header from "../Navbar/Header";
import "./clientprofile.css";
import Tabledata from "./Tabledata";
import Edityourprofile from "./Edityourprofile";
import ChangePassword from "./ChangePassword";
import Review from "./TourReviews";

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
function Profile(props) {
  const hiddenFileInput = useRef(null);

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [pass, setPass] = useState(false);
  const [feededit, setFeededit] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    Axios.get(`profile/profileDetails/${userL.username}`).then(async (resp) => {
      localStorage.setItem("user", JSON.stringify(resp.data));
      if (resp.data) return setUser(resp.data);
      else navigate("/error");
    });
    setEdit(false);
  }, [updated, setEdit]);

  const update = () => {
    setUpdated(!updated);
  };

  const profileHandler = async (e) => {
    if (e.target.files[0]) {
      const fd = new FormData();
      fd.append("image", e.target.files[0], e.target.files[0].name);
      fd.append("email", user.email);
      await Axios.post("profile/upload", fd).then((resp) => {
        if (resp.status === 200) {
          update();
          alert(resp.data.succ);
        } else {
          navigate("/error");
        }
      });
    }
  };
  const imgDeleteHandler = async () => {
    const fd = {
      email: user.email,
    };
    await Axios.post("profile/remove", fd).then((resp) => {
      if (resp.status === 200) {
        update();
        alert(resp.data.succ);
      } else {
        navigate("/error");
      }
    });
  };

  const changeFeedback = async (e) => {
    alert(feedback);
    const fd = {
      id: user.givenfeedback._id,
      username: user.username,
      feedback: feedback,
    };
    await Axios.post("profile/feedback", fd).then((resp) => {
      if (resp.status === 200) {
        update();
        alert(resp.data.succ);
      } else {
        navigate("/error");
      }
    });
  };

  const deleteFeedback = async () => {
    await Axios
      .delete(`profile/deletefeedback/${user.givenfeedback._id}`)
      .then((resp) => {
        if (resp.status === 200) {
          update();
          alert(resp.data.succ);
        } else {
          navigate("/error");
        }
      });
  };

  return (
    <div>
      <Header user={user} navItems={navItems} />
      <div className="profile-background">
        <div className="white-panel">
          <div className="user-details">
            <h1 className="h1">Profile</h1>
            <hr style={{ height: "1px", backgroundColor: "black" }} />
            <div className="profile">
              <div className="_left">
                <div className="_img">
                  <img src={user.image} alt="profile_img" />
                  <div className="img_content">
                    <i
                      className="bi bi-upload fa-3x"
                      onClick={() => hiddenFileInput.current.click()}
                    ></i>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={hiddenFileInput}
                      name="image"
                      onChange={profileHandler}
                    ></input>
                    {user.imagegiven && (
                      <i
                        className="bi bi-trash fa-3x"
                        onClick={imgDeleteHandler}
                      ></i>
                    )}
                  </div>
                </div>
              </div>
              <div className="_right">
                {edit ? (
                  <div className="edit-form">
                    <h2>edit your profile</h2>
                    <Edityourprofile username="User" updated={update} />
                    <span onClick={() => setEdit(false)}>x</span>
                  </div>
                ) : (
                  <table>
                    <Tabledata heading={"Username:"} data={user.username} />
                    <Tabledata heading={"Name:"} data={user.name} />
                    <Tabledata heading={"Email:"} data={user.email} />
                    <Tabledata heading={"Gender:"} data={user.gender} />
                    <Tabledata
                      heading={"Phone Number:"}
                      data={user.phonenumber}
                    />
                  </table>
                )}
                <div className="btns">
                  {!edit && (
                    <button
                      className="btn_profile"
                      onClick={() => setEdit(true)}
                    >
                      edit profile
                    </button>
                  )}
                  <button
                    className="btn_profile"
                    onClick={() => {
                      Axios
                        .post("users/generateOTP", {
                          email: user.email,
                          keyword: "change password",
                        })
                        .then((resp) => {
                          if (resp.status === 200) {
                            alert(resp.data.msg);
                            setPass(true);
                          } else {
                            alert("something went wrong");
                            navigate("/error");
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    change password
                  </button>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-down">
        <hr style={{ height: "5px", backgroundColor: "black" }} />
        <div className="user-feedback">
          <h2>
            {user.givenfeedback ? (
              <div className="">
                <div className="profile-feed">
                  <h3>Feedback</h3>
                  {user.givenfeedback.feedback}
                </div>
                <br />
                {feededit ? (
                  <i
                    className="bi bi-x-square fa-2x"
                    style={{ cursor: "pointer" }}
                    onClick={() => setFeededit(false)}
                  ></i>
                ) : (
                  <i
                    style={{ cursor: "pointer", color: "green" }}
                    className="bi bi-pencil-square fa-2x"
                    onClick={() => setFeededit(true)}
                  ></i>
                )}
                {user.givenfeedback && (
                  <i
                    className="bi bi-trash fa-2x"
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={deleteFeedback}
                  ></i>
                )}
                {feededit && (
                  <div className="feedback">
                    <textarea
                      name="feedback"
                      id="feedback"
                      cols="30"
                      rows="5"
                      placeholder="Your feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    ></textarea>
                    <br />
                    <button className="btn_profile" onClick={changeFeedback}>
                      submit
                    </button>
                  </div>
                )}
              </div>
            ) : (
              "Your submitted feedback will appear here."
            )}
          </h2>
        </div>
        <hr style={{ height: "5px", backgroundColor: "black" }} />

        {user.username && user.tourReviews.length !== 0 ? (
          <>
            {user.tourReviews.map((review, index) => {
              return (
                <Review
                  key={index}
                  from={review.place.from}
                  to={review.place.to}
                  rating={review.rating}
                  review={review.review}
                />
              );
            })}
          </>
        ) : (
          <h1>No reviews yet</h1>
        )}
        <hr style={{ height: "5px", backgroundColor: "black" }} />

        <div>
          {pass && (
            <div className="pass-modal-bg">
              <div className="edit-form">
                <h2>Change your password</h2>
                <ChangePassword
                  onClick={() => {
                    setPass(false);
                  }}
                />
                <span onClick={() => setPass(false)}>x</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
