import React from "react";
import "./Signin.css";

const Signin = () => {
  return (
    <div className="signin">
      <div className="container">
        <div className="row">
          <div className="column col-lg-4 d-flex justify-content-center align-items-center">
            <h1 className="text-color signin-heading">
              Sign
              <br />
              In
            </h1>
          </div>
          <div className="column col-lg-8 d-flex justify-content-center align-items-center">
            <div className="form">
              <form className="register-form">
                <input className="p-2 my-3" type="email" placeholder="Email" />
                <input
                  className="p-2 my-3"
                  type="password"
                  placeholder="Password"
                />
                <button>SIGNIN</button>
                <p className="message">
                  New User? <a href="/signup">Sign Up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
