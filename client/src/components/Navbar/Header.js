import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Cookies from "js-cookie";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

const Header = (props) => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [path, setpath] = useState("");

  useEffect(() => {
    if (!props.user) setpath("/");
    else if (props.user.role === "user") setpath("/index");
    else if (props.user.role === "admin") setpath("/admin");
  }, [setpath, props.user]);
  return (
    <div className="header">
      <div
        id="menu-bar"
        className="fas fa-bars"
        onClick={() => {
          document.querySelector("#menu-bar").classList.toggle("fa-times");
          document.querySelector(".navbar").classList.toggle("active");
        }}
      ></div>
      <Link to={path} className="logo">
        <span>P</span>ACK <span>U</span>R <span>B</span>AGS
      </Link>
      <ul className="navbar">
        {props.navItems.map((item) => {
          return (
            <li key={item.title} className="nav-item">
              <HashLink
                to={item.path}
                onClick={() => {
                  document
                    .querySelector("#menu-bar")
                    .classList.toggle("fa-times");
                  document.querySelector(".navbar").classList.toggle("active");
                }}
              >
                {item.title}
              </HashLink>
            </li>
          );
        })}
      </ul>
      <div className="icons">
        {props.user ? (
          <>
            {props.user.role === "user" ? (
              <div
                className="profdet"
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <img src={props.user.image} alt="profile_img" />
                {dropdown && (
                  <Dropdown role={props.user.role} updated={props.updated} />
                )}
              </div>
            ) : (
              <h2
                onClick={() => {
                  localStorage.removeItem("user");
                  Cookies.remove("user");
                  if (typeof props.updated === "function") props.updated();
                  navigate("/");
                }}
              >
                Logout
              </h2>
            )}
          </>
        ) : (
          <i
            className="fa fa-user"
            aria-hidden="true"
            id="login-btn"
            onClick={() => {
              navigate("/login");
            }}
          ></i>
        )}
      </div>
    </div>
  );
};

export default Header;
