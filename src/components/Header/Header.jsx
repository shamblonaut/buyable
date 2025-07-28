import { Brand, Logo, Title } from "./Header.styles";

const Header = () => (
  <Brand>
    <Logo src="/logo.svg" alt="Buyable Logo" />
    <Title>BUYABLE</Title>
  </Brand>
);

export default Header;
