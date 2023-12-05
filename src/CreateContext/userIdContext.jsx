import React, { useState } from "react";
import UserContext from "./Context";

const UserIdContext = (props) => {
  const [id, setId] = useState(sessionStorage.getItem("id"));
  // Function to update user ID when the user logs in
  const handleLogin = (newUserId) => {
    setId(newUserId);
  };

  return(
    <UserContext.Provider value={{id, handleLogin}}>
      {props.children}
    </UserContext.Provider>
  )
};

export default UserIdContext;
