import { Link } from "react-router-dom";
import styled from "styled-components";

export const Brand = styled.header`
  width: max-content;
  padding: 8px;
  margin: 8px;

  font-family: var(--font-highlight), system-ui, sans-serif;
  color: var(--color-light);
  background-color: var(--color-accent-dark);
  border: 3px solid var(--color-dark);
  border-radius: 4px;
`;

export const HomeLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  width: 48px;
  height: auto;
  padding: 0 8px;
`;

export const Title = styled.p`
  line-height: 1;
  font-size: 2.5rem;
  font-weight: 700;
`;
