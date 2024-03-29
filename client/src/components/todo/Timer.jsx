import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = ({ value, title, onNext, onDelete }) => {
  const [secondsLeft, setSecondsLeft] = useState(value * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0) {
      onDelete();
    }
  }, [secondsLeft, onDelete]);

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleNext = () => {
    setIsRunning(false);
    onNext();
  };

  const percentage = ((value * 60 - secondsLeft) / (value * 60)) * 100;

  return (
    <div>
      <div className="timer-header">
        <h2>{title}</h2>
        <div className="timer-controls">
          <button onClick={handlePlayPause}>
            {isRunning ? "Pause" : "Play"}
          </button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
      <div className="timer-progress">
        <CircularProgressbar
          value={percentage}
          text={`${Math.floor(secondsLeft / 60)}:${secondsLeft % 60}`}
          strokeWidth={12}
          styles={buildStyles({
            pathColor: "#007bff",
            textColor: "#007bff",
            trailColor: "#d6d6d6",
          })}
        />
      </div>
    </div>
  );
};

export default Timer;
