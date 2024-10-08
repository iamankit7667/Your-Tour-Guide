import React from "react";
import { useState, useEffect } from "react";
import "./book.css";
import Header from "../Navbar/Header";
import Axios from "../../AxiosConfig";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [placedata, setPlacedata] = useState();
  const [passengers, setPassengers] = useState([
    { name: "", gender: "Male", age: "" },
  ]);
  const [fromDate, setFromDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("threeDay");
  const [errors, setErrors] = useState([]);

  const handleAddPassenger = () => {
    if (
      passengers[passengers.length - 1].name !== "" &&
      passengers[passengers.length - 1].age !== ""
    ) {
      setPassengers([...passengers, { name: "", gender: "Male", age: "" }]);
    } else if (passengers.length >= 10) {
      alert("Maximum 10 passengers are allowed");
    } else {
      alert("Please fill the previous passenger details");
    }
  };

  const handlePassengerChange = (index, event) => {
    const { name, value } = event.target;
    const newPassengers = [...passengers];
    newPassengers[index][name] = value;
    setPassengers(newPassengers);
  };
  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    Axios.get(`users/loguser/${userL.username}`).then((resp) => {
      if (resp.data) return setUser(resp.data);
      else navigate("/error");
    });
    Axios.get(`places/placedetails/${id}`).then((resp) => {
      if (resp.status === 200) {
        setPlacedata(resp.data);
      } else {
        navigate("/error");
      }
    });
  }, [id, navigate]);

  const validatePassengers = () => {
    const errors = [];

    passengers.forEach((passenger, index) => {
      if (!passenger.name) {
        alert(`Name is required for passenger ${index + 1}`);
      }

      if (!passenger.gender) {
        alert(`Gender is required for passenger ${index + 1}`);
      }

      if (!passenger.age) {
        alert(`Age is required for passenger ${index + 1}`);
      }

      if (fromDate === "") {
        alert(`Please select a date`);
      }
    });

    setErrors(errors);

    return errors.length === 0;
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleDeletePassenger = (index) => {
    const newPassengers = [...passengers];
    newPassengers.splice(index, 1);
    setPassengers(newPassengers);
  };

  const today = new Date();
  today.setDate(today.getDate() + 2);
  const minDate = today.toISOString().split("T")[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validatePassengers();
    if (isValid) {
      const toDate = new Date(fromDate);
      if (numberOfDays === "threeDay") {
        toDate.setDate(toDate.getDate() + 3);
      } else if (numberOfDays === "fiveDay") {
        toDate.setDate(toDate.getDate() + 5);
      }
      const booking = {
        passengers: passengers,
        fromDate: fromDate,
        username: user.username,
        toDate: toDate.toISOString().slice(0, 10),
        numberOfpassengers: passengers.length,
        paymentDone: false,
      };
      Axios.post(`book/booking/${id}`, booking).then((resp) => {
        if (resp.status === 200) {
          navigate(`/payment/${resp.data}`);
        } else {
          alert(resp.data.stat)
        }
      });
    }
  };
  return (
    <div className="book">
      <Header user={user} navItems={navItems} />
      <div>
        <h1 className="heading">
          <span>B</span>
          <span>O</span>
          <span>O</span>
          <span>K</span>
          <span className="space"></span>
          <span>N</span>
          <span>O</span>
          <span>W</span>
        </h1>
      </div>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <div className="row">
        <div className="box1">
          {placedata ? (
            <div className="details">
              <h2>From: {placedata.from}</h2>
              <h2>To: {placedata.to}</h2>
              <h2>Price per person: ₹{placedata.price}</h2>
            </div>
          ) : (
            <h2>Enjoy your trip</h2>
          )}
        </div>
        <form onSubmit={handleSubmit} className="passname">
          {passengers.map((passenger, index) => (
            <div key={index}>
              <label htmlFor={`name${index}`}>Name:</label>
              <input
                type="text"
                name="name"
                id={`name${index}`}
                value={passenger.name}
                onChange={(event) => handlePassengerChange(index, event)}
              />
              <label htmlFor={`gender${index}`}>Gender:</label>
              <select
                name="gender"
                id={`gender${index}`}
                value={passenger.gender}
                onChange={(event) => handlePassengerChange(index, event)}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label htmlFor={`age${index}`}>Age:</label>
              <input
                type="number"
                name="age"
                id={`age${index}`}
                value={passenger.age}
                onChange={(event) => handlePassengerChange(index, event)}
                style={{ width: "70px" }}
              />
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => handleDeletePassenger(index)}
                >
                  {/* Delete Passenger */}
                  <i
                    className="fas fa-user-minus"
                    style={{
                      color: "red",
                      fontSize: "20px",
                      cursor: "pointer",
                      padding: "5px",
                    }}
                  ></i>
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddPassenger}>
            {/* Add Passenger */}
            <i
              className="fas fa-user-plus"
              style={{
                color: "green",
                fontSize: "20px",
                cursor: "pointer",
                padding: "5px",
              }}
            ></i>
          </button>
          <br />
          <br />
          <label>
            From Date:
            <input
              type="date"
              value={fromDate}
              min={minDate}
              onChange={handleFromDateChange}
            />
          </label>
          <br />
          <br />
          <label>Number of Days:</label>
          <select
            name="numberOfDays"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(e.target.value)}
          >
            <option value="threeDay">Three Day</option>
            <option value="fiveDay">five Day</option>
          </select>
          <br />
          <br />
          <button type="submit" className="btn">
            Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
