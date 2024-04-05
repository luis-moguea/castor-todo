import { useState, useEffect, FormEvent } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { db } from "../firebase/firebase";
import { Box, Button, Heading, Input, Stack } from "@chakra-ui/react";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

interface Todo {
  completed: boolean;
  createdAt: Timestamp;
  description: string;
  id: number;
  text: string;
}

// Home component structure

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  //create todo function

  const createTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (inputTitle === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: inputTitle,
      completed: false,
      description: inputDescription,
      createdAt: serverTimestamp(),
    });
    setInputTitle("");
  };

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr: any[] = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      console.log("Todos fetched:", todosArr);
      setTodos(todosArr);
    });
    return () => {
      console.log("Unsubscribing from todos...");
      unsubscribe();
    };
  }, []);

  const toggleComplete = async (todo: Todo) => {
    try {
      await updateDoc(doc(db, "todos", todo.id.toString()), {
        completed: !todo.completed,
      });

      console.log("completed toggled");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (todo: Todo) => {
    await deleteDoc(doc(db, "todos", todo.id.toString()));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("sign out"))
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <Box mt="30px">
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        textAlign="center"
      >
        <Box display="flex" justifyContent="space-between">
          <Heading>TODO APP</Heading>
          <Button type="button" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Box>
        <form onSubmit={createTodo}>
          <Stack direction="column" spacing={4} mt="30px">
            <Input
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              placeholder="Title"
            />
            <Input
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
              placeholder="Description"
            />
            <Button
              type="submit"
              maxW="60px"
              marginLeft="auto"
              marginRight="auto"
              title="Add todo"
            >
              <AiOutlinePlus size={30} />
            </Button>
          </Stack>
        </form>
      </Box>
      <Stack width="400px">
        {todos.map((todo, index) => (
          <Todo
            onClick={() => deleteTodo(todo)}
            onChange={() => toggleComplete(todo)}
            key={index}
            title={todo.text}
            description={todo.description}
            completed={todo.completed}
            date={todo.createdAt}
            id={todo.id}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Home;
