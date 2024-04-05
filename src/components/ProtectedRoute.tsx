import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  user: string;
}
const ProtectedRoute = ({ children, user }: Props) => {
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
