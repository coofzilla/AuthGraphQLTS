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

  const logoutHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    //prevent autorefresh onclick
    e.preventDefault();
    logout();
  };

  if (user)
    return (
      <li>
        <a href="/" onClick={(e) => logoutHandler(e)}>
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
