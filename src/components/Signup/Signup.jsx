import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import HeadingDiv from "./HeadingDiv";

const Signup = () => {
  const navigateTo = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    try {
      e.preventDefault();
      if(!inputs.email || !inputs.password || !inputs.username){
        toast.error("Please provide all fields")
      }
      const response = await axios.post(
        `http://localhost:5000/api/v1/signup`,
        inputs
      );

      if (response.data.message === "User already exists") {
        toast.error("User Already Exists");
        setInputs({ email: "", password: "", username: "" });
      } else {
        console.log(response.data);
        toast.success("Sign up successfull");
        setInputs({ email: "", password: "", username: "" });
        navigateTo("/signin");
      }
    } catch (error) {
      console.error(error.message);
      setInputs({ email: "", password: "", username: "" });
    }
  };

  return (
    <div className="flex-center height responsiveSign">
      <ToastContainer />
      {/* left */}
      <div className="w-1/3 signup-text flex-center text-8xl">
      <HeadingDiv first="Sign" second="Up"/>
      </div>

      {/* Right */}
      <div className="w-2/3 signup-inputs flex-column ">
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email-Id"
          onChange={change}
          value={inputs.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          onChange={change}
          value={inputs.password}
        />
        <input
          type="username"
          name="username"
          placeholder="Enter Your Username"
          onChange={change}
          value={inputs.username}
        />
        <button className="btn" onClick={submit}>
          {" "}
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
