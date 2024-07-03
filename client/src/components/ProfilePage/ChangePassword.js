import React, { useState } from "react";
import Axios from "../../AxiosConfig";

function ChangePassword(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [password, setPassword] = useState({
    email: user.email,
    oldpassword: "",
    newpassword: "",
    conpassword: "",
    otp: "",
  });

  const change = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !password.oldpassword &&
      !password.newpassword &&
      !password.conpassword &&
      !password.otp
    ) {
      alert("Enter all fields.");
    } else if (password.newpassword !== password.conpassword) {
      alert("new passwords doesn't match.");
    } else {
      await Axios
        .post(`profile/changepass`, password)
        .then((resp) => {
          if (resp.status !== 200) alert(resp.data.msg);
          else {
            setPassword({
              email: user.email,
              oldpassword: "",
              newpassword: "",
              conpassword: "",
              otp: "",
            });
            alert(resp.data.msg);
            props.onClick();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">
          Enter OTP:
          <input
            type="text"
            className="tbox"
            name="otp"
            placeholder="Enter OTP"
            value={password.otp}
            onChange={change}
          />
        </label>
        <br />
        <label htmlFor="oldpassword">
          Old Password:
          <input
            type="password"
            className="tbox"
            name="oldpassword"
            placeholder="Enter old password"
            value={password.oldpassword}
            onChange={change}
          />
        </label>
        <br></br>
        <label htmlFor="newpassword">
          New password:
          <input
            type="password"
            className="tbox"
            name="newpassword"
            placeholder="Enter new password"
            value={password.newpassword}
            onChange={change}
          />
        </label>
        <br></br>
        <label htmlFor="conpassword">
          Confirm password:
          <input
            type="password"
            className="tbox"
            name="conpassword"
            placeholder="confirm new password"
            value={password.conpassword}
            onChange={change}
          />
        </label>
        <br></br>
        <button type="submit" className="btn_profile" value="save changes">
          change password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
