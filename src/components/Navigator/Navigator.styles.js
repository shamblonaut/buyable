import styled from "styled-components";

export const Bar = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 64px;

  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 2px solid black;
  background-color: white;

  & .lucide {
    color: black;
  }
`;
