import { Box, Button, Heading, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState } from "react";

const style = {
  color: "blue",
  fontSize: "12px",
  textDecoration: "underline",
};

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (!email || !password) {
      alert("Please fill the empty inputs");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  };

  return (
    <Box
      mt="50px"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      gap="20px"
    >
      <Heading>Sign Up</Heading>

      <form action="">
        <Input
          type="email"
          placeholder="email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          mt="12px"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="button" mt="12px" onClick={handleSignUp}>
          Sign Up
        </Button>
      </form>

      <Link to="/login" color="blue" style={style}>
        Do you have an account? Log in here!
      </Link>
    </Box>
  );
};

export default SignUp;
