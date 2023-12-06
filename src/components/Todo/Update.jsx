import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxExit } from "react-icons/rx";
import { toast } from "react-toastify";

const Update = ({ exitUpdate, update }) => {

  useEffect(() => {
    setInputs({
      title:update.title,
      body:update.body,
    })
  }, [update])

  
  const [inputs, setInputs] = useState({
    title:"",
      body:"",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    try {
      await axios
        .put(`http://localhost:5000/api/v2/updateTask/${update._id}`, inputs)
        .then((response) => console.log(response));
        exitUpdate("none")
    } catch (error) {
      console.error(error.message);
      toast.error("Cannot Update Task, Please Sign in.")
    }
  };

  return (
    <div className="updateBox">
      <div className="flex justify-between">
        <h1>Update Your Task</h1>
        <button className="exit-icon" onClick={() => exitUpdate("none")}>
          <RxExit />
        </button>
      </div>
      <div className="flex-col mt-3 mb-2">
        <input
          type="text"
          name="title"
          placeholder="UPDATE YOUR TITLE"
          className="update-inputs"
          value={inputs.title}
          onChange={change}
        />
        <input
          type="textarea"
          name="body"
          placeholder="UPDATE YOUR BODY"
          className="update-inputs"
          value={inputs.body}
          onChange={change}
        />
      </div>
      <div>
        <button className="w-1/2 btn-main" onClick={submit}>
          Update Your Task
        </button>
      </div>
    </div>
  );
};

export default Update;
