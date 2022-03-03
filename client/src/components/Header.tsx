import Buttons from "./Buttons";

interface HeaderProps {
  someProp?: any;
}

const Header = ({ someProp }: HeaderProps) => {
  return (
    <div>
      <h1>Header</h1>
      <Buttons />
    </div>
  );
};

export default Header;
