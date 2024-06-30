import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/reducer/auth";

const Protected = ({ children }) => {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default Protected;
