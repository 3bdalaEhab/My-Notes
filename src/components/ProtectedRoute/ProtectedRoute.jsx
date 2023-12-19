import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function ProtectedRoute({ children }) {
  const {tokenUser} = useContext(UserContext)
  if (localStorage.getItem("token",tokenUser)) {
    return children;
  }

  return <Navigate to="/Login" />;
}
