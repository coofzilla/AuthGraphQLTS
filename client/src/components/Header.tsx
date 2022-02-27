interface HeaderProps {
  someProp?: any;
}

const Header = ({ someProp }: HeaderProps) => {
  return (
    <div>
      <h1>Header</h1>
    </div>
  );
};

export default Header;