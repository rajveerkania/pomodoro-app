import React, { useState } from "react";
import "./Todo.css";
import TodoCards from "./TodoCards";
import Update from "./Update";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  const [formData, setFormData] = useState({ type: "", time: "" });
  const [Array, setArrays] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddButtonClick = () => {
    if (formData.type === "" || formData.type === "") {
      toast.error("Empty Input!");
    } else {
      console.log(formData);
      setFormData({ type: "", time: "" });
      setArrays([...Array, formData]);
      document.getElementById("flexRadioDefault1").checked = false;
      document.getElementById("flexRadioDefault2").checked = false;
      document.getElementById("timeInput").value = null;
      toast.success("Task has been added");
      toast.error("Please signin to save the task");
    }
  };

  const del = (id) => {
    toast.warning("Task has been deleted");
    Array.splice(id, "1");
    setArrays([...Array]);
  };

  const disp = (value) => {
    console.log(value);
    document.getElementById("todo-update").style.display = value;
  };

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center">
          <div className="add-task-btn align-items-center justify-content-center">
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
              <button className="add-btn p-2" onClick={handleAddButtonClick}>
                Add
              </button>
            </div>
          </div>
        </div>
        {/* Dynamic Part */}
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12"></div>
            <div className="col-lg-4 col-md-12 col-sm-12">
              {Array &&
                Array.map((item, index) => (
                  <div className="col p-3" key={index}>
                    <TodoCards
                      type={item.type}
                      time={item.time}
                      id={index}
                      delId={del}
                      display={disp}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/*Update Div*/}
      <div className="todo-update" id="todo-update">
        <Update display={disp} />
      </div>
    </>
  );
};

export default Todo;
