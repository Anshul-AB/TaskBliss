import React, { useEffect, useState } from "react";
import "./Todo.css";
import TodoCard from "./TodoCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Update from "./Update";
import "./Update.css";

let id = sessionStorage.getItem("id");
let toUpdateArray = [];

const Todo = () => {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  const [array, setArray] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  //colors generator
  const [initialColors, setInitialColors] = useState([]);
  const colors = [
    "rgb(255,179,186)",
    "rgb(255,223,186)",
    "rgb(255,255,186)",
    "rgb(186,255,201)",
    "rgb(186,225,255)",
  ];

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  // The Body Input Box Visibility
  const show = () => {
    document.getElementById("bodyVisibility").style.display = "block";
  };

  // Visibility of Update box Popup
  const updatePop = (value) => {
    document.getElementById("updatePopup").style.display = value;
  };

  // Submitting the Tasks
  const submit = async () => {
    try {
      if (inputs.title === "" || inputs.body === "") {
        toast.error("Empty task cannot be added");
        return;
      }
      if (id) {
        const response = await axios.post(
          "http://localhost:5000/api/v2/addTask",
          {
            title: inputs.title,
            body: inputs.body,
            id: id,
          }
        );
        console.log(response.data);
        setInputs({ title: "", body: "" });
        toast.success("Task Added");
        setSubmitted(true);
      } else {
        setArray([...array, inputs]);
        setInputs({ title: "", body: "" });
        toast.success("Task Adding");
        toast.error("Task not saved, Please SignIn.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // The Delete Button
  const deleteId = async (cardId) => {
    try {
      if (id) {
        await axios
          .delete(`http://localhost:5000/api/v2/deleteTask/${cardId}`, {
            data: { id: id },
          })
          .then((response) => {
            toast.success("Task Deleted Successfully");
            console.log(response.data);
          });
      } else {
        toast.error("Please SignIn to delete Task");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // The index of array to be updated
  const update = (value) => {
    toUpdateArray = array[value];
    console.log("two", toUpdateArray);
  };

  //useEffect to render bg-colors and array on every refresh
  useEffect(() => {
    // Store initial colors
    setInitialColors([...colors]);

    // Fetch data and set colors
      const myList = async () => {
        await axios
          .get(`http://localhost:5000/api/v2/getTasks/${id}`)
          .then((response) => {
            setArray(
              response.data.list.map((item, index) => ({
                ...item,
                color: colors[index % colors.length],
              }))
            );
          });
      };
      myList();
  }, [id, submitted, array]);

  return (
    <>
      <div className="height relative">
        <ToastContainer />
        <div className="flex-column mt-10">
          <input
            type="text"
            name="title"
            placeholder="TITLE"
            onChange={change}
            onClick={show}
            value={inputs.title}
            className="todo-input"
          />
          <textarea
            type="text"
            name="body"
            placeholder="BODY"
            onChange={change}
            value={inputs.body}
            id="bodyVisibility"
            className="hidden todo-input"
          />
          <button className="todoAdd-btn mb-10" onClick={submit}>
            Add Task
          </button>
        </div>

        <div className="container min-h-screen flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5 ">
            {array &&
              array.map((item, index) => (
                <div key={index} style={{ backgroundColor: item.color }}>
                  <TodoCard
                    title={item.title}
                    body={item.body}
                    id={item._id}
                    delId={deleteId}
                    display={updatePop}
                    updateIndex={index}
                    toBeUpdate={update}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="updatePopup" id="updatePopup">
        <Update exitUpdate={updatePop} update={toUpdateArray} />
      </div>
    </>
  );
};

export default Todo;
