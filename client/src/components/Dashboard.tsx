interface DashBoardProps {
  someProp?: any;
}

const DashBoard = ({ someProp }: DashBoardProps) => {
  return (
    <div>
      <h1>DashBoard</h1>
      <h4>LOGGED IN</h4>
    </div>
  );
};

export default DashBoard;
