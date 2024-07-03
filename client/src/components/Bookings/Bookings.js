import React, { useState, useEffect } from "react";
import Header from "../Navbar/Header";
import "./Trans.css";
import Axios from "../../AxiosConfig";
import Loading from "../Loading/Loading";
import Btn from "../Btn";
import { useNavigate, useParams } from "react-router-dom";

const Transaction = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [trans, setTrans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [giveFeedback, setGiveFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    Axios.get(`users/loguser/${userL.username}`).then((resp) => {
      return setUser(resp.data);
    });
    Axios.get(`payment/getTransactions/${userL.username}`).then((resp) => {
      setLoading(false);
      return setTrans(resp.data);
    });
    if (id) {
      setGiveFeedback(true);
    } else {
      setGiveFeedback(false);
    }
  }, [id, update]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    const new_review = {
      bookid: id,
      username: user.username,
      rating: rating,
      review: review,
    };
    Axios
      .post("places/review", new_review)
      .then((resp) => {
        alert(resp.data.msg);
        setUpdate(!update);
        navigate("/transactions");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header user={user} navItems={navItems} />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {trans.length === 0 ? (
            <h1>Transactions are Empty</h1>
          ) : (
            <div className="">
              <div className="tour-item-class">
                {trans
                  ? trans.map((item, key) => {
                      var fromDate = new Date(item.fromdate);
                      fromDate.setDate(fromDate.getDate() - 3);
                      return (
                        <div className="tour-item-box" key={key}>
                          <div className="trans-detail-tableup">
                            <table style={{ width: "100%" }}>
                              <tr>
                                <th>From</th>
                                <td>{item.placedetails.from}</td>
                              </tr>
                              <tr>
                                <th>To</th>
                                <td>{item.placedetails.to}</td>
                              </tr>
                              <tr>
                                <th>No. of Passengers</th>
                                <td>{item.numberOfpassengers}</td>
                              </tr>
                              <tr>
                                <th>Departure</th>
                                <td>{item.fromdate}</td>
                              </tr>
                              <tr>
                                <th>Arrival</th>
                                <td>{item.todate}</td>
                              </tr>
                              <tr>
                                <th>Total amount</th>
                                <td>
                                  {item.numberOfpassengers *
                                    item.placedetails.price}
                                </td>
                              </tr>
                            </table>
                          </div>

                          <div className="trans-detail-tabledown">
                            <table style={{ width: "100%" }}>
                              <tr>
                                <th>Transaction ID:</th>
                                <th>{item.paymentDetails.bookid}</th>
                              </tr>
                              <tr>
                                <th>Name</th>
                                <th>{item.paymentDetails.name}</th>
                              </tr>
                              <tr>
                                <th>Paid through</th>
                                <th>card</th>
                              </tr>
                            </table>
                            <div className="trans-btn">
                              {new Date(item.todate) < new Date(Date.now()) ? (
                                <>
                                  {item.reviewGiven ? (
                                    <h2>Thank you for your feedback</h2>
                                  ) : (
                                    <Btn
                                      value="Feedback"
                                      onClick={() => {
                                        navigate(`/givefeedback/${item.id}`);
                                      }}
                                    />
                                  )}
                                </>
                              ) : new Date(fromDate) > new Date() ? (
                                <Btn
                                  value="Cancel"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    Axios
                                      .delete(
                                        `payment/deleteBooking/${item.id}`
                                      )
                                      .then((resp) => {
                                        alert(resp.data.msg);
                                        window.location.reload();
                                      });
                                  }}
                                />
                              ) : (
                                <h2>Enjoy trip</h2>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          )}
        </div>
      )}
      {giveFeedback && (
        <div className="trans-feedback">
          <div className="feedback-box">
            <span
              className="feed-close-btn"
              onClick={() => navigate("/transactions")}
            >
              X
            </span>
            <h1>Feedback</h1>
            <div className="feedback-form">
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label for="rating">Rating: </label>
                  <select
                    className="form-control"
                    id="rating"
                    name="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="form-group">
                  <label for="feedback">Feedback: </label>
                  <textarea
                    name="feedback"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    columns="100"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                </div>
                <Btn value="Submit" />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
