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
import { deleteTodo, toggleTodoStatus } from "../api/todo";

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const { user } = useAuth() || {};
  const toast = useToast();


  //tell react to update UI
  useEffect(() => {
      //nested fxn to update todod list from firestore
    if (!user) {
      setTodos([]);
      return;
    }
    //if a user is logged in, go on
    //quert firestore collection
    const q = query(
      collection(db, "todo"),
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
      //after loop, now we have array of todo docs in ar
      setTodos(ar);
    });
  }, [user]);

  //build detele item handler
  const handleTodoDelete = async (id) => {
    if (confirm("Are your sure you'd like to delete this item?")) {
      deleteTodo(id);
      toast({
        title: "Todo Deleted.",
        status: "success",
      });
    }
  };

  //build nested function to toggle todo status

  const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleTodoStatus({
      docId: id,
      status: newStatus,
    });
    toast({
      title: `todo marked ${newStatus}`,
      status: newStatus == "completed" ? "success" : "warning",
    });
  };

  return (
    <Box mt={5}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {todos &&
          todos.map((todo) => (
            <Box
              p={3}
              key={todo.id}
              boxShadow="2xl"
              shadow={"dark-lg"}
              transition="0.2s"
              _hover={{ boxShadow: "sm" }}
            >
              <Heading as="h3" fontSize={"xl"}>
                {todo.title}{" "}
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
                  onClick={() => handleTodoDelete(todo.id)}
                >
                  <FaTrash />
                </Badge>
                <Badge
                  color={todo.status == "pending" ? "gray.500" : "green.500"}
                  bg="inherit"
                  transition={"0.2s"}
                  _hover={{
                    bg: "inherit",
                    transform: "scale(1.2)",
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleToggle(todo.id, todo.status)}
                >
                  {todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                </Badge>
                <Badge
                  float="right"
                  opacity="0.8"
                  bg={todo.status == "pending" ? "yellow.500" : "green.500"}
                >
                  {todo.status}
                </Badge>
              </Heading>
              <Text>{todo.description}</Text>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default TodoList;
