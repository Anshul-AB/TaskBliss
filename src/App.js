import "./App.css";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Signin from "./components/Signup/Signin";
import Signup from './components/Signup/Signup';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Todo from "./components/Todo/Todo";
import About from "./components/About/About";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./Store/store";

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }
  }, [])
  
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/todo" element={<Todo/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
        </Routes>
      </Router>
        <Footer/>
    </>
  );
}

export default App;
