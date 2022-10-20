import React from "react";

import {
    Box,
    Heading,
    SimpleGrid,
    Text
} from "@chakra-ui/react";

import useAuth from "../../hooks/useAuth";
import Auth from "../../components/Auth";


import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase" //will default to index.js in firebase directory

//define JSX component to render single todo

const TodoItem = ({itemData}) =>{
    //enforce user login 
    //use Auth is imported hook, we should get back user object from it 
    const { user } = useAuth() || {};

    if(!user){
        //if no user, bail out
        return;
    }

    //return jsx 
    return (
        <Box m={9}>
            <Auth></Auth>
            <Heading as="h1" fontSize={"xl"}>
                Single Honey Do 🍈 Details:
            </Heading>
            <Heading as="h3" fontSize={"l"}>
                {itemData.title}
            </Heading>
            <Text>
                {itemData.description}
            </Text>
            <Text>
                {itemData.status}
            </Text>
            <Text>
                {itemData.createdAt}
            </Text>

        </Box>
    );


};

//define required get server side props function that Next will call whenever it gets a 
//dynamically routed url
export async function getServerSideProps(context){
    //this function will get what it needs to know from Next.js on the backend in the context variable
    //if we want url paramerter from Next.js sent for ID, context.params.id

    let itemData = null;
    //get doc from firestore
    const docRef = doc( db, "todo", context.params.id)

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()){
        itemData = docSnap.data()
    };

    return {
        props: {
            itemData
        }
    };
}

export default TodoItem; 