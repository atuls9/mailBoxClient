import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { receivedActions } from "./store/received";
import { sentActions } from "./store/sent";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
  const auth = useSelector((state) => state.auth.isAuthenticated);

  const history = useHistory();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    history.push("/");
    dispatch(receivedActions.getReceivedMail());
    dispatch(sentActions.getSentMail());
    dispatch(authActions.logout());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <h3 className="navbar-brand">S-mail</h3>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link " aria-current="page" to="/">
              Home
            </NavLink>
          </div>
          <div>
            {auth && (
              <button className="btn btn-danger ms-5" onClick={logoutHandler}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
