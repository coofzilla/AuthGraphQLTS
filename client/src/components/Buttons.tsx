import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import CurrentUser from "../queries/CurrentUser";
import LOGOUT_MUTATION from "../mutations/Logout";

interface ButtonsProps {
  someProp?: any;
}

const Buttons = ({ someProp }: ButtonsProps) => {
  const { loading, error, data } = useQuery(CurrentUser);
  const [logout] = useMutation(LOGOUT_MUTATION, {
    refetchQueries: [CurrentUser],
  });
  if (loading) return null;

  const logoutHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    //prevent autorefresh onclick
    e.preventDefault();
    logout();
  };

  if (data?.user)
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
