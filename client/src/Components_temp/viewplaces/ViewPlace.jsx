import React, { useState, useEffect } from "react";
import Axios from "../../AxiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import Heading from "./ViewplacesComponents/Heading";
import "./style.css";
import Header from "../Navbar/Header";
import Components from "./ViewplacesComponents/PlacesComponent";
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
function ViewPlace(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [placesData, setPlacesData] = useState([]);
  const params = useParams();
  const [category, setCategory] = useState(params.id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    if (userL) {
      Axios.get(`users/loguser/${userL.username}`).then((resp) => {
        return setUser(resp.data);
      });
    }
    Axios.get(`places/places/${category}`).then((resp) => {
      setPlacesData(resp.data);
      setLoading(true);
    });
  }, [category]);
  return (
    <div className="viewAllPlaces">
      <Header
        user={user}
        navItems={navItems}
        openLoginForm={props.openLoginForm}
      />
      <div className="head">
        <Heading category="Packages" />
        {params.id === "all" ? (
          <div className="allselect">
            <label htmlFor="places">
              Sort by:
              <select
                name="places"
                id="places"
                onChange={(event) => {
                  setCategory(event.target.value);
                  setLoading(false);
                }}
                value={category}
                style={{ color: "black", border: "black solid 4px" }}
              >
                <option value="all">all</option>
                <option value="beach">beach</option>
                <option value="island">island</option>
                <option value="countryside">countryside</option>
                <option value="piligrimage">Piligrimage</option>
                <option value="cultural">cultural</option>
                <option value="winter">winter</option>
                <option value="hillstation">hillstation</option>
              </select>
            </label>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {loading ? (
        <div>
          <div>
            {placesData &&
              placesData.map((x) => (
                <Components
                  key={x.id}
                  photo={x.photo}
                  from={x.from}
                  to={x.to}
                  details={x.details}
                  price={x.price}
                  rating={x.rating}
                  onClickBook={() => {
                    if (!Cookies.get("user")) {
                      var date = new Date();
                      date.setTime(date.getTime() + 60 * 1000);
                      Cookies.set("redirectLink", `/book/${x.id}`, {
                        expires: date,
                      });
                      navigate("/login");
                    } else {
                      navigate(`/book/${x.id}`);
                    }
                  }}
                  onClick={() => {
                    navigate(`/placedetails/${x.id}`);
                  }}
                />
              ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default ViewPlace;
