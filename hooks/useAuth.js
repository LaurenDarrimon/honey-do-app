//checked
// create custom react react hook for authorization

import { useEffect, useState } from "react";
import { auth } from "../firebase";

//manage the state of a user being loged in (or not)
//use state sets a variable and a function to change its value

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user && user.uid ? true : false);
      setUser(user);
    });
  });
  return { user, isLoggedIn };
};
export default useAuth;
