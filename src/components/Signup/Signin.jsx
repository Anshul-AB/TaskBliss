import React, {  useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeadingDiv from "./HeadingDiv";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/store";


const Signin = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${window.location.origin}/api/v1/signin`,
        inputs
      );

      if (response.data.others && response.data.others._id) {
        sessionStorage.setItem("id", response.data.others._id);
        dispatch(authActions.login());
        toast.success("Sign-In successfull");
        // console.log(response.data.others._id);
        navigateTo('/');
      } else {
        console.error("Invalid response structure", response);
        toast.error("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    toast.error("An error occurred during sign-in");
    }
  };

  return (
    <div>
      <div className="flex-center height responsiveSign">
        <ToastContainer />
        {/* Right */}
        <div className="w-2/3 signup-inputs flex-column w-100">
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
          <button className="btn" onClick={submit}>
            Sign In
          </button>
        </div>

        {/* Left */}
        <div className="w-1/3 signup-text flex-center text-8xl">
          <HeadingDiv first="Sign" second="In" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
