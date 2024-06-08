import React, { useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  createUserAsync,
  loginUserAsync,
} from "../Redux/Slices/AuthenticationSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUpIsLoading, setsignUpIsLoading] = useState(false);
  const [logInIsLoading, setlogInIsLoading] = useState(false);

  async function handleSignUp(event) {
    setsignUpIsLoading(true);
    event.preventDefault();
    console.log("handleSignUp");

    const fullName = event.target.signUpfullName.value;
    const email = event.target.signUpEmail.value;
    const password = event.target.signUpPassword.value;

    const actionResult = await dispatch(
      createUserAsync({
        fullName: fullName,
        email: email,
        password: password,
      })
    );

    // console.log("payload - ", actionResult.payload);

    if (actionResult.payload.msg === "Email Already Exist") {
      toast.error(actionResult.payload.msg);
      document.querySelector("#signUpfullName").value = "";
      setsignUpIsLoading(false);
    }

    if (actionResult.payload.msg === "Sign Up Successful") {
      toast.success(actionResult.payload.msg);
      // console.log("41 - ", actionResult);
      document.querySelector("#signUpfullName").value = "";
      document.querySelector("#signupEmail").value = "";
      document.querySelector("#signupPassword").value = "";
      setsignUpIsLoading(false);
      // navigate("/");
    }
  }

  async function handleLogin(event) {
    setlogInIsLoading(true);
    event.preventDefault();

    try {
      console.log("Handle LogIn");
      const loginEmail = event.target.loginEmail.value;
      const loginPassword = event.target.loginPassword.value;

      console.log(loginEmail, loginPassword);
      // console.log(event);

      const actionResult = await dispatch(
        loginUserAsync({
          email: loginEmail,
          password: loginPassword,
        })
      );

      if (actionResult.payload.msg === "Password Wrong") {
        toast.error(actionResult.payload.msg);
        document.querySelector("#loginPassword").value = "";
        setlogInIsLoading(false);
      }

      if (actionResult.payload.msg === "User Doesn't Exist") {
        toast.error(actionResult.payload.msg);
        document.querySelector("#loginEmail").value = "";
        setlogInIsLoading(false);
      }

      if (actionResult.payload.msg === "Logged In Successfull") {
        toast.success(actionResult.payload.msg);

        console.log("action Payload", actionResult.payload.token);
        localStorage.setItem("loggedDataToken", actionResult.payload.token);
        // window.location.replace("/");
        document.querySelector("#loginPassword").value = "";
        document.querySelector("#loginEmail").value = "";
        setlogInIsLoading(false);
        window.location.replace("/");
      }
    } catch (error) {
      console.log("Error handleLogin ", error.message);
    }
  }

  return (
    <>
      <Header />
      <div className="authentication">
        <div className="col-12 row  ">
          <div className="col-12 col-md-6">
            <div className="card">
              <form onSubmit={handleSignUp}>
                <div className="d-flex flex-row justify-content-center p-2 ">
                  <h4 className=" text-dark px-3 ">Sign Up </h4>
                  {signUpIsLoading ? (
                    <div className="spinner-border" role="status"></div>
                  ) : null}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="signUpfullName">Full Name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="signUpfullName"
                    name="signUpfullName"
                    aria-describedby="emailHelp"
                    placeholder="Your Name"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="signupEmail">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    id="signupEmail"
                    name="signUpEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="signupPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    id="signupPassword"
                    name="signUpPassword"
                    placeholder="Password"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </form>
            </div>
          </div>

          <div className="col-12 col-md-6 mt-3 mt-md-0 ">
            <div className="card">
              <form onSubmit={handleLogin}>
                <div className="d-flex flex-row justify-content-center p-2 ">
                  <h4 className=" text-dark px-3 ">Log In </h4>
                  {logInIsLoading ? (
                    <div className="spinner-border" role="status"></div>
                  ) : null}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="loginEmail">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="loginEmail"
                    required
                    name="loginEmail"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="loginPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="loginPassword"
                    placeholder="Password"
                    name="loginPassword"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>

              <div className="mt-2">
                <p>Email - ajay@gmail.com</p>
                <p>Password - ajay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
