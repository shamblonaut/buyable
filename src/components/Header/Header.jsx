import { Brand, HomeLink, Logo, Title } from "./Header.styles";

const Header = () => (
  <Brand>
    <HomeLink to="/">
      <Logo src="/logo.svg" alt="Buyable Logo" />
      <Title>BUYABLE</Title>
    </HomeLink>
  </Brand>
);

export default Header;
