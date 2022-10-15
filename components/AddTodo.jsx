//react component

import React from "react";

import {
  Box,
  Input,
  Button,
  Textarea,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react";

import useAuth from "../hooks/useAuth";

import { addTodo } from "../api/todo";

const AddTodo = () => {
  //state
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [isLoading, setIsLoading] = React.useState("");

  const toast = useToast(); //from Chakra - message popup

  const { isLoggedIn, user } = useAuth || {};

  //define add todo handler function

  const handleTodoCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Please login to create a Honey Do ",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    //build object value template

    const todo = {
      title,
      description,
      status,
      userId: user.uid,
    };
    //call api function to add new doc to firestore collection
    await addTodo(todo);

    setIsLoading(false);
    setTitle("");
    setDescription("");
    setStatus("pending");

    toast({
      title: "Honey Do created!",
      status: "success",
    });
  };

  //JSX markup
  return (
    <Box w="40%" margin={"0 auto"} display="block" mt={5}>
      <Stack direction="column">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option
            value={"pending"}
            style={{ color: "yellow", fontWeight: "bold" }}
          >
            Pending
          </option>
          <option
            value={"completed"}
            style={{ color: "green", fontWeight: "bold" }}
          >
            Completed
          </option>
        </Select>
        <Button
          onClick={() => handleTodoCreate()}
          disabled={title.length < 1 || description.length < 1 || isLoading}
          variantColor="teal"
          variant="solid"
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default AddTodo;
