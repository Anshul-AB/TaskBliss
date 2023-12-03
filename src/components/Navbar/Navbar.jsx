import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { LuClipboardSignature } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/store";

const Navbar = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
    navigateTo("/");
  };

  return (
    <div className=" navbar flex justify-around pt-8 pb-8 text-white">
      <div>
        <Link to="#">
          <b className="flex items-center text-lg">
            <LuClipboardSignature size="2rem" className="colored-icon" /> &nbsp;
            TaskBliss{" "}
          </b>
        </Link>
      </div>
      <div>
        <ul className="flex nav-list items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/todo">To-Do</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {isLoggedIn && (
            <button className="btn-main" onClick={logout}>
              Log-Out
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
