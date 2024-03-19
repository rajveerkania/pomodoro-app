import React, { useEffect, useState } from "react";
import "./Todo.css";
import TodoCards from "./TodoCards";
import Update from "./Update";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  let toUpdateArray = [];
  let id = sessionStorage.getItem("id");
  const [formData, setFormData] = useState({ type: "", time: "" });
  const [todoArray, setTodoArray] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submit = async () => {
    if (formData.type === "" || formData.time === "") {
      toast.error("Empty Input!");
    } else {
      if (id) {
        await axios.post("http://localhost:8080/api/v2/addTask", {
          type: formData.type,
          time: formData.time,
          id: id,
        });
        setTodoArray([...todoArray, formData]);
        setFormData({ type: "", time: "" });
        document.getElementById("flexRadioDefault1").checked = false;
        document.getElementById("flexRadioDefault2").checked = false;
        document.getElementById("timeInput").value = null;
        toast.success("Task has been added");
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
          toast.success("Task has been deleted");
        });
    } else {
      toast.error("Please signin first");
    }
  };

  const disp = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  const update = (value) => {
    toUpdateArray = Array[value];
  };

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        await axios
          .get(`http://localhost:8080/api/v2/getTasks/${id}`)
          .then((response) => {
            setTodoArray(response.data.tasks);
          });
      };
      fetch();
    } else {
      toast.error("Please signin first");
    }
  }, [submit]);

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
              <button className="add-btn p-2" onClick={submit}>
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
              {todoArray &&
                todoArray.map((item, index) => (
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
      </div>

      {/*Update Div*/}
      <div className="todo-update" id="todo-update">
        <Update display={disp} update={toUpdateArray} />
      </div>
    </>
  );
};

export default Todo;
