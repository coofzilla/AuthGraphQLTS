import { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import SIGNUP_MUTATION from "../mutations/Signup";
import AuthForm from "./AuthForm";
import GET_USER from "../queries/CurrentUser";

interface SignupFormProps {
  someProp?: any;
}

const SignupForm = ({ someProp }: SignupFormProps) => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(GET_USER);
  const [signup, { error }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: [GET_USER],
  });

  useEffect(() => {
    if (!loading && data.user) {
      navigate("/dashboard");
    }
  }, [loading, data?.user, navigate]);

  return (
    <div>
      <h3>Sign up</h3>
      <AuthForm onSubmitMutation={signup} error={error} />
    </div>
  );
};

export default SignupForm;
