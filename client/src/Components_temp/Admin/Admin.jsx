import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../AxiosConfig";
import "./Admin.css";
import Header from "../Navbar/Header";
import { navItems } from "./NavItems";

function Admin() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [Data, setData] = useState([]);
  const [state, setState] = useState([]);
  const [datanotfound, setdatanotfound] = useState(true);
  const fetchUsers = useCallback(async () => {
    await Axios.get(`admins/users?role=${role}`).then((res) => {
      return setData(res.data);
    });
  }, [role]);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function Deluser(a) {
    await Axios.delete(`admins/delete/${a}`).then((resp) => {
      alert(resp.data.msg);
    });
    fetchUsers("user");
  }
  return (
    <div>
      <Header user={true} navItems={navItems} />
      <div className="Container">
        {role === "user" ? <h1>USERS</h1> : <h1>ADMIN</h1>}
        <div className="search">
          <input
            className="admin"
            type="text"
            placeholder="Search for User"
            onChange={(e) => {
              const search = e.target.value.trimStart().trimEnd();
              setdatanotfound(true);
              const data = Data.filter((item) => {
                return item.username
                  .toLowerCase()
                  .includes(search.toLowerCase());
              });
              if (data.length === 0) {
                setdatanotfound(false);
              }
              setState(data);
            }}
          />

          <i className="fas fa-search"></i>
        </div>
        <div>
          <button
            className="btn1"
            onClick={() => {
              setRole("user");
              setState([]);
            }}
          >
            user
          </button>
          <button
            className="btn1"
            onClick={() => {
              setRole("admin");
              setState([]);
            }}
          >
            admin
          </button>
        </div>
        <div className="box">
          <table>
            <tr>
              <th style={{ textAlign: "center", width: "17%" }}>Id</th>
              <th>Username</th>
              <th>Email</th>
              {role === "user" && <th>Tours</th>}
              <th style={{ textAlign: "center", width: "10%" }}>Delete</th>
            </tr>
            {datanotfound ? (
              state.length === 0 ? (
                Data.map((x) => {
                  return (
                    <tr key={x.id}>
                      <td>{x.id}</td>
                      <td className="admin">{x.username}</td>
                      <td className="admin">{x.email}</td>
                      {role === "user" && (
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/viewtours/${x.username}`);
                          }}
                        >
                          view tours
                        </td>
                      )}
                      <td style={{ textAlign: "center" }}>
                        <i
                          className="fas fa-trash-alt del"
                          onClick={() => Deluser(x.username)}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              ) : (
                state.map((x) => {
                  return (
                    <tr>
                      <td>{x.id}</td>
                      <td className="admin">{x.username}</td>
                      <td className="admin">{x.email}</td>
                      {role === "user" && (
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/viewtours/${x.username}`);
                          }}
                        >
                          view tours
                        </td>
                      )}
                      <td>
                        <i
                          className="fas fa-trash-alt del"
                          onClick={() => Deluser(x.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              )
            ) : (
              <h2 style={{ fontSize: "30px" }}>No User Found</h2>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
