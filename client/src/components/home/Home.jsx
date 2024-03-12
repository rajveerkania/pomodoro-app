import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">
          tasQ, an
          <br />
          ultimate productivity ally.
        </h1>
        <button class="home-btn p-2">Pomodoro</button>
      </div>
    </div>
  );
};

export default Home;
