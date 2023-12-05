import React from "react";
import "./Home.css";
import { FaFaceGrinWink } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";

const Home = () => {
  const isLoggedIn = useSelector((state)=> state.isLoggedIn);

  return (
    <div className=" home height ">
      <div className="resHome container grid grid-cols-2 pt-10 pb-10">
        {/* left */}
        <div className="homeLeft flex-column md:mb-7">
          <h1>Creating Harmony <br/>
          in Your Daily Routine.</h1>
          <p>
            TaskBliss transforms chaos into choreography,<br/> letting you dance
            through your day.
          </p>
        </div>

        {/* Right */}
        <div className="flex-column">
          <div className="bg-yellow-400 w-95 p-10 box-shadow rounded-lg ">
            <span className="flex items-center text-lg mb-4">
              Your first To-Do List &nbsp;{" "}
              <FaFaceGrinWink className="bg-inherit" />{" "}
            </span>

            {!isLoggedIn &&
              <>
              <button className="btn-home ">
              <Link to='/signup'>
              Sign-Up
              </Link>
              </button>
            <button className="btn-home ">
              <Link to='/signin'>
              Sign-In
              </Link>
              </button>
              </>
            }

            {isLoggedIn &&
              <>
              <button className="btn-home ">
              <Link to='/todo'>
              Yaey, Lets start.
              </Link>
              </button>
              </>
            }
            
            <button className="btn-home mt-5"></button>
            <button className="btn-home mt-5"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
