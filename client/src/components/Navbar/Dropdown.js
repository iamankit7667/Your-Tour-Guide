import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Dropdown.css";

function Dropdown(props) {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {props.role === "user" ? (
        <ul
          className={dropdown ? "services-submenu clicked" : "services-submenu"}
          onClick={() => setDropdown(!dropdown)}
        >
          <li>
            <Link
              to="/profile"
              className="submenu-item"
              onClick={() => setDropdown(false)}
            >
              Profile
            </Link>
            <Link
              to="/mytours"
              className="submenu-item"
              onClick={() => setDropdown(false)}
            >
              cart
            </Link>
            <Link
              to="/transactions"
              className="submenu-item"
              onClick={() => setDropdown(false)}
            >
              My tours
            </Link>
            <h2
              className="submenu-item"
              onClick={() => {
                localStorage.removeItem("user");
                Cookies.remove("user");
                setDropdown(false);
                if (typeof props.updated === 'function') props.updated()
                navigate("/");
              }}
            >
              Logout
            </h2>
          </li>
        </ul>
      ) : (
        <>
          <ul
            className={
              dropdown ? "services-submenu clicked" : "services-submenu"
            }
            onClick={() => setDropdown(!dropdown)}
          >
            <li>
              <h2
                className="submenu-item"
                onClick={() => {
                  localStorage.removeItem("user");
                  Cookies.remove("user");
                  setDropdown(false);
                  if (typeof props.updated === 'function') props.updated()
                  navigate("/");
                }}
              >
                Logout
              </h2>
            </li>
          </ul>
        </>
      )}
    </>
  );
}

export default Dropdown;
