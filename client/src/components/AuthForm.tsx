import { useState } from "react";

interface AuthFormProps {
  onSubmitMutation: any;
  error: any;
}

const AuthForm = ({ onSubmitMutation, error }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    onSubmitMutation({ variables: { email, password } });
  };

  return (
    <div className="row">
      <form className="col s6" onSubmit={onSubmitHandler}>
        <div className="input-field">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className="input-field">
          <input
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="errors">
          {error ? <div>{error.message.split('"')[1]}</div> : null}
        </div>
        <button className="btn deep-purple accent-2">Submit</button>
      </form>
    </div>
  );
};

export default AuthForm;
