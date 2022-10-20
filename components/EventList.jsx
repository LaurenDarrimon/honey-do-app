import React, { useEffect } from "react";

import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";

import useAuth from "../hooks/useAuth";

import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteEvent, toggleEventStatus } from "../api/event";

const EventList = () => {
  const [events, setEvents] = React.useState([]);
  const { user } = useAuth() || {};
  const toast = useToast();


  //tell react to update UI
  useEffect(() => {
      //nested fxn to update event list from firestore
    if (!user) {
      setEvents([]);
      return;
    }
    //if a user is logged in, go on
    //query firestore collection
    const q = query(
      collection(db, "event"),
      where("user", "==", user.uid) //only get back documents thaht match current user
    );
    //event handler w/ firebase
    onSnapshot(q, (querySnapshot) => {
      //in this fxn we hold results from the query
      let ar = [];
      //loop throu results docs
      querySnapshot.docs.forEach((doc) => {
        ar.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      //after loop, now we have array of event docs in ar
      setEvents(ar);
    });
  }, [user]);

  //build detele item handler
  const handleEventDelete = async (id) => {
    if (confirm("Are your sure you'd like to delete this event?")) {
      deleteEvent(id);
      toast({
        title: "Event Deleted.",
        status: "success",
      });
    }
  };

  //build nested function to toggle event status

  const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleEventStatus({
      docId: id,
      status: newStatus,
    });
    toast({
      title: `event marked ${newStatus}`,
      status: newStatus == "completed" ? "success" : "warning",
    });
  };

  return (
    <Box mt={5}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {events &&
          events.map((event) => (
            <Box
              p={3}
              key={event.id}
              boxShadow="2xl"
              shadow={"dark-lg"}
              transition="0.2s"
              _hover={{ boxShadow: "sm" }}
            >
              <Heading as="h3" fontSize={"xl"}>
                {event.title}{" "}
                <Badge
                  color="red.500"
                  bg="inherit"
                  transition={"0.2s"}
                  _hover={{
                    bg: "inherit",
                    transform: "scale(1.2)",
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleEventDelete(event.id)}
                >
                  <FaTrash />
                </Badge>
                <Badge
                  color={event.status == "pending" ? "gray.500" : "green.500"}
                  bg="inherit"
                  transition={"0.2s"}
                  _hover={{
                    bg: "inherit",
                    transform: "scale(1.2)",
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleToggle(event.id, event.status)}
                >
                  {event.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                </Badge>
                <Badge
                  float="right"
                  opacity="0.8"
                  bg={event.status == "pending" ? "yellow.500" : "green.500"}
                >
                  {event.status}
                </Badge>
              </Heading>
              <Text>{event.eventDate}</Text>
              <Text>{event.description}</Text>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default EventList;