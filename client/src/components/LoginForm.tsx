import AuthForm from "./AuthForm";

interface LoginFormProps {
  someProp?: any;
}

const LoginForm = ({ someProp }: LoginFormProps) => {
  return (
    <div>
      <h3>LoginForm</h3>
      <AuthForm />
    </div>
  );
};

export default LoginForm;
