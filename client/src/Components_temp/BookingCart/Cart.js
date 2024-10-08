import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Navbar/Header";
import "./Cart.css";
import Axios from "../../AxiosConfig";
import Btn from "../Btn";
import Loading from "../Loading/Loading";

const Tours = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
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

  const [tours, setTours] = useState([]);
  const userL = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    Axios.get(`payment/mybookings/${userL.username}`).then((resp) => {
      setLoading(false);
      return setTours(resp.data);
    });
  }, [userL.username, setTours]);

  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    Axios.get(`users/loguser/${userL.username}`).then((resp) => {
      return setUser(resp.data);
    });
  }, []);

  return (
    <div>
      <Header user={user} navItems={navItems} />

      {loading ? (
        <Loading />
      ) : (
        <div>
          {tours.length === 0 ? (
            <h1>Your Tour List is Empty</h1>
          ) : (
            <div>
              <div className="tour-item-class">
                {tours
                  ? tours.map((item, key) => {
                      return (
                        <div className="tour-item-box" key={key}>
                          <div className="tour-box">
                            <div className="tour-parent">
                              <div className="tour-details-table">
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
                              <div className="tour-btns">
                                <Btn
                                  value="Book Now"
                                  type="button"
                                  onClick={() => {
                                    navigate(`/payment/${item.id}`);
                                  }}
                                />
                                <Btn
                                  value="Edit"
                                  type="button"
                                  onClick={() => {
                                    navigate(`/edit/${item.id}`);
                                  }}
                                />

                                <Btn
                                  value="Delete"
                                  type="button"
                                  onClick={() => {
                                    Axios
                                      .delete(`places/delete/${item.id}`)
                                      .then((resp) => {
                                        alert(resp.data.message);
                                        window.location.reload();
                                      });
                                  }}
                                />
                              </div>
                            </div>
                            <div>
                              <table className="tour-passenger-table">
                                <thead>
                                  <tr style={{ fontSize: "20px" }}>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item.passengers.map((passenger, key) => {
                                    return (
                                      <tr>
                                        <td>{key + 1}</td>
                                        <td>{passenger.name}</td>
                                        <td>{passenger.age}</td>
                                        <td>{passenger.gender}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
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
    </div>
  );
};

export default Tours;
