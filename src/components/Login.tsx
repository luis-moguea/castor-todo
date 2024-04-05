import { Box, Button, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface User {
  user: string;
}

//link style - passing it this way since it didnt work in the Link tag itself

const style = {
  color: "blue",
  fontSize: "12px",
  textDecoration: "underline",
};

// login component

const Login = ({ user }: User) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Log in function

  const handleLogIn = () => {
    if (!email || !password) {
      alert("Please fill the empty inputs");
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  };

  // user conditional

  if (user) {
    return <Navigate to="/" />;
  }

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
      <Heading>Login</Heading>
      <form action="">
        <Input
          type="email"
          placeholder="email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          mt="12px"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="button" onClick={handleLogIn} mt="12px">
          Log In
        </Button>
      </form>

      <Link to="/signup" style={style}>
        Missing an account? Sign up here!
      </Link>
    </Box>
  );
};

export default Login;
