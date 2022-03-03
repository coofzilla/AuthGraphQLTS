import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import GET_USER from "../queries/CurrentUser";
import LOGOUT_USER from "../mutations/Logout";

interface ButtonsProps {
  someProp?: any;
}

const Buttons = ({ someProp }: ButtonsProps) => {
  const { loading, error, data } = useQuery(GET_USER);
  const [logout] = useMutation(LOGOUT_USER);

  if (loading) return null;

  if (data?.user)
    return (
      <li>
        <a href="/" onClick={() => logout()}>
          Logout
        </a>
      </li>
    );
  return (
    <div>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </div>
  );
};

export default Buttons;
