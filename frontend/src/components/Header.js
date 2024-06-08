import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = () => {
  const authReduxisAuthenticated = useSelector(
    (state) => state.auth.loggedData
  );

  // console.log(authReduxisAuthenticated.email);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark px-5">
        <Link to="/" className="navbar-brand text-light" href="#">
          Task Manager
        </Link>
        <button
          style={{ color: "#fff" }}
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon text-light"
            style={{ color: "#fff" }}
          ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link text-light" href="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link text-light" href="#">
                Sign Up | Log In
              </Link>
            </li>

            {authReduxisAuthenticated.isUserLogged === true ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light">
                    {" "}
                    {authReduxisAuthenticated.email &&
                      authReduxisAuthenticated.email}{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light">
                    {" "}
                    {authReduxisAuthenticated.fullName &&
                      authReduxisAuthenticated.fullName}{" "}
                  </Link>
                </li>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    localStorage.removeItem("loggedDataToken");
                    window.location.replace("/");
                  }}
                >
                  {" "}
                  Log Out{" "}
                </button>
              </>
            ) : null}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
