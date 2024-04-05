import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaStepForward } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

const Timer = ({ tasks, taskCompleted, resetDisp }) => {
  const arr_size = tasks.length;
  const [isRunning, setIsRunning] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [progressTitle, setProgressTitle] = useState("");
  const [progressTime, setProgressTime] = useState(0);
  const [progressColor, setProgressColor] = useState("rgba(240, 0, 0, 0.87)");

  const initialProgressTimeRef = useRef(progressTime);
  const intervalRef = useRef();

  const currentTask = tasks[currentTaskIndex];

  useEffect(() => {
    if (currentTask) {
      setProgressTitle(currentTask.type);
      setProgressTime(currentTask.time * 60);
      initialProgressTimeRef.current = currentTask.time * 60;
      setProgressColor(
        currentTask.type === "Work"
          ? "rgba(240, 0, 0, 0.87)"
          : "rgb(255, 255, 0)",
      );
    }
  }, [currentTask]);

  const startTimer = async () => {
    if (!isRunning && currentTask) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setProgressTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            if (currentTaskIndex === arr_size - 1) {
              taskCompleted(tasks[currentTaskIndex]._id);
              resetDisp();
            } else {
              //const nextIndex = currentTaskIndex + 1;
              taskCompleted(tasks[currentTaskIndex]._id);

              setCurrentTaskIndex((currentTaskIndex) => {
                console.log("Before increasing", currentTaskIndex);
                currentTaskIndex = currentTaskIndex + 1;
                console.log("After", currentTaskIndex);
                return currentTaskIndex;
              });
              console.log(currentTaskIndex);
              setProgressTitle(tasks[currentTaskIndex].type);
              setProgressColor(
                tasks[currentTaskIndex].type === "Work"
                  ? "rgba(240, 0, 0, 0.87)"
                  : "rgb(255, 255, 0)",
              );
              return tasks[currentTaskIndex].time * 60;
            }
          }
        });
      }, 1000);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const nextTask = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    taskCompleted(tasks[currentTaskIndex]._id);
    if (currentTaskIndex !== arr_size - 1) {
      setCurrentTaskIndex((prevIndex) => (prevIndex + 1) % tasks.length);
    } else {
      taskCompleted(tasks[currentTaskIndex]._id);
      resetDisp();
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="timer-container">
      {currentTask && (
        <>
          <h1>{progressTitle}</h1>
          <div className="circular-progress-bar-container">
            <CircularProgressbar
              value={(progressTime / initialProgressTimeRef.current) * 100}
              text={formatTime(progressTime)}
              styles={{
                path: {
                  stroke: progressColor,
                  strokeLinecap: "round",
                },
                trail: {
                  stroke: "#f2f2f2",
                },
                text: {
                  dominantBaseline: "middle",
                  fill: "#000",
                },
              }}
            />
          </div>
          <div className="timer-controls">
            <button onClick={isRunning ? pauseTimer : startTimer}>
              {isRunning ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={nextTask}>
              <FaStepForward />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Timer;
