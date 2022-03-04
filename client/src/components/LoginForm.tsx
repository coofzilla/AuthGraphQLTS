import { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import LOGIN_MUTATION from "../mutations/Login";
import GET_USER from "../queries/CurrentUser";

interface LoginFormProps {
  someProp?: any;
}

const LoginForm = ({ someProp }: LoginFormProps) => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(GET_USER);
  const [login, { error }] = useMutation(LOGIN_MUTATION, {
    refetchQueries: [GET_USER],
  });

  useEffect(() => {
    if (!loading && data.user) {
      navigate("/dashboard");
    }
  }, [loading, data?.user, navigate]);

  return (
    <div>
      <h3>LoginForm</h3>
      <AuthForm onSubmitMutation={login} error={error} />
    </div>
  );
};

export default LoginForm;
