import { useQuery } from "@apollo/client";
import { Navigate, useLocation } from "react-router-dom";
import GET_USER from "../queries/CurrentUser";

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { loading, data } = useQuery(GET_USER);
  const location = useLocation();

  if (!loading && !data.user) {
    //redirect to login but saves current location trying to go when redirected
    //allows us to send them back after loggin in

    //must be /login if not will append to /currentRoute/likethis
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
