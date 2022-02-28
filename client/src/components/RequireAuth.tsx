interface RequireAuthProps {
  someProp?: any;
}

const RequireAuth = ({ someProp }: RequireAuthProps) => {
  return (
    <div>
      <h1>RequireAuth</h1>
    </div>
  );
};

export default RequireAuth;