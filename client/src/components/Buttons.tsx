import { gql, useQuery } from "@apollo/client";
import GET_USER from "../queries/CurrentUser";

interface ButtonsProps {
  someProp?: any;
}

const Buttons = ({ someProp }: ButtonsProps) => {
  const { loading, error, data } = useQuery(GET_USER);
  if (loading) return null;

  if (GET_USER)
    return (
      <li>
        <a>Logout</a>
      </li>
    );
};

export default Buttons;
