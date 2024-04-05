import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState<null | any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        return;
      }
      setUser(null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/signup" element={<SignUp />} />
          <Route index path="/login" element={<Login user={user} />} />

          <Route
            index
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
