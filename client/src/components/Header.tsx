import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import GET_USER from "../queries/CurrentUser";
import Buttons from "./Buttons";

const Header = () => {
  const { loading, data } = useQuery(GET_USER);
  if (loading) return null;
  const { user } = data;

  return (
    <nav>
      <div className="nav-wrapper deep-purple accent-2">
        <Link to="/" className="brand-logo left">
          Home
        </Link>
        <ul className="right">
          <Buttons user={user} />
        </ul>
      </div>
    </nav>
  );
};

export default Header;
