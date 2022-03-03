/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import GET_USER from "../queries/CurrentUser";
import LOGOUT_MUTATION from "../mutations/Logout";

interface ButtonsProps {
  user: {
    email: string;
    id: string;
  };
}

const Buttons = ({ user }: ButtonsProps) => {
  const [logout] = useMutation(LOGOUT_MUTATION, {
    refetchQueries: [GET_USER],
  });

  if (user)
    return (
      <li>
        {/* use a f/styling */}
        <a onClick={() => logout()}>Logout</a>
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
