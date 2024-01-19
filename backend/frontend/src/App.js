import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./Store/store";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Todo from "./components/Todo/Todo";
import Contact from "./components/Contact/Contact.jsx";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signup/Signin";
import Footer from "./components/Footer/Footer";
import UserIdContext from "./CreateContext/userIdContext.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <>
      <UserIdContext>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </Router>
        <Footer />
      </UserIdContext>
    </>
  );
}

export default App;
