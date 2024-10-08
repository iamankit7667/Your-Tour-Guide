import React, { useEffect } from "react";
import Axios from "../../AxiosConfig";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Navbar/Header";
import InputBox from "../Book/InputBox";
import "./Edit.css";
import Btn from "../Btn";

function Edit() {
  const id = useParams();
  const navigate = useNavigate();
  const [tours, setTours] = useState({});
  const [loading, setLoading] = useState(true);
  const [passengerDetails, setPassengerDetails] = useState([]);
  var todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + 3);
  var month = todayDate.getMonth() + 1;
  var year = todayDate.getUTCFullYear() - 0;
  var tdate = todayDate.getDate();

  if (month < 10) {
    month = "0" + month;
  }
  if (tdate < 10) {
    tdate = "0" + tdate;
  }
  var maxDate = year + "-" + month + "-" + tdate;
  useEffect(() => {
    setTours({ ...tours, passengers: passengerDetails });
  }, [passengerDetails, setPassengerDetails]);

  const [passenger, setPassenger] = useState({
    name: "",
    gender: "male",
    age: "",
  });
  const onChangeField = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  const update = (key, e) => {
    return passengerDetails.map((passenger, index) => {
      if (index === key) {
        return { ...passenger, [e.target.name]: e.target.value };
      } else {
        return passenger;
      }
    });
  };
  const SubmitHandle = (e) => {
    e.preventDefault();
    Axios
      .put(`payment/bookings/${id.id}`, {
        fromdate: tours.fromdate,
        passengers: passengerDetails,
        todate: tours.todate,
      })
      .then((resp) => {
        navigate("/mytours");
      });
  };

  useEffect(() => {
    Axios.get(`payment/bookings/${id.id}`).then((resp) => {
      setPassengerDetails(resp.data.passengers);
      setLoading(false);
      return setTours(resp.data);
    });
  }, [setTours, id.id]);
  const [user, setUser] = useState({});
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
  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    Axios.get(`users/loguser/${userL.username}`).then((resp) => {
      return setUser(resp.data);
    });
  }, []);
  return (
    <div className="main">
      <Header user={user} navItems={navItems} />
      <div className="edit-box">
        <h2>From: {tours.from}</h2>
        <h2>To: {tours.to}</h2>
        <h2>Price per person: {tours.price}</h2>
        <form onSubmit={SubmitHandle}>
          {passengerDetails.map((passenger, key) => {
            return (
              <div className="edit-input" key={key}>
                <label style={{ width: "30%" }}>Name: </label>
                <input
                  type="text"
                  name="name"
                  value={passenger.name}
                  onChange={(e) => setPassengerDetails(update(key, e))}
                  style={{ width: "80%" }}
                />
                <label name="gender" value={passenger.gender}>
                  Gender:
                  <select
                    name="gender"
                    onChange={(e) => setPassengerDetails(update(key, e))}
                  >
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </label>
                <label style={{ width: "30%" }}>Age: </label>
                <input
                  type="text"
                  name="age"
                  value={passenger.age}
                  onChange={(e) => setPassengerDetails(update(key, e))}
                  style={{ width: "30%" }}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    let regpass = tours.passengers;
                    console.log(regpass);
                    let temp = regpass;
                    console.log("first", temp);
                    temp.splice(key, 1);
                    console.log("second ", temp);
                    Axios
                      .put(`payment/updatePassengers/${tours.id}`, {
                        passengers: temp,
                      })
                      .then((resp) => {
                        if (resp.status === 200) {
                          alert(resp.data.msg);
                          // window.location.reload();
                        }
                      });
                    setPassenger({
                      name: "",
                      gender: "male",
                      age: "",
                    });
                  }}
                >
                  <i
                    className="fas fa-trash-alt"
                    style={{
                      color: "red",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                    }}
                  ></i>
                </button>
              </div>
            );
          })}

          <div className="Passengers">
            <div className="passname">
              <input
                type="text"
                placeholder="Enter name"
                name="name"
                value={passenger.name}
                onChange={onChangeField}
              />
            </div>

            <div className="box1 passname">
              <label name="gender">
                <select
                  name="gender"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setPassenger({
                      ...passenger,
                      gender: e.target.value,
                    });
                  }}
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </label>{" "}
            </div>

            <InputBox
              value={passenger.age}
              type={"number"}
              name="age"
              holder={"age"}
              min={3}
              max={70}
              onChange={onChangeField}
            />
            <button>
              <i
                className="fas fa-plus"
                onClick={(e) => {
                  let regpass = tours.passengers;
                  console.log(regpass);
                  let temp = regpass;
                  console.log("first", temp);
                  if (
                    !passenger.name ||
                    passenger.age < 3 ||
                    passenger.age > 70
                  ) {
                    alert("Please fill all the fields");
                    return;
                  }
                  console.log(passenger);
                  temp = [...temp, passenger];
                  console.log("second ", temp);
                  Axios
                    .put(`payment/updatePassengers/${tours.id}`, {
                      passengers: temp,
                    })
                    .then((resp) => {
                      if (resp.status === 200) {
                        alert("Changes will be saved");
                        window.location.reload();
                      }
                    });
                  setPassenger({
                    name: "",
                    gender: "male",
                    age: "",
                  });
                  e.preventDefault();
                }}
                style={{
                  width: "30px",
                  height: "30px",
                  marginTop: "15px",
                  cursor: "pointer",
                }}
              ></i>
            </button>
          </div>

          <InputBox
            type="Date"
            name="fromdate"
            value={tours.fromdate}
            onChange={(e) => {
              var todate = new Date(e.target.value);
              var days = 0;
              if (tours.days === "Three") {
                days = 3;
              } else if (tours.days === "Five") {
                days = 5;
              }
              todate.setDate(todate.getDate() + days);
              var todate_final =
                todate.getFullYear() +
                "-" +
                (todate.getMonth() + 1) +
                "-" +
                todate.getDate();
              if (
                new Date(e.target.value).getTime() > new Date(maxDate).getTime()
              ) {
                setTours({
                  ...tours,
                  fromdate: e.target.value,
                  todate: todate_final,
                });
              } else {
                alert("You cannot select a date from within 3 days from today");
              }
            }}
          />
          <br />
          <h2>
            Total price:{" "}
            {tours.passengers ? tours.passengers.length * tours.price : 0}
          </h2>
          <Btn type="submit" value="Update" />
        </form>
      </div>
    </div>
  );
}

export default Edit;
