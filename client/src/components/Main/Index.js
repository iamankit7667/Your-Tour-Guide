import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Axios from "../../AxiosConfig";

import "./main.css";
import Upward from "./Upward";
import Header from "../Navbar/Header";
import Vedio from "./Vedio";
import Gallery from "./Gallery";
import Places from "./Places";
import About from "./About";
import Services from "./Services";
import Review from "./Review";
import Feedback from "./Feedback";
import Footer from "./Footer";
import LoginPage from "../SignIn_SignUp/LoginPage";

const Index = (props) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});
  const [updated, setUpdated] = useState(false);
  const navItems = [
    {
      title: "Home",
      path: "#home",
    },
    {
      title: "Gallery",
      path: "#gallery",
    },
    {
      title: "Places",
      path: "#places",
    },
    {
      title: "About",
      path: "#about",
    },
    {
      title: "Services",
      path: "#services",
    },
    {
      title: "Reviews",
      path: "#review",
    },
  ];
  useEffect(() => {
    if (props.formType) {
      return setLogin(true);
    } else {
      return setLogin(false);
    }
  }, [props.formType]);
  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    if (userL) {
      Axios.get(`users/loguser/${userL.username}`).then((resp) => {
        if (resp.status === 200) return setUser(resp.data);
      });
    } else {
      setUser(null);
    }
  }, [updated]);
  useEffect(() => {
    if (Cookies.get("user")) {
      Axios.get(`users/loguser`).then((resp) => {
        if (resp.status === 200) {
          if (resp.data.role === "admin" || resp.data.role === "root") {
            navigate("/admin");
          } else {
            navigate("/index");
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    console.log("asd", userL);
    console.log("Cookies", Cookies.get("user"));
    if (userL) {
      Axios.get(`users/loguser/${userL.username}`).then((resp) => {
        console.log(resp.data, "asd");
        if (resp.status === 200) return setUser(resp.data);
      });
    } else {
      setUser(null);
    }
  }, []);

  const update = () => {
    setUpdated(!updated);
  };
  console.log(user);
  return (
    <>
      <Upward />
      <Header
        user={user}
        navItems={navItems}
        openLoginForm={props.openLoginForm}
        updated={update}
      />
      <Vedio user={user} />
      <Gallery />
      <Places />
      <About />
      <Services />
      <Review />
      <Feedback user={user} updated={update} />
      <Footer />
      {login && <LoginPage formType={props.formType} updated={update} />}
    </>
  );
};

export default Index;
