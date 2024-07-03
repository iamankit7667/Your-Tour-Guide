import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Payment.css";
import "../Main/main.css";
import img1 from "./img/chip.png";
import img2 from "./img/visa.png";
import Header from "../Navbar/Header";
import Axios from "../../AxiosConfig";

const Payment = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    const fetchData = () => {
      Axios.get(`users/loguser/${userL.username}`).then((resp) => {
        if (resp.data) setUser(resp.data);
        else navigate("/error");
      });
      Axios.get(`payment/pay/${id}`).then((resp) => {
        setDetails(resp.data);
      });
    };
    fetchData();
  }, []);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payment_data = {
      number: number,
      name: name,
      month: month,
      year: year,
      cvv: cvv,
      username: user.username,
    };

    setNumber("");
    setName("");
    setMonth("");
    setYear("");
    setCvv("");
    Axios.post(`payment/pay/${id}`, payment_data).then((resp) => {
      if (resp.status === 200) {
        alert(resp.data.msg);
        navigate(`/index`);
      } else {
        navigate("/error");
      }
    });
  };

  function number_space() {
    var str = number;
    var length = str.length;
    var replacedStr = "";
    if (length < 12) {
      // Replace all characters with '#' except for spaces
      replacedStr = str.replace(/[^ ]/g, "#");
    } else {
      // Replace only the first 15 characters with '#' except for spaces
      var firstPart = str.substring(0, 12);
      var secondPart = str.substring(12, length);
      firstPart = firstPart.replace(/[^ ]/g, "#");
      replacedStr = firstPart + secondPart;
    }
    return replacedStr.replace(/(.{4})/g, "$1 ");
  }

  const navItems = [
    {
      title: "Home",
      path: "/index",
    },
  ];

  return (
    <>
      <Header user={user} navItems={navItems} />
      <div className="payment-container">
        {details && (
          <div className="bill-container">
            <div className="bill">
              <h1 className="head-tag">BILL</h1>
              <table className="bill-table">
                <tr>
                  <th>From</th>
                  <td>{details.placedetails.from}</td>
                </tr>
                <tr>
                  <th>To</th>
                  <td>{details.placedetails.to}</td>
                </tr>
                <tr>
                  <th>Total passengers</th>
                  <td>{details.numberOfpassengers}</td>
                </tr>
                <tr>
                  <th>Price per passenger</th>
                  <td>{details.placedetails.price}</td>
                </tr>
              </table>
              <h1 className="head-tag2">
                Price: {details.numberOfpassengers * details.placedetails.price}
              </h1>
            </div>
          </div>
        )}
        <div className="container">
          <div className="card-container">
            <div className="front">
              <div className="image">
                <img src={img1} alt="" />
                <img src={img2} alt="" />
              </div>
              <div className="card-number-box">
                {number.length === 0 ? "#### #### #### ####" : number_space()}
              </div>
              <div className="flexbox">
                <div className="box">
                  <span>card holder</span>
                  <div className="card-holder-name">
                    {name.length === 0 ? "FULL NAME" : name}
                  </div>
                </div>
                <div className="box">
                  <span>expires</span>
                  <div className="expiration">
                    <span className="exp-month" style={{ marginRight: "10px" }}>
                      {month.length === 0 ? "MM" : month}
                    </span>
                    <span className="exp-year">
                      {year.length === 0 ? "YYYY" : year}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="back">
              <div className="stripe"></div>
              <div className="box">
                <span>{cvv.length === 0 ? "cvv" : cvv}</span>
                <div className="cvv-box"></div>
                <img src={img2} alt="" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <span>card number</span>
              <input
                type="text"
                name="number"
                maxLength="16"
                className="card-number-input"
                required
                value={number}
                onChange={(x) => {
                  return setNumber(x.target.value);
                }}
              />
            </div>
            <div className="inputBox">
              <span>card holder</span>
              <input
                type="text"
                name="holder"
                className="card-holder-input"
                required
                value={name}
                onChange={(x) => {
                  return setName(x.target.value);
                }}
              />
            </div>
            <div className="flexbox">
              <div className="inputBox">
                <span>expiration month</span>
                <select
                  name="expmon"
                  className="month-input"
                  required
                  value={month}
                  onChange={(x) => {
                    return setMonth(x.target.value);
                  }}
                >
                  <option value="month" disabled>
                    month
                  </option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="inputBox">
                <span>expiration year</span>
                <select
                  name="expyear"
                  className="year-input"
                  required
                  value={year}
                  onChange={(x) => {
                    return setYear(x.target.value);
                  }}
                >
                  <option value="year" disabled>
                    year
                  </option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </div>
              <div className="inputBox">
                <span>cvv</span>
                <input
                  type="text"
                  name="cvv"
                  maxLength="4"
                  className="cvv-input"
                  required
                  value={cvv}
                  onChange={(x) => {
                    return setCvv(x.target.value);
                  }}
                  onMouseEnter={() => {
                    document.querySelector(".front").style.transform =
                      "perspective(1000px) rotateY(-180deg)";
                    document.querySelector(".back").style.transform =
                      "perspective(1000px) rotateY(0deg)";
                  }}
                  onMouseLeave={() => {
                    document.querySelector(".front").style.transform =
                      "perspective(1000px) rotateY(0deg)";
                    document.querySelector(".back").style.transform =
                      "perspective(1000px) rotateY(180deg)";
                  }}
                />
              </div>
            </div>
            <input type="submit" value="Pay" className="submit-btn" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
