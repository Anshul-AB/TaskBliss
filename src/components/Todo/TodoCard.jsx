import React from "react";
import "./Todo.css";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";

const TodoCard = ({ title, body, id, delId, display, updateIndex, toBeUpdate }) => {
  return (
    <>
      <div className="todoCard">
        <div className="flex-col todocardInputs">
          <h4>{title.split("", 77)}</h4>
          <p>{body.split("", 77)}</p>
        </div>
        <div className=" flex justify-between">
          <button
            className="todoCard-btn"
            onClick={() => {
              display("block");
              toBeUpdate(updateIndex);
            }}
          >
            <GrUpdate className=" update-icon" />
          </button>

          <button className="todoCard-btn" onClick={() => delId(id)}>
            <MdDeleteForever style={{ color: "red" }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoCard;
