import React from "react";
import { IoClose } from "react-icons/io5";

const Update = ({ display }) => {
  return (
    <div className="p-5 d-flex justify-content-center align-items-center flex-column update">
      <div className="update-heading justify-content-center">
        <h2>Update Task</h2>
        <button className="close-btn" onClick={() => display("none")}>
          <IoClose size={30} />
        </button>
      </div>
      <div className="radio-btn-div d-flex justify-content-center">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="type"
            id="flexRadioDefault1_update"
            value="Work"
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioDefault1_update"
          >
            Work
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="type"
            id="flexRadioDefault2_update"
            value="Break"
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioDefault2_update"
          >
            Break
          </label>
        </div>
      </div>
      <div className="time-input d-flex justify-content-center align-items-center">
        <input
          className="p-2 my-3"
          type="number"
          id="timeInput_update"
          name="time"
          placeholder="Time (in minutes)"
        />
      </div>
      <div className="button-div d-flex justify-content-center align-items-center">
        <button className="update-btn p-2">Update</button>
      </div>
    </div>
  );
};

export default Update;
