interface DashBoardProps {
  someProp?: any;
}

const DashBoard = ({ someProp }: DashBoardProps) => {
  return (
    <div>
      <h1>DashBoard</h1>
    </div>
  );
};

export default DashBoard;