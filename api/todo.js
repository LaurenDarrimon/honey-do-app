//this file intercts w/ firestore database 
import { db } from '../firebase';
//import all the firebase SDK function goodies
import {
    collection, 
    addDoc, 
    updateDoc, 
    setDoc,
    doc, 
    deleteDoc
} from "firebase/firestore";


const addTodo = async( { userId, title, description, status } ) => {

    try {
        await addDoc(
            collection(db, "todo"),
            {
                user: userId,
                title: title,
                description: description,
                status: status,
                createdAt: new Date().getTime()
            }
        );
    } catch (error) {
        console.log(error)  
    }
};

const toggleTodoStatus = async ( { docId, status } ) => {
    try {
        //grab ref to existing firestore document 
        const todoRef = doc( db, "todo", docId );

        //update that doc

        await updateDoc(
            todoRef, 
            {
                status: status
            }
        )
    } catch (error) {
        console.log(error);
    }
}

const updateTodo = async ( { docId, status } ) => {
    try {
        //grab ref to existing firestore document 
        const todoRef = doc( db, "todo", docId );

        //update that doc

        await setDoc(
            todoRef, 
            {
                user: userId,
                title: title,
                description: description,
                status: status,
                createdAt: new Date().getTime(),
            },
            {merge: true}
        )
    } catch (error) {
        console.log(error);
    }
}

const deleteTodo = async ( docId ) => {
    try {
       
        //grab ref to existing firestore document 
        const todoRef = doc( db, "todo", docId );
        
        //delete the doc 

        await deleteDoc( todoRef );

    } catch (error) {
        console.log(error);
    }
}

export { addTodo, toggleTodoStatus, updateTodo, deleteTodo }
