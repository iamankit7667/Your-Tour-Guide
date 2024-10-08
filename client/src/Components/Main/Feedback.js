import React, { useState } from "react";
import Axios from "../../AxiosConfig";
import { useNavigate } from "react-router-dom";

import "./main.css";

const Feedback = (props) => {
  const [fdbk, setFdbk] = useState("");
  const navigate = useNavigate();

  // Not Refreshing Page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fdbk) alert("please give your feedback");
    else {
      const feedback_data = {
        username: props.user.username,
        fdbk: fdbk,
      };
      Axios.post("index/fd", feedback_data).then((resp) => {
        if (resp.status === 200) {
          props.updated();
          setFdbk("");
          return alert("Thank's for giving your feedback😎");
        } else {
          navigate("/error");
        }
      });
    }
  };

  if (!props.user) return <> </>;
  else {
    return (
      <>
        {props.user.feedbackgiven ? (
          <h2>Thank's for giving your feedback😎</h2>
        ) : (
          <>
            <div className="fd_bk">
              <span>Give Feedback</span>
              <div className="shortdesc2">
                <p>Please share your valuable feedback to us</p>
              </div>
            </div>
            <div className="feed_box">
              <div className="feed">
                <form onSubmit={handleSubmit}>
                  <label>
                    Your feedback
                    <br />
                    <textarea
                      value={fdbk}
                      onChange={(x) => setFdbk(x.target.value)}
                      name="addtional"
                    ></textarea>
                    <br />
                  </label>
                  <button
                    type="submit"
                    id="fsubmit"
                    style={{ fontSize: "20px" }}
                  >
                    Submit feedback
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
};

export default Feedback;
