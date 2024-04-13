import React, { useEffect, useState } from "react";
import "./Todo.css";
import TodoCards from "./TodoCards";
import Update from "./Update";
import Timer from "./Timer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  let id = sessionStorage.getItem("id");

  const [Inputs, setInputs] = useState({ type: "", time: null });
  const [Array, setArray] = useState([]);
  const [toUpdateArray, setToUpdateArray] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const onClickSubmit = async () => {
    if (Inputs.type === "" || Inputs.time === null) {
      toast.error("Empty Input!");
    } else {
      if (id) {
        await axios
          .post("http://localhost:8080/api/v2/addTask", {
            type: Inputs.type,
            time: Inputs.time,
            id: id,
          })
          .then(() => {
            setToggle((toggle) => !toggle);
            setInputs({ type: "", time: "" });
            document.getElementById("flexRadioDefault1").checked = false;
            document.getElementById("flexRadioDefault2").checked = false;
            document.getElementById("timeInput").value = null;
            toast.success("Task has been added");
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      } else {
        document.getElementById("flexRadioDefault1").checked = false;
        document.getElementById("flexRadioDefault2").checked = false;
        document.getElementById("timeInput").value = null;
        toast.error("Please signin to save the task");
      }
    }
  };

  const del = async (CardId) => {
    if (id) {
      await axios
        .delete(`http://localhost:8080/api/v2/deleteTask/${CardId}`, {
          data: { id: id },
        })
        .then(() => {
          setToggle((toggle) => !toggle);
          toast.error("Task has been deleted");
        });
    } else {
      toast.error("Please signin first");
    }
  };

  const disp = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  const update = (value) => {
    setToUpdateArray(Array[value]);
  };

  const pomodor = () => {
    document.getElementById("pomodoro-div").style.display = "none";
    document.getElementById("timer").style.display = "block";
    document.getElementById("task-list").style.display = "none";
    document.getElementById("add-task").style.display = "none";
  };

  const delete_task = async (task_id) => {
    await axios
      .delete(`http://localhost:8080/api/v2/deleteTask/${task_id}`, {
        data: { id: id },
      })
      .then(() => {
        setToggle((toggle) => !toggle);
      });
  };

  const reset_disp = async () => {
    document.getElementById("pomodoro-div").style.display = "block";
    document.getElementById("timer").style.display = "none";
    document.getElementById("task-list").style.display = "block";
    document.getElementById("add-task").style.display = "block";
    toast.success("All tasks have been completed");
    setToggle((toggle) => !toggle);
  };
  const fetch = async () => {
    await axios
      .get(`http://localhost:8080/api/v2/getTasks/${id}`)
      .then((response) => {
        setArray(response.data.tasks);
      });
  };

  useEffect(() => {
    if (id) {
      fetch();
    } else {
      toast.error("Please signin first");
    }
  }, [toggle]);

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="container d-flex justify-content-center align-items-center">
          <div
            className="add-task-btn align-items-center justify-content-center"
            id="add-task"
          >
            <h1 className="add-heading">Add Task</h1>
            <div className="radio-btn-div d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="flexRadioDefault1"
                  value="Work"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Work
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="flexRadioDefault2"
                  value="Break"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Break
                </label>
              </div>
            </div>
            <div className="time-input d-flex justify-content-center align-items-center">
              <input
                className="p-2 my-3"
                type="number"
                id="timeInput"
                name="time"
                placeholder="Time (in minutes)"
                onChange={handleChange}
              />
            </div>
            <div className="button-div d-flex justify-content-center align-items-center">
              <button className="add-btn p-2" onClick={onClickSubmit}>
                Add
              </button>
            </div>
          </div>
        </div>
        {/* Dynamic Part */}
        <div className="container dyn-container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 align-items-center text-align-center">
              {Array && (
                <div className="text-center p-3 mb-3" id="pomodoro-div">
                  <button className="pomodoro-btn p-2" onClick={pomodor}>
                    Pomodoro
                  </button>
                </div>
              )}
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12" id="task-list">
              {Array &&
                Array.map((item, index) => (
                  <div className="col p-3" key={index}>
                    <TodoCards
                      type={item.type}
                      time={item.time}
                      id={item._id}
                      delId={del}
                      display={disp}
                      updateId={index}
                      toBeUpdated={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        {Array && (
          <div className="col" id="timer">
            <Timer
              tasks={Array}
              resetDisp={reset_disp}
              delete_task={delete_task}
            />
          </div>
        )}
      </div>

      {/*Update Div*/}
      <div className="todo-update" id="todo-update">
        <Update display={disp} update={toUpdateArray} fetch={fetch} />
      </div>
    </>
  );
};

export default Todo;
