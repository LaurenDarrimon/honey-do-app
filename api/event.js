//this file intercts w/ firestore database 
import { db } from '../firebase';
//import all the firebase SDK function goodies
import {
    collection, 
    addDoc, 
    updateDoc, 
    doc, 
    deleteDoc
} from "firebase/firestore";


const addEvent = async( { userId, title, description, status } ) => {

    try {
        await addDoc(
            collection(db, "event"),
            {
                user: userId,
                title: title,
                description: description,
                status: status,
                createdAt: new Date().getTime(),
                eventDate: eventDate,
            }
        );
    } catch (error) {
        console.log(error)  
    }
};

const toggleEventStatus = async ( { docId, status } ) => {
    try {
        //grab ref to existing firestore document 
        const eventRef = doc( db, "event", docId );

        //update that doc

        await updateDoc(
            eventRef, 
            {
                status: status
            }
        )
    } catch (error) {
        console.log(error);
    }
}

const deleteEvent = async ( docId ) => {
    try {
       
        //grab ref to existing firestore document 
        const eventRef = doc( db, "event", docId );
        
        //delete the doc 
        await deleteDoc( eventRef );

    } catch (error) {
        console.log(error);
    }
}

export { addEvent, toggleEventStatus, deleteEvent }