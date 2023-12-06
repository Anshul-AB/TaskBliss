import React, { useContext, useState } from "react";
import axios from "axios";
import "./Contact.css";
import UserContext from "../../CreateContext/Context";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
  const userId = useContext(UserContext);
  const id = userId.id;

    const [inputs, setInputs] = useState({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const change = (e) => {
      const { name, value } = e.target;
      setInputs({ ...inputs, [name]: value });
    };

  const submit = async (e) => {
    try {
      e.preventDefault();
      if(inputs===""){
        toast.error("Please fill all the fields")
      }
      if (id) {
        await axios
          .post(`http://localhost:5000/api/v3/contact`, inputs)
          .then((response) => console.log(response));
        setFormSubmitted(true);
        toast.success("Contact form submitted.");
      } else {
        toast.error("Please sign in to submit the form.");
      }
    } catch (error) {
      console.error("Error occurred submitting the form", error);
    }
  };

  return (
    <div>
        <ToastContainer/>
      <div className="container height flex-center">
        <div className="resContact w-full h-full flex ">
          {/* Left */}
          {!formSubmitted && <div className="contactForm w-1/2 flex-column">
            <h1>Contact Form</h1>
            <input type="text" name="name" placeholder="Enter your Full Name"
            onChange={change} />
            <input
              type="email"
              name="email"
              placeholder="Enter your Email-Id"
              onChange={change}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Enter your Phone number"
              onChange={change}
            />
            <textarea
              type="text"
              name="message"
              placeholder="Enter your Query/Message"
              onChange={change}
            />
            <button onClick={submit} className="btn-main">
              Submit
            </button>
          </div>}
          {formSubmitted && <p className="formSuccess">Form submitted successfully!</p>}
          {/* Right */}
          <div className="contactMe w-1/2 flex-column">
            <h1>Contact Me</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
