import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/reducer/auth";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectCurrentUser);

  if (user && user.role !== "admin") {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedAdmin;
