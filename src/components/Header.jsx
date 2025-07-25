import styled from "styled-components";

const Logo = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  font-family: Montserrat, system-ui, sans-serif;
`;

const LogoMark = styled.img`
  width: 48px;
  height: auto;
  padding: 0 8px;
`;

const Header = () => (
  <Logo>
    <LogoMark src="/logo.svg" alt="Buyable Logo" />
    <h1>Buyable</h1>
  </Logo>
);

export default Header;
