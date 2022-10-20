import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import AddEvent from "../components/AddEvent";
import Auth from "../components/Auth";


export default function AddToDoPage() {
  return (
      <Container maxW="7xl">
      <Auth />
      <AddTodo />
      <AddEvent />
      </Container>
  );
}