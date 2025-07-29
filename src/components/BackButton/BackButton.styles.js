import { Link } from "react-router-dom";
import styled from "styled-components";

export const ButtonLink = styled(Link)`
  position: absolute;
  top: 16px;
  left: 16px;

  padding: 8px;
  color: var(--color-light);
  border: 2px solid var(--color-dark);
  border-radius: 50%;
  background-color: var(--color-accent);
`;
