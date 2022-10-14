import React from "react";

import { 
    Box, 
    Button, 
    Link,
    Text,
    useColorMode
} from "@chakra-ui/react";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {FaGoogle, FaMoon, FaSun } from "react-icons/fa"
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const Auth = () => {
    //hooks & state goodness 
    const { toggleColorMode, colorMode} = useColorMode; 
    const { isLoggedIn, user } = useAuth; 

    //function to perfomr login 
    const handleAuth = async () => {
        const provider = new GoogleAuthProvider();
        // async calls with promises
        signInWithPopup(
            auth, 
            provider
        ).then(
            // since promise iside then, we get results as google access token
            (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accesToken;
                //get info about user that's logged in
                const user = result.user;  
            }
        ).catch(
            (error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential  = GoogleAuthProvider.credentialFromError(error);
                console.log("authentication error " + errorCode + errorMessage);
            }
        )
    };

    //return component 

    return (
        <Box postition={"fixed"} top="5%" right="5%">
            <Button onClick={() => toggleColorMode()}>
                {colorMode == "dark" ? <FaSun /> : <FaMoon />}
            </Button>
            {"   "}
            { isLoggedIn && (
                <>
                    <Text color="green.500">{user.email}</Text>
                    <Link color="red.500" onClick={ () => auth.signOut()}>
                        Logout
                    </Link>
                </>
            )}
            { !isLoggedIn && (
                <>
                     <Button leftIcon={<FaGoogle/>} onClick={() => handleAuth()}>
                        Login with Google
                     </Button>

                </>
            )}
        </Box>
    );
}

export default Auth; 