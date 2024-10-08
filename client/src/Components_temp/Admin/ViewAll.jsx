import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../AxiosConfig";
import Header from "../Navbar/Header";
import "./ViewAll.css";
import Loading from "../Loading/Loading";
import { navItems } from "./NavItems";

const ViewAll = () => {
  const { id } = useParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`payment/mybookings/${id}`).then((resp) => {
      if (resp.status !== 200) {
        alert(resp.data.msg);
      } else {
        console.log(resp.data);
        console.log(id);
        setLoading(false);
        return setTours(resp.data);
      }
    });
  }, []);

  return (
    <>
      <Header user={true} navItems={navItems} />
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {tours.length === 0 ? (
              <h1>Tour List is Empty</h1>
            ) : (
              <div>
                <div className="tour-item-class">
                  <center style={{ fontSize: "30px", margin: "1%" }}>
                    Tour's of {id}
                  </center>
                  {tours
                    ? tours.map((item, key) => {
                        return (
                          <div className="tour-item-box" key={key}>
                            <div className="tour-details">
                              <table>
                                <tr style={{ fontSize: "20px" }}>
                                  <th>From</th>
                                  <th>To</th>
                                  <th>No. of Passengers</th>
                                  <th>Departure</th>
                                  <th>Arrival</th>
                                  <th>Total amount</th>
                                </tr>
                                <tr>
                                  <td>{item.from}</td>
                                  <td>{item.to}</td>
                                  <td>{item.numberOfpassengers}</td>
                                  <td>{item.fromdate}</td>
                                  <td>{item.todate}</td>
                                  <td>
                                    {item.numberOfpassengers * item.price}
                                  </td>
                                </tr>
                              </table>
                              <div style={{ marginTop: "5%" }}>
                                <h1>
                                  <center>Passenger Details</center>
                                </h1>
                                {item.passengers.map((passenger, key) => {
                                  return (
                                    <table>
                                      <tr style={{ fontSize: "20px" }}>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                      </tr>
                                      <tr>
                                        <td>{key + 1}</td>
                                        <td>{passenger.name}</td>
                                        <td>{passenger.age}</td>
                                        <td>{passenger.gender}</td>
                                      </tr>
                                    </table>
                                  );
                                })}
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
    </>
  );
};

export default ViewAll;
