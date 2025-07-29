import { Link } from "react-router-dom";
import styled from "styled-components";

export const Bar = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 64px;

  display: flex;
  justify-content: center;

  background-color: var(--color-accent-dark);
  border-top: 3px solid var(--color-dark);
`;

export const Tabs = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & .lucide {
    color: var(--color-light);
  }
`;

export const PageLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: inherit;

  & .lucide {
    color: ${(props) =>
      props.$active ? "var(--color-light)" : "var(--color-light-dim)"};
  }
`;

export const CartIndicator = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  min-width: 20px;
  min-height: 20px;
  transform: translate(65%, -50%);
  background-color: var(--color-accent);
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 4px;
  aspect-ratio: 1;

  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-light);
`;
