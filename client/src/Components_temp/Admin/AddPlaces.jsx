import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Navbar/Header";
import Btn from "../Btn";
import Axios from "../../AxiosConfig";
import "./AddPlaces.css";
import { navItems } from "./NavItems";

function AddPlaces(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [btnValue, setBtnValue] = useState("Add");
  const navigate = useNavigate();
  const { id } = useParams();

  const [image, setImage] = useState();
  const [placeinfo, setplaceinfo] = useState({
    from: "",
    to: "",
    price: 0,
    details: "",
    category: "",
    threeDay: {
      day1: "",
      day2: "",
      day3: "",
    },
    fiveDay: {
      day1: "",
      day2: "",
      day3: "",
      day4: "",
      day5: "",
    },
  });

  useEffect(() => {
    if (props.keyType === "edit") {
      Axios.get(`admins/place/${id}`).then((resp) => {
        if (resp.status !== 200) {
          alert(resp.data.msg);
        } else {
          const pl = {
            from: resp.data.from,
            to: resp.data.to,
            price: resp.data.price,
            details: resp.data.details,
            category: resp.data.category,
            threeDay: resp.data.threeDay,
            fiveDay: resp.data.fiveDay,
          };
          setBtnValue("Update");
          setplaceinfo(pl);
        }
      });
    }
  }, []);

  const onUpdateField = (e) => {
    const nextFieldState = {
      ...placeinfo,
      [e.target.name]: e.target.value,
    };
    setplaceinfo(nextFieldState);
  };

  const onUpdateField2 = (e) => {
    const nextFieldState1 = {
      ...placeinfo.threeDay,
      [e.target.name]: e.target.value,
    };
    const nextFieldState = {
      ...placeinfo,
      threeDay: nextFieldState1,
    };
    setplaceinfo(nextFieldState);
  };

  const onUpdateField3 = (e) => {
    const nextFieldState1 = {
      ...placeinfo.fiveDay,
      [e.target.name]: e.target.value,
    };
    const nextFieldState = {
      ...placeinfo,
      fiveDay: nextFieldState1,
    };
    setplaceinfo(nextFieldState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("id", new Date().valueOf() + Math.floor(Math.random() * 10));
    fd.append("from", placeinfo.from);
    fd.append("to", placeinfo.to);
    fd.append("details", placeinfo.details);
    fd.append("category", placeinfo.category);
    fd.append("price", placeinfo.price);
    fd.append("photo", image);
    fd.append("threeDay", JSON.stringify(placeinfo.threeDay));
    fd.append("fiveDay", JSON.stringify(placeinfo.fiveDay));
    Axios
      .post(`admins/place/${user.username}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((resp) => {
        if (resp.status === 200) {
          setplaceinfo({
            from: "",
            to: "",
            price: 0,
            details: "",
            category: "",
            threeDay: {
              day1: "",
              day2: "",
              day3: "",
            },
            fiveDay: {
              day1: "",
              day2: "",
              day3: "",
              day4: "",
              day5: "",
            },
          });
          setImage();
          alert(resp.data.success);
        } else {
          navigate("/error");
        }
      });
  };
  return (
    <div>
      <Header user={true} navItems={navItems} />
      <h1>Add place</h1>
      <div className="add">
        <form
          onSubmit={submitHandler}
          className="addadmin"
          style={{ height: "650px", width: "600px" }}
        >
          <label htmlFor="from">
            From:
            <input
              placeholder={"from"}
              leftIcon={"bi bi-geo-alt-fill"}
              type={"text"}
              name={"from"}
              value={placeinfo.from}
              onChange={onUpdateField}
            />
          </label>

          <label htmlFor="to" style={{ marginLeft: "30%" }}>
            To:
            <input
              placeholder={"to"}
              leftIcon={"bi bi-geo-alt-fill"}
              type={"text"}
              name={"to"}
              value={placeinfo.to}
              onChange={onUpdateField}
            />
          </label>
          <label htmlFor="price">
            {" "}
            Price:
            <input
              placeholder={"price"}
              leftIcon={"bi bi-cash"}
              type={"number"}
              name={"price"}
              value={placeinfo.price}
              onChange={onUpdateField}
            />
          </label>

          <label htmlFor="details" style={{ marginLeft: "30%" }}>
            Details:
            <input
              placeholder={"details"}
              leftIcon={"bi bi-card-text"}
              type={"text"}
              name={"details"}
              value={placeinfo.details}
              onChange={onUpdateField}
            />
          </label>

          <label htmlFor="category">
            {" "}
            Category:
            <select
              name="category"
              value={placeinfo.category}
              onChange={onUpdateField}
            >
              <option value="">select</option>
              <option value="beach">beach</option>
              <option value="island">island</option>
              <option value="hillstation">hillstation</option>
              <option value="forest">forest</option>
              <option value="winter">winter</option>
              <option value="cultural">cultural</option>
              <option value="piligrimage">Piligrimage</option>
              <option value="countryside">countryside</option>
            </select>
          </label>

          <br />

          <h2>Three day</h2>
          <br />
          <label htmlFor="day1">Day1: </label>
          <input
            placeholder={"Day1"}
            leftIcon={"bi bi-card-text"}
            type={"text"}
            name={"day1"}
            value={placeinfo.threeDay.day1}
            onChange={onUpdateField2}
          />
          <label htmlFor="day2">Day2: </label>
          <input
            placeholder={"Day2"}
            leftIcon={"bi bi-card-text"}
            type={"text"}
            name={"day2"}
            value={placeinfo.threeDay.day2}
            onChange={onUpdateField2}
          />
          <label htmlFor="day3">Day3: </label>
          <input
            placeholder={"Day3"}
            leftIcon={"bi bi-card-text"}
            type={"text"}
            name={"day3"}
            value={placeinfo.threeDay.day3}
            onChange={onUpdateField2}
          />
          <h2>Five day</h2>
          <br />
          <label htmlFor="day1">Day1: </label>
          <input
            placeholder={"Day1"}
            leftIcon={"bi bi-card-text"}
            type={"text"}
            name={"day1"}
            value={placeinfo.fiveDay.day1}
            onChange={onUpdateField3}
          />
          <label htmlFor="day2">Day2: </label>
          <input
            placeholder={"Day2"}
            leftIcon={"bi bi-card-text"}
            type={"text"}
            name={"day2"}
            value={placeinfo.fiveDay.day2}
            onChange={onUpdateField3}
          />
          <label htmlFor="day3">Day3: </label>
          <input
            placeholder={"Day3"}
            leftIcon={"bi bi-card-text"}
            type={"text"}
            name={"day3"}
            value={placeinfo.fiveDay.day3}
            onChange={onUpdateField3}
          />
          <label htmlFor="day4">Day4: </label>
          <input
            placeholder={"Day4"}
            leftIcon={"bi bi-card-text"}
            type={"text"}
            name={"day4"}
            value={placeinfo.fiveDay.day4}
            onChange={onUpdateField3}
          />
          <label htmlFor="day5">Day5: </label>
          <input
            placeholder={"Day5"}
            leftIcon={"bi bi-card-text"}
            type={"text"}
            name={"day5"}
            value={placeinfo.fiveDay.day5}
            onChange={onUpdateField3}
          />
          {/* <select name="days" onChange={onUpdateField} style={{marginLeft: "30%"}}>
            <option>No.of days</option>
            {days.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
          <select name="busType" onChange={onUpdateField}>
            <option>Bus Types</option>
            {busType.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select> */}
          <input
            style={{ marginLeft: "30%" }}
            placeholder="choose picture"
            type="file"
            name="photo"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <Btn type="submit" value={btnValue} />
        </form>
      </div>
    </div>
  );
}

export default AddPlaces;
