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
