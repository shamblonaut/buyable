import { Link } from "react-router-dom";
import styled from "styled-components";

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  flex: 1;
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const HeroText = styled.p`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  margin-top: 32px;
`;

export const CTAButton = styled(Link)`
  margin-top: 32px;
  cursor: pointer;

  & button {
    padding: 8px 16px;
    font-size: 1.25rem;
    font-weight: 500;
  }
`;

export const Loading = styled.p`
  margin: 32px;
`;
