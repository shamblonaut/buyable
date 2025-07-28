import { Link } from "react-router-dom";
import styled from "styled-components";

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  flex: 1;
  width: 100%;
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: auto 0;
`;

export const HeroText = styled.p`
  font-size: 2rem;
  font-weight: 500;
  font-style: italic;
  text-align: center;
`;

export const HeroHighlight = styled.strong`
  font-size: 4rem;
  font-weight: 700;
  font-style: normal;
  font-family: var(--font-highlight), system-ui, sans-serif;
  color: var(--color-accent);
`;

export const CTALink = styled(Link)`
  text-decoration: none;
  color: inherit;

  margin-top: 32px;
  cursor: pointer;

  padding: 16px 32px;
  font-size: 1.5rem;
  font-weight: 700;

  color: var(--color-light);
  background-color: var(--color-accent);
  border: 3px solid var(--color-dark);
  border-radius: 4px;

  transition: all 200ms ease;

  &:active {
    transform: scale(0.95);
  }
`;

export const Info = styled.p`
  height: 250px;
  padding: 48px;
  margin: 32px;

  border: 3px solid var(--color-dark);
  border-radius: 8px;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-size: 1.25rem;
  font-weight: 300;
  font-style: italic;
`;
