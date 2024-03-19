import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const Update = ({ display, update }) => {
  const [Inputs, setInputs] = useState({
    type: update.type,
    time: update.time,
  });

  useEffect(() => {
    setInputs({ type: update.type, time: update.time });
  }, [update]);

  const updateChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = () => {
    console.log(Inputs);
    display("none");
    setInputs({ type: "", time: "" });
  };

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
            checked={Inputs.type === "Work"}
            onChange={updateChange}
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
            checked={Inputs.type === "Break"}
            onChange={updateChange}
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
          value={Inputs.time}
          onChange={updateChange}
          placeholder="Time (in minutes)"
        />
      </div>
      <div className="button-div d-flex justify-content-center align-items-center">
        <button className="update-btn p-2" onClick={submit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Update;
