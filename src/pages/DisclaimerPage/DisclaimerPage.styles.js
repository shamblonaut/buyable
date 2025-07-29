import styled from "styled-components";

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  width: 100%;
`;

export const Heading = styled.p`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 16px 0;
`;

export const Disclaimer = styled.p`
  flex: 1;
  padding: 32px;
  border: 3px solid var(--color-dark);
  max-width: 600px;
  border-radius: 8px;

  color: var(--color-light);
  background-color: var(--color-accent-dark);

  font-size: 1.25rem;
  font-weight: 500;
`;
