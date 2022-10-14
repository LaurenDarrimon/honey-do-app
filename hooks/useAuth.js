//react hooks


import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useAuth = () => {
    //manage the state of a user being loged in (or not) 
    //use state sets a variable and a function to change its value
    const [ user, setUser ] = useState( null ); 
    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    useEffect(
        //pass nested anonymous arrow functions to React and Firebase 
        () => (
            //when Auth state change occurs, the function will be run
            auth.onAuthStateChanged(
                (user) => {
                    //firebase will return user onject, and we'll set state when thta comes back
                    //set react state logged in if there is a user and they have an id
                    setIsLoggedIn( user && user.uid ? true : false );

                    //set react state
                    setUser( user );
                }
            )
        )
    );
}

export default useAuth; 