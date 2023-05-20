import axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const ForgetPassword = () => {
  const [loader, setLoader] = useState(false);

  const emailRef = useRef();
  const history = useHistory();

  const goToLogin = () => {
    history.push("/");
  };

  const sendLinkHandler = (e) => {
    setLoader(true);
    e.preventDefault();
    console.log(emailRef.current.value);
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCu42D-SrKCFTc8BvBksZi2Op0nMxIAsRs",
        {
          requestType: "PASSWORD_RESET",
          email: emailRef.current.value,
        }
      )
      .then((res) => {
        console.log("Link send Successfully");
        console.log(res.data);
        setLoader(false);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div
      className="container-fluid "
      style={{ height: "670px", paddingTop: "150px" }}
    >
      <div className="row">
        <div className="col-md-6 mx-auto mt-5 p-3 text-white text-center ">
          <div className="bg-danger bg-gradient p-3 rounded-2 ">
            <h3>Forget Password</h3>
          </div>
        </div>
      </div>
      <div className="row  ">
        <div className="col-md-5 mx-auto mt-3 border border-3 border-info rounded-3 p-3 ">
          <form>
            <div className="form-group">
              <label className=" mb-2 fw-bold">
                Entere the email with which you have registered.
              </label>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                ref={emailRef}
              />
            </div>
            <div className="d-grid">
              <button
                className="btn btn-danger mt-2  fw-bold"
                onClick={sendLinkHandler}
              >
                {!loader ? " Send Link" : "Request in progress..."}
              </button>
            </div>
          </form>
          <div className="d-grid">
            <button
              className="btn btn-outline-success mt-3 p-2 rounded fw-bold"
              onClick={goToLogin}
            >
              Have an account?? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;