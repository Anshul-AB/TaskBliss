import React, { useEffect, useState, useContext } from "react";
import "./Todo.css";
import TodoCard from "./TodoCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Update from "./Update";
import "./Update.css";
import UserContext from "../../CreateContext/Context";

// let id = sessionStorage.getItem("id");
let toUpdateArray = [];

const Todo = () => {

  //getting user id from useContext hook 
  const userId = useContext(UserContext);
  const id = userId.id;
  const handleLogin = userId.handleLogin;

  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  const [array, setArray] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  //colors generator
  // eslint-disable-next-line
  const [initialColors, setInitialColors] = useState([]);
  const colors = [
    "rgb(255,179,186)",
    "rgb(255,223,186)",
    "rgb(255,255,186)",
    "rgb(186,255,201)",
    "rgb(186,225,255)",
    "rgb(224, 208, 245)",
    "rgb(252, 228, 186)",
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
      if (inputs.body === "") {
        toast.error("Empty task cannot be added");
        return;
      }
      if (id) {
        const response = await axios.post(
          `${window.location.origin}/api/v2/addTask`,
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
          //reset the state back to false
        setSubmitted(false);
      } else {
        setArray([...array, inputs]);
        setInputs({ title: "", body: "" });
        toast.success("Task Adding");
        toast.error("Task not saved, Please SignIn.");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error occured adding the tasks.");
    }
  };

  // The Delete Button
  const deleteId = async (cardId) => {
    try {
      if (id) {
        await axios
          .delete(`${window.location.origin}/api/v2/deleteTask/${cardId}`, {
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
  };

  //useEffect to render bg-colors and array on every refresh
  useEffect(() => {
    
    setInitialColors([...colors]);  // Store initial colors
    handleLogin(id);

    // Fetch data and set colors
    const myList = async () => {
      try {
        if(id){
          const response = await axios.get(`${window.location.origin}/api/v2/getTasks/${id}`);
          setArray(
            (response.data.list ?? []).map((item, index) => ({
              ...item,
              color: colors[index % colors.length],
            }))
          );
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
      myList();
      // eslint-disable-next-line
  }, [id, submitted, array]);

  return (
    <>
      <div className="height relative">
        <ToastContainer />
        <div className="flex-column mt-10 container">
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
            Add 
          </button>
        </div>

        <div className="resTodocard container min-h-screen flex-grow">
          <div className=" container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5 ">
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
