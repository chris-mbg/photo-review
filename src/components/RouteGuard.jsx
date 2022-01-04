import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children, redirectTo}) => {

  const { currentUser } = useAuthContext()

  return (
    currentUser ? children : <Navigate to={redirectTo} />
  )
}

export default RouteGuard