import React from "react";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="column col-lg-4 d-flex justify-content-center align-items-center">
            <h1 className="text-color signup-heading">
              Sign
              <br />
              Up
            </h1>
          </div>
          <div className="column col-lg-8 d-flex justify-content-center align-items-center">
            <div className="form">
              <form className="register-form">
                <input
                  className="p-2 my-3"
                  type="text"
                  placeholder="Username"
                />
                <input className="p-2 my-3" type="email" placeholder="Email" />
                <input
                  className="p-2 my-3"
                  type="password"
                  placeholder="Password"
                />
                <button>SIGNUP</button>
                <p className="message">
                  Already registered? <a href="/signin">Sign In</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
