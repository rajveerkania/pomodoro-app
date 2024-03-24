import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdSkipNext } from "react-icons/md";

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const percentage = 60;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="timer-div">
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
      <div className="controls">
        <div className="icon-container">
          <div id="timer-play" onClick={toggleTimer}>
            {isRunning ? (
              <FaPause className="icon" />
            ) : (
              <FaPlay className="icon" />
            )}
          </div>
          <div id="timer-next">
            <MdSkipNext className="next-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
